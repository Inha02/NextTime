import * as S from "./RecommendPage.styles";
import { useNavigate } from "react-router-dom";
import { useElementHeight } from "../../hooks/useElementHeight";
import { useNextTime } from "../../contexts/NextTimeContext";
import useAsync from "../../hooks/useAsync";
import useNextTimeStatusRedirect from "../../hooks/useNextTimeStatusRedirect";
import {
  getNextTimePathByStatus,
  isNextTimeStatusAfter,
  mapStartedMission,
  startNextTimeMission,
} from "../../api/nextTime";
import Header from "../../components/next-time/Header";
import CircularTimer from "../../components/next-time/CircularTimer";
import PrimaryButton from "../../components/next-time/PrimaryButton";
import ApiStatusView from "../../components/common/ApiStatusView";
import useSkipNextTimeMission from "../../hooks/useSkipNextTimeMission";
import useRewindNextTimeSession from "../../hooks/useRewindNextTimeSession";

function splitMissionTitle(title) {
  if (!title) return [""];
  const splitIndex = title.search(/\d+분/);
  if (splitIndex > 0) {
    return [title.slice(0, splitIndex).trim(), title.slice(splitIndex).trim()];
  }
  return [title];
}

function RecommendPage() {
  const navigate = useNavigate();
  const {
    session,
    sessionId,
    recommendedMission,
    setSession,
    setRecommendedMission,
  } = useNextTime();
  useNextTimeStatusRedirect("MISSION_RECOMMENDED");
  const {
    title = "",
    description = "",
    durationSeconds = 0,
  } = recommendedMission ?? {};
  const titleLines = splitMissionTitle(title);
  const {
    isLoading: isStarting,
    error: startError,
    execute,
    refetch,
  } = useAsync(startNextTimeMission, {
    immediate: false,
  });
  const {
    skip,
    retry: retrySkip,
    isLoading: isSkipping,
    error: skipError,
  } = useSkipNextTimeMission({ isBusy: isStarting });
  const {
    rewind,
    retry: retryRewind,
    isLoading: isRewinding,
    error: rewindError,
  } = useRewindNextTimeSession({ isBusy: isStarting || isSkipping });
  const isLoading = isStarting || isSkipping || isRewinding;
  const error = rewindError || skipError || startError;

  const [bottomAreaRef, bottomAreaHeight] = useElementHeight();

  const goToMission = (startedSession) => {
    if (startedSession) {
      setSession((prev) => ({ ...(prev ?? {}), ...startedSession }));

      if (startedSession.mission) {
        const mission = mapStartedMission(startedSession);
        setRecommendedMission((prev) => ({ ...prev, ...mission }));
        console.log("미션 수행 화면으로 이동합니다.", { mission });
      }
    }
    navigate("/next-time/mission", { replace: true });
  };

  const startMission = async () => {
    if (isLoading) return;

    if (!sessionId) {
      console.error("세션 ID가 없어 미션을 시작할 수 없습니다.");
      return;
    }

    if (isNextTimeStatusAfter(session?.status, "MISSION_RECOMMENDED")) {
      const path = getNextTimePathByStatus(session.status);
      console.log("세션이 이미 미션 추천 이후 단계라 미션 시작을 건너뜁니다.", {
        sessionId,
        status: session.status,
        path,
        session,
      });
      if (session.status === "MISSION_STARTED") {
        goToMission(session);
        return;
      }
      navigate(path, { replace: true });
      return;
    }

    console.log("미션을 시작합니다.", { sessionId });
    const result = await execute(sessionId);
    if (!result) {
      console.error("미션 시작에 실패했습니다.");
      return;
    }

    console.log("미션을 시작했습니다.", {
      sessionId: result.sessionId,
      status: result.status,
      mission: result.mission,
      startedAt: result.startedAt,
      result,
    });
    goToMission(result);
  };

  const handleRetry = async () => {
    if (rewindError) {
      await retryRewind();
      return;
    }

    if (skipError) {
      await retrySkip();
      return;
    }

    console.log("미션 시작을 다시 시도합니다.", { sessionId });
    const result = await refetch();
    if (!result) {
      console.error("미션 시작에 실패했습니다.");
      return;
    }

    console.log("미션을 시작했습니다.", {
      sessionId: result.sessionId,
      status: result.status,
      mission: result.mission,
      startedAt: result.startedAt,
      result,
    });
    goToMission(result);
  };

  const handleSkip = () => {
    skip();
  };

  const handleBack = () => {
    if (isLoading) return;
    rewind();
  };

  return (
    <ApiStatusView
      variant="dark"
      isLoading={isLoading}
      error={error}
      onRetry={handleRetry}
      loadingTitle={
        isRewinding
          ? "이전 화면으로 돌아가는 중이에요"
          : isSkipping
            ? "미션을 건너뛰는 중이에요"
            : "미션을 시작하는 중이에요"
      }
      errorTitle={
        rewindError
          ? "이전 화면으로 돌아가지 못했어요"
          : skipError
            ? "미션을 건너뛰지 못했어요"
            : "미션을 시작하지 못했어요"
      }
    >
      <S.PageContainer>
        <Header title="NEXT TIME" onBack={handleBack} />

        <S.Content $bottomAreaHeight={bottomAreaHeight}>
          <S.MissionTitle>
            {titleLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </S.MissionTitle>

          <CircularTimer
            totalSeconds={durationSeconds}
            remainingSeconds={durationSeconds}
          />

          <S.Description>{description}</S.Description>
        </S.Content>

        <S.BottomArea ref={bottomAreaRef}>
          <PrimaryButton variant="primary" onClick={startMission}>
            시작하기
          </PrimaryButton>
          <S.SkipButton type="button" onClick={handleSkip}>
            건너뛰기
          </S.SkipButton>
        </S.BottomArea>
      </S.PageContainer>
    </ApiStatusView>
  );
}

export default RecommendPage;
