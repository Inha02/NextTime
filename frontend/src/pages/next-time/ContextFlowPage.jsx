import * as S from "./ContextFlowPage.styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useElementHeight } from "../../hooks/useElementHeight";
import { useNextTime } from "../../contexts/NextTimeContext";
import useAsync from "../../hooks/useAsync";
import useNextTimeStatusRedirect from "../../hooks/useNextTimeStatusRedirect";
import { CONTEXT_STEPS } from "../../data/nextTimeSteps";
import {
  buildNextTimeContextBody,
  getNextTimePathByStatus,
  saveNextTimeContext,
} from "../../api/nextTime";
import Header from "../../components/next-time/Header";
import ProgressBar from "../../components/next-time/ProgressBar";
import OptionGrid from "../../components/next-time/OptionGrid";
import PrimaryButton from "../../components/next-time/PrimaryButton";
import { debugLog, debugError } from "../../api/debugLog";

const STEP_FIELD_MAP = {
  intensity: {
    getter: (ctx) => ctx.situationIntensity,
    setter: (ctx) => ctx.setSituationIntensity,
  },
  location: {
    getter: (ctx) => ctx.location,
    setter: (ctx) => ctx.setLocation,
  },
  moment: {
    getter: (ctx) => ctx.moment,
    setter: (ctx) => ctx.setMoment,
  },
};

function ContextFlowPage() {
  const navigate = useNavigate();
  const nextTime = useNextTime();
  const { session, sessionId, setSession } = nextTime;
  useNextTimeStatusRedirect("CREATED");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { isLoading, execute } = useAsync(saveNextTimeContext, {
    immediate: false,
  });

  const currentStep = CONTEXT_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === CONTEXT_STEPS.length - 1;
  const fieldConfig = STEP_FIELD_MAP[currentStep.id];
  const selectedValue = fieldConfig.getter(nextTime);
  const progressPercentage =
    ((currentStepIndex + 1) / CONTEXT_STEPS.length) * 100;

  const [bottomAreaRef, bottomAreaHeight] = useElementHeight();

  const goToNextMe = (savedSession) => {
    if (savedSession) {
      setSession((prev) => ({ ...(prev ?? {}), ...savedSession }));
    }
    navigate("/next-time/next-me", { replace: true });
  };

  const saveContext = async () => {
    const payload = buildNextTimeContextBody({
      situationIntensity: nextTime.situationIntensity,
      location: nextTime.location,
      moment: nextTime.moment,
    });

    if (!sessionId) {
      debugError("nextTime", "세션 ID가 없어 상황을 저장할 수 없습니다.");
      return;
    }

    if (
      !payload.cravingBefore ||
      !payload.locationContextId ||
      !payload.triggerContextId
    ) {
      debugError("nextTime", "상황 데이터 매핑에 실패했습니다.", null, {
        situationIntensity: nextTime.situationIntensity,
        location: nextTime.location,
        moment: nextTime.moment,
        payload,
      });
      return;
    }

    if (session?.status && session.status !== "CREATED") {
      const path = getNextTimePathByStatus(session.status);
      debugLog(
        "nextTime",
        "세션이 CREATED 상태가 아니라 상황 저장을 건너뜁니다.",
        {
          sessionId,
          status: session.status,
          path,
          session,
        },
      );
      navigate(path, { replace: true });
      return;
    }

    debugLog("nextTime", "상황 데이터를 저장합니다.", { sessionId, payload });
    const result = await execute(sessionId, payload);
    if (!result) {
      debugError("nextTime", "상황 데이터 저장에 실패했습니다.");
      return;
    }

    debugLog("nextTime", "상황 데이터를 저장했습니다.", result);
    goToNextMe(result);
  };

  const handleBack = () => {
    if (isLoading) return;

    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      return;
    }
    navigate("/main", { replace: true });
  };

  const handleSelect = (value) => {
    fieldConfig.setter(nextTime)(value);
  };

  const handlePrimaryAction = () => {
    if (!selectedValue || isLoading) return;

    if (isLastStep) {
      saveContext();
      return;
    }

    setCurrentStepIndex((prev) => prev + 1);
  };

  return (
    <S.PageContainer>
        <Header onBack={handleBack} />

        <S.IntroBlock>
          <S.NextTime>NEXT TIME</S.NextTime>
          <S.MainTitle>
            현재 상황을
            <br />
            간단하게 알려주세요.
          </S.MainTitle>
          <S.HelperText>
            욕구를 줄이도록 도움을 드리기 위해 필요해요
          </S.HelperText>
        </S.IntroBlock>

        <S.ProgressBarWrap>
          <ProgressBar percentage={progressPercentage} />
        </S.ProgressBarWrap>

        <S.ScrollContent $bottomAreaHeight={bottomAreaHeight}>
          <S.Question>{currentStep.question}</S.Question>
          <OptionGrid
            options={currentStep.options}
            variant={currentStep.variant}
            layout={currentStep.layout}
            selectedValue={selectedValue}
            onChange={handleSelect}
          />
        </S.ScrollContent>

        <S.BottomArea ref={bottomAreaRef}>
          <PrimaryButton
            disabled={!selectedValue || isLoading}
            onClick={handlePrimaryAction}
          >
            {isLastStep ? "내게 맞는 행동 찾기" : "다음"}
          </PrimaryButton>
        </S.BottomArea>
      </S.PageContainer>
  );
}

export default ContextFlowPage;
