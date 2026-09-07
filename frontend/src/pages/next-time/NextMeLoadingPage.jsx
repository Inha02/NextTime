import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NextMeLoadingPage.styles";
import { useNextTime } from "../../contexts/NextTimeContext";
import { NEXT_ME_LOADING } from "../../data/nextTimeMock";
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
import Header from "../../components/next-time/Header";
import MascotCharacter from "../../components/next-time/MascotCharacter";
import ApiStatusView from "../../components/common/ApiStatusView";
import { debugLog, debugError } from "../../api/debugLog";

const MIN_LOADING_MS = 5000;
const VOICE_HOLD_MS = 3500;
const MIN_BAR_PERCENT = 38;
const COMPLETE_BAR_MS = 550;
const COMPLETE_HOLD_MS = 120;
const DOT_OFFSET = "0.1875rem";

const waitRemainingTime = async (startedAt, minMs, label) => {
  if (startedAt == null) return;

  const elapsedMs = Math.round(performance.now() - startedAt);
  const remainingMs = Math.max(0, minMs - elapsedMs);
  debugLog("nextTime", label, {
    elapsedMs,
    minMs,
    remainingMs,
  });

  if (remainingMs <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, remainingMs));
};

const waitRemainingLoadingTime = (startedAt) =>
  waitRemainingTime(
    startedAt,
    MIN_LOADING_MS,
    "로딩 화면을 최소 시간만큼 유지합니다.",
  );

const waitRemainingVoiceHoldTime = (startedAt) =>
  waitRemainingTime(
    startedAt,
    VOICE_HOLD_MS,
    "미래의 목소리를 확인할 시간을 유지합니다.",
  );

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
    rewind,
    retry: retryRewind,
    isLoading: isRewinding,
    error: rewindError,
    hasStartedRef: hasRewindStartedRef,
  } = useRewindNextTimeSession();
  const [voice, setVoice] = useState(null);
  const [barStage, setBarStage] = useState("min");
  const [barKey, setBarKey] = useState(0);
  const apiReadyRef = useRef(false);
  const hasNavigatedRef = useRef(false);
  const isCompletingBarRef = useRef(false);
  const loadRequestRef = useRef(null);
  const voiceDisplayedAtRef = useRef(null);
  const loadingBarTrackRef = useRef(null);
  const loadingBarFillRef = useRef(null);
  const loadingBarDotRef = useRef(null);
  const sessionRef = useRef(session);
  sessionRef.current = session;

  const applyRecommendation = useCallback(
    (recommendation) => {
      if (!recommendation || hasRewindStartedRef.current) return null;

      const mission = mapRecommendedMission(recommendation);
      setSession((prev) => ({
        ...(prev ?? {}),
        ...recommendation,
        status: prev?.status ?? recommendation.status,
      }));
      if (mission) {
        setRecommendedMission(mission);
      }
      return mission;
    },
    [hasRewindStartedRef, setRecommendedMission, setSession],
  );

  const loadVoiceAndRecommendation = useCallback(
    async (id) => {
      setVoice(null);
      voiceDisplayedAtRef.current = null;

      debugLog("nextTime", "미래의 목소리를 생성합니다.", { sessionId: id });
      const voiceResult = await generateFutureVoice(id);
      if (hasRewindStartedRef.current) return null;

      const { elapsedMs, ...sessionVoice } = voiceResult;
      debugLog("nextTime", "미래의 목소리를 생성했습니다.", {
        sessionId: sessionVoice.sessionId,
        source: sessionVoice.source,
        elapsedMs,
        generatedAt: sessionVoice.generatedAt,
        result: sessionVoice,
      });

      setVoice(sessionVoice);
      voiceDisplayedAtRef.current = performance.now();
      setFutureVoice(sessionVoice);
      setSession((prev) => ({
        ...(prev ?? {}),
        ...sessionVoice,
        status: prev?.status ?? sessionVoice.status,
      }));

      debugLog("nextTime", "추천 미션을 요청합니다.", { sessionId: id });
      const recommendation = await getNextTimeRecommendation(id);
      if (hasRewindStartedRef.current) return null;

      debugLog("nextTime", "추천 미션을 받았습니다.", {
        sessionId: recommendation.sessionId,
        status: recommendation.status,
        source: recommendation.source,
        mission: recommendation.mission,
        reason: recommendation.reason,
        result: recommendation,
      });

      applyRecommendation(recommendation);
      return recommendation;
    },
    [applyRecommendation, hasRewindStartedRef, setFutureVoice, setSession],
  );

  const { error, execute, refetch } = useAsync(loadVoiceAndRecommendation, {
    immediate: false,
  });

  const missingSessionError = sessionId
    ? null
    : {
        response: {
          data: { message: "세션 정보가 없어요. 홈에서 다시 시작해 주세요." },
        },
      };

  const goToRecommend = useCallback(
    (recommendation) => {
      if (hasNavigatedRef.current || hasRewindStartedRef.current) return;

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

  const waitForLoadingBarComplete = useCallback(async () => {
    const fill = loadingBarFillRef.current;
    const track = loadingBarTrackRef.current;
    const dot = loadingBarDotRef.current;

    if (!fill || !track) return;

    isCompletingBarRef.current = true;

    const trackWidth = track.getBoundingClientRect().width;
    const fillWidth = fill.getBoundingClientRect().width;
    const fromPercent =
      trackWidth > 0
        ? Math.min(99.5, Math.max(0, (fillWidth / trackWidth) * 100))
        : MIN_BAR_PERCENT;

    debugLog("nextTime", "로딩 바를 끝까지 채웁니다.", {
      fromPercent: Math.round(fromPercent),
      completeMs: COMPLETE_BAR_MS,
    });

    fill.style.animation = "none";
    fill.style.transition = "none";
    fill.style.width = `${fromPercent}%`;

    if (dot) {
      dot.style.animation = "none";
      dot.style.transition = "none";
      dot.style.left = `calc(${fromPercent}% - ${DOT_OFFSET})`;
    }

    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fill.style.transition = `width ${COMPLETE_BAR_MS}ms ease-out`;
          fill.style.width = "100%";
          if (dot) {
            dot.style.transition = `left ${COMPLETE_BAR_MS}ms ease-out`;
            dot.style.left = `calc(100% - ${DOT_OFFSET})`;
          }
          window.setTimeout(resolve, COMPLETE_BAR_MS + COMPLETE_HOLD_MS);
        });
      });
    });
  }, []);

  const finishThenGoToRecommend = useCallback(
    async (recommendation, startedAt, isCancelled) => {
      if (hasRewindStartedRef.current || !recommendation) return;

      apiReadyRef.current = true;
      await waitRemainingLoadingTime(startedAt);
      await waitRemainingVoiceHoldTime(voiceDisplayedAtRef.current);
      if (isCancelled?.() || hasRewindStartedRef.current) return;

      await waitForLoadingBarComplete();
      if (isCancelled?.() || hasRewindStartedRef.current) return;

      goToRecommend(recommendation);
    },
    [goToRecommend, hasRewindStartedRef, waitForLoadingBarComplete],
  );

  const startLoad = useCallback(
    (id) => {
      if (
        loadRequestRef.current?.sessionId === id &&
        loadRequestRef.current.promise
      ) {
        return loadRequestRef.current;
      }

      const request = {
        sessionId: id,
        startedAt: performance.now(),
        promise: execute(id),
      };
      loadRequestRef.current = request;
      return request;
    },
    [execute],
  );

  useEffect(() => {
    apiReadyRef.current = false;
    isCompletingBarRef.current = false;
    const timerId = setTimeout(() => {
      if (!apiReadyRef.current && !isCompletingBarRef.current) {
        setBarStage("extra");
      }
    }, MIN_LOADING_MS);

    return () => clearTimeout(timerId);
  }, [barKey]);

  useEffect(() => {
    if (!sessionId) {
      debugError(
        "nextTime",
        "세션 ID가 없어 미래의 목소리와 추천 미션을 요청할 수 없습니다.",
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
    const { promise, startedAt } = startLoad(requestedSessionId);

    promise.then(async (recommendation) => {
      if (hasRewindStartedRef.current) return;
      if (requestedSessionId !== sessionRef.current?.sessionId) return;

      if (!recommendation) {
        debugError(
          "nextTime",
          "미래의 목소리 또는 추천 미션 요청에 실패했습니다.",
          error,
        );
        return;
      }

      await finishThenGoToRecommend(
        recommendation,
        startedAt,
        () => cancelled || requestedSessionId !== sessionRef.current?.sessionId,
      );
    });

    return () => {
      cancelled = true;
    };
  }, [
    applyRecommendation,
    error,
    finishThenGoToRecommend,
    navigate,
    sessionId,
    startLoad,
  ]);

  const handleRetry = async () => {
    if (rewindError) {
      await retryRewind();
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

    apiReadyRef.current = false;
    hasNavigatedRef.current = false;
    isCompletingBarRef.current = false;
    voiceDisplayedAtRef.current = null;
    setBarStage("min");
    setBarKey((prev) => prev + 1);
    setVoice(null);

    debugLog("nextTime", "미래의 목소리와 추천 미션을 다시 요청합니다.", {
      sessionId,
    });
    const startedAt = performance.now();
    const promise = refetch();
    loadRequestRef.current = {
      sessionId,
      startedAt,
      promise,
    };
    const recommendation = await promise;
    if (hasRewindStartedRef.current) return;
    if (!recommendation) {
      debugError(
        "nextTime",
        "미래의 목소리 또는 추천 미션 요청에 실패했습니다.",
        error,
      );
      return;
    }

    await finishThenGoToRecommend(recommendation, startedAt);
  };

  const handleBack = () => {
    if (isRewinding) return;
    rewind();
  };

  return (
    <ApiStatusView
      variant="dark"
      isLoading={isRewinding}
      error={rewindError || missingSessionError || error}
      onRetry={rewindError ? retryRewind : sessionId ? handleRetry : undefined}
      loadingTitle="이전 화면으로 돌아가는 중이에요"
      errorTitle={
        rewindError
          ? "이전 화면으로 돌아가지 못했어요"
          : voice
            ? "행동 추천에 실패했어요"
            : "미래의 목소리를 만들지 못했어요"
      }
    >
      <S.PageContainer>
        <Header title="NEXT ME" subtitle="미래의 목소리" onBack={handleBack} />

        <S.Content>
          <S.TextGroup>
            {voice ? (
              <>
                <S.HighlightLine $delay={0}>{voice.futureHook}</S.HighlightLine>
                <S.BodyLine $delay={0.4}>{voice.acknowledge}</S.BodyLine>
                <S.BoldLine $delay={0.8}>{voice.futureReason}</S.BoldLine>
              </>
            ) : null}
          </S.TextGroup>

          <S.MascotWrap $delay={voice ? 1.2 : 0} $immediate={!voice}>
            <MascotCharacter mood="run" size="lg" />
          </S.MascotWrap>

          {voice ? (
            <S.ClosingLine $delay={1.6}>{voice.closing}</S.ClosingLine>
          ) : null}
        </S.Content>

        <S.BottomArea>
          <S.LoadingBarTrack ref={loadingBarTrackRef}>
            <S.LoadingBarBg />
            <S.LoadingBarFill
              ref={loadingBarFillRef}
              key={`fill-${barKey}`}
              $stage={barStage}
            />
            <S.LoadingBarDot
              ref={loadingBarDotRef}
              key={`dot-${barKey}`}
              $stage={barStage}
            />
          </S.LoadingBarTrack>
          <S.LoadingText>{NEXT_ME_LOADING.statusText}</S.LoadingText>
        </S.BottomArea>
      </S.PageContainer>
    </ApiStatusView>
  );
}

export default NextMeLoadingPage;
