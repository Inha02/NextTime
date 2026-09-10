import axiosInstance from "./axiosInstance";
import {
    SMOKING_FREQUENCY_MAP,
    SMOKING_CONTEXT_MAP,
    TOBACCO_TYPE_MAP,
    CHANGE_GOAL_MAP,
} from "./onboardingMappers";

export const saveOnboarding = async (answers, config) => {
    const smokingContextCodes = (answers.cravingTriggers || [])
        .slice(0, 2)
        .map((label) => SMOKING_CONTEXT_MAP[label]);

    const isOtherSelected = (answers.cravingTriggers || []).includes("기타");

    const body = {
        baseline: {
            smokingFrequency: SMOKING_FREQUENCY_MAP[answers.dailyAmount],
            smokingContextCodes,
            otherContext: isOtherSelected ? answers.hardestMoment || "" : null,
        },
        tobaccoTypes: (answers.smokeType || []).map((label) => TOBACCO_TYPE_MAP[label]),
        changeGoal: CHANGE_GOAL_MAP[answers.desiredChange],
        difficultMoment: answers.hardestMoment || null,
    };

    const response = await axiosInstance.put("/users/me/onboarding", body, config);
    return response.data.data;
};

import { CHANGE_REASON_MAP } from "./onboardingMappers";

export const generateNextMe = async (answers, customInputs) => {
    const isOtherSelected = (answers.reasonCategory || []).includes("직접 입력");
    const changeReasons = isOtherSelected
        ? ["OTHER"]
        : (answers.reasonCategory || []).map((label) => CHANGE_REASON_MAP[label]);

    const body = {
        changeReasons,
        customReason: isOtherSelected ? customInputs?.reasonCategory || "" : null,
        decisionTrigger: answers.motivation || "",
        futureSelf: answers.nextMe || "",
        messageToFutureSelf: answers.leftMessage || "",
    };

    const response = await axiosInstance.post("/ai/onboarding/next-me", body);
    return response.data.data;
};


import { COPING_ACTION_MAP } from "./onboardingMappers";

export const saveCopingProfile = async (answers, customInputs) => {
    const selectedLabels = answers.copingActions || [];
    const actions = selectedLabels.map((label) => COPING_ACTION_MAP[label]);
    const isOtherSelected = selectedLabels.includes("+ 직접 입력하기");

    const body = {
        actions,
        customAction: isOtherSelected ? customInputs?.copingActions || "" : null,
    };

    const response = await axiosInstance.post("/ai/onboarding/coping-profile", body);
    return response.data.data;
};