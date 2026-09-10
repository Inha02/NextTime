import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  saveOnboarding,
  generateNextMe,
  saveCopingProfile,
} from "../../api/onboarding";
import { debugError } from "../../api/debugLog";
import ApiStatusView from "../../components/common/ApiStatusView";

const OnboardingLoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers, customInputs } = location.state || {};
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const runOnboarding = useCallback(async () => {
    if (!answers) {
      navigate("/onboarding");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await saveOnboarding(answers, { skipErrorToast: true });
      const nextMeData = await generateNextMe(answers, customInputs);
      await saveCopingProfile(answers, customInputs);
      localStorage.setItem("onboardingAnswers", JSON.stringify(answers));
      navigate("/onboarding/complete", { state: { nextMeData, answers } });
    } catch (err) {
      debugError("onboarding", "저장 실패", err);
      setError(err);
      setIsLoading(false);
    }
  }, [answers, customInputs, navigate]);

  useEffect(() => {
    runOnboarding();
  }, [runOnboarding]);

  return (
    <ApiStatusView
      isLoading={isLoading}
      error={error}
      onRetry={runOnboarding}
      errorTitle="NEXT ME를 만들지 못했어요"
    />
  );
};

export default OnboardingLoadingPage;
