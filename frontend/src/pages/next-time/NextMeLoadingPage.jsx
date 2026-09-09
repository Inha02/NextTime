import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NextMeLoadingPage.styles";
import { useNextTime } from "../../contexts/NextTimeContext";
import {
  generateFutureVoice,
  getNextTimePathByStatus,
  getNextTimeRecommendation,
  isNextTimeStatusAfter,
  mapRecommendedMission,
} from "../../api/nextTime";
import useAsync from "../../hooks/useAsync";
import useNextTimeStatusRedirect from "../../hooks/useNextTimeStatusRedirect";
import useRewindNextTimeSession from "../../hooks/useRewindNextTimeSession";
import { useElementHeight } from "../../hooks/useElementHeight";
import Header from "../../components/next-time/Header";
import MascotCharacter from "../../components/next-time/MascotCharacter";
import PrimaryButton from "../../components/next-time/PrimaryButton";
import ApiStatusView from "../../components/common/ApiStatusView";
import { debugLog, debugError } from "../../api/debugLog";

function NextMeLoadingPage() {
  const navigate = useNavigate();
  const {
    session,
    sessionId,
    setSession,
    setFutureVoice,
    setRecommendedMission,
  } = useNextTime();
  useNextTimeStatusRedirect("CONTEXT_SAVED");
  const {
    error: voiceError,
    execute: executeVoice,
    refetch: refetchVoice,
  } = useAsync(generateFutureVoice, { immediate: false });
  const {
    isLoading: isRecommending,
    error: recommendError,
    execute: executeRecommend,
    refetch: refetchRecommend,
  } = useAsync(getNextTimeRecommendation, { immediate: false });
  const {
    rewind,
    retry: retryRewind,
    isLoading: isRewinding,
    error: rewindError,
    hasStartedRef: hasRewindStartedRef,
  } = useRewindNextTimeSession({ isBusy: isRecommending });
  const isBusy = isRewinding || isRecommending;
  const [voice, setVoice] = useState(null);
  const [bottomAreaRef, bottomAreaHeight] = useElementHeight();
  const hasNavigatedRef = useRef(false);
  const sessionRef = useRef(session);
  sessionRef.current = session;

  const applyRecommendation = useCallback(
    (recommendation) => {
      if (!recommendation || hasRewindStartedRef.current) return null;

      const mission = mapRecommendedMission(recommendation);
      setSession((prev) => ({
        ...(prev ?? {}),
        ...recommendation,
      }));
      if (mission) {
        setRecommendedMission(mission);
      }
      return mission;
    },
    [hasRewindStartedRef, setRecommendedMission, setSession],
  );

  const applyVoice = useCallback(
    (voiceResult) => {
      if (!voiceResult || hasRewindStartedRef.current) return null;

      const { elapsedMs, ...sessionVoice } = voiceResult;
      debugLog("nextTime", "미래의 목소리를 생성했습니다.", {
        sessionId: sessionVoice.sessionId,
        source: sessionVoice.source,
        elapsedMs,
        generatedAt: sessionVoice.generatedAt,
        result: sessionVoice,
      });

      setVoice(sessionVoice);
      setFutureVoice(sessionVoice);
      setSession((prev) => ({
        ...(prev ?? {}),
        ...sessionVoice,
        status: prev?.status ?? sessionVoice.status,
      }));
      return sessionVoice;
    },
    [hasRewindStartedRef, setFutureVoice, setSession],
  );

  const goToRecommend = useCallback(
    (recommendation) => {
      if (hasNavigatedRef.current || hasRewindStartedRef.current) return;
      if (!recommendation) return;

      const mission = applyRecommendation(recommendation);
      const nextSession = {
        ...(sessionRef.current ?? {}),
        ...recommendation,
      };
      hasNavigatedRef.current = true;
      setSession(nextSession);
      if (mission) {
        debugLog("nextTime", "추천 화면으로 이동합니다.", { mission });
      }
      navigate("/next-time/recommend", {
        replace: true,
        state: { session: nextSession },
      });
    },
    [applyRecommendation, hasRewindStartedRef, navigate, setSession],
  );

  useEffect(() => {
    if (!sessionId) {
      debugError(
        "nextTime",
        "세션 ID가 없어 미래의 목소리를 요청할 수 없습니다.",
      );
      return;
    }

    if (hasRewindStartedRef.current) return;

    if (isNextTimeStatusAfter(sessionRef.current?.status, "CONTEXT_SAVED")) {
      const path = getNextTimePathByStatus(sessionRef.current.status);
      debugLog(
        "nextTime",
        "이미 추천이 끝난 세션이라 미래의 목소리 요청을 건너뜁니다.",
        {
          sessionId,
          status: sessionRef.current.status,
          path,
        },
      );
      applyRecommendation(sessionRef.current);
      navigate(path, {
        replace: true,
        state: { session: sessionRef.current },
      });
      return;
    }

    let cancelled = false;
    const requestedSessionId = sessionId;

    debugLog("nextTime", "미래의 목소리를 생성합니다.", { sessionId });
    executeVoice(sessionId).then((voiceResult) => {
      if (cancelled || hasRewindStartedRef.current) return;
      if (requestedSessionId !== sessionRef.current?.sessionId) return;
      if (!voiceResult) {
        debugError("nextTime", "미래의 목소리 요청에 실패했습니다.");
        return;
      }
      applyVoice(voiceResult);
    });

    return () => {
      cancelled = true;
    };
  }, [applyRecommendation, applyVoice, executeVoice, navigate, sessionId]);

  const requestRecommendation = async () => {
    if (isBusy || !voice) return;

    if (!sessionId) {
      debugError("nextTime", "세션 ID가 없어 추천 미션을 요청할 수 없습니다.");
      return;
    }

    if (isNextTimeStatusAfter(session?.status, "CONTEXT_SAVED")) {
      const path = getNextTimePathByStatus(session.status);
      debugLog(
        "nextTime",
        "세션이 이미 추천 이후 단계라 추천 요청을 건너뜁니다.",
        {
          sessionId,
          status: session.status,
          path,
          session,
        },
      );
      if (session.status === "MISSION_RECOMMENDED") {
        goToRecommend(session);
        return;
      }
      navigate(path, {
        replace: true,
        state: session ? { session } : undefined,
      });
      return;
    }

    debugLog("nextTime", "추천 미션을 요청합니다.", { sessionId });
    const recommendation = await executeRecommend(sessionId);
    if (hasRewindStartedRef.current) return;
    if (!recommendation) {
      debugError("nextTime", "추천 미션 요청에 실패했습니다.");
      return;
    }

    debugLog("nextTime", "추천 미션을 받았습니다.", {
      sessionId: recommendation.sessionId,
      status: recommendation.status,
      source: recommendation.source,
      mission: recommendation.mission,
      reason: recommendation.reason,
      result: recommendation,
    });
    goToRecommend(recommendation);
  };

  const handleRetry = async () => {
    if (rewindError) {
      await retryRewind();
      return;
    }

    if (recommendError) {
      debugLog("nextTime", "추천 미션을 다시 요청합니다.", { sessionId });
      const recommendation = await refetchRecommend();
      if (hasRewindStartedRef.current) return;
      if (!recommendation) {
        debugError("nextTime", "추천 미션 요청에 실패했습니다.");
        return;
      }
      goToRecommend(recommendation);
      return;
    }

    if (!sessionId) return;

    if (hasRewindStartedRef.current) return;

    if (isNextTimeStatusAfter(session?.status, "CONTEXT_SAVED")) {
      applyRecommendation(session);
      navigate(getNextTimePathByStatus(session.status), {
        replace: true,
        state: session ? { session } : undefined,
      });
      return;
    }

    hasNavigatedRef.current = false;
    setVoice(null);
    debugLog("nextTime", "미래의 목소리를 다시 요청합니다.", { sessionId });
    const voiceResult = await refetchVoice();
    if (hasRewindStartedRef.current) return;
    if (!voiceResult) {
      debugError("nextTime", "미래의 목소리 요청에 실패했습니다.");
      return;
    }
    applyVoice(voiceResult);
  };

  const handleBack = () => {
    if (isBusy) return;
    rewind();
  };

  const missingSessionError = sessionId
    ? null
    : {
        response: {
          data: { message: "세션 정보가 없어요. 홈에서 다시 시작해 주세요." },
        },
      };

  return (
    <ApiStatusView
      variant="dark"
      isLoading={isBusy}
      error={rewindError || missingSessionError || recommendError || voiceError}
      onRetry={rewindError ? retryRewind : sessionId ? handleRetry : undefined}
      loadingTitle={
        isRewinding
          ? "이전 화면으로 돌아가는 중이에요"
          : "미션을 추천하는 중이에요"
      }
      errorTitle={
        rewindError
          ? "이전 화면으로 돌아가지 못했어요"
          : recommendError
            ? "행동 추천에 실패했어요"
            : "미래의 목소리를 만들지 못했어요"
      }
    >
      <S.PageContainer>
        <Header title="NEXT ME" subtitle="미래의 목소리" onBack={handleBack} />

        <S.Content $bottomAreaHeight={bottomAreaHeight}>
          {voice ? (
            <>
              <S.TextGroup>
                <S.HighlightLine $delay={0.4}>
                  {voice.futureHook}
                </S.HighlightLine>
                <S.BodyLine $delay={0.9}>{voice.acknowledge}</S.BodyLine>
                <S.BoldLine $delay={1.3}>{voice.futureReason}</S.BoldLine>
              </S.TextGroup>

              <S.MascotWrap $delay={1.6}>
                <MascotCharacter mood="run" size="lg" priority />
              </S.MascotWrap>

              <S.ClosingLine $delay={2.0}>{voice.closing}</S.ClosingLine>
            </>
          ) : null}
        </S.Content>

        <S.BottomArea ref={bottomAreaRef}>
          <PrimaryButton
            variant="primary"
            disabled={!voice || isBusy}
            onClick={requestRecommendation}
          >
            미션 추천받기
          </PrimaryButton>
        </S.BottomArea>
      </S.PageContainer>
    </ApiStatusView>
  );
}

export default NextMeLoadingPage;
