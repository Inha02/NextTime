import axiosInstance from "./axiosInstance";

const toGoalView = (data = {}) => ({
    changeGoal: data.changeGoal ?? "",
    nextMe: data.nextMe ?? data.headline ?? data.futureSelf ?? "",
    nextBudTheme: data.nextBudTheme ?? data.nextbud_theme ?? "",
    motivation: data.motivation ?? data.decisionTrigger ?? "",
    leftMessage: data.leftMessage ?? data.messageToFutureSelf ?? "",
});

export const getNextMe = async () => {
    const response = await axiosInstance.get("/ai/onboarding/next-me");
    return toGoalView(response.data.data);
};

export const updateGoal = async (body) => {
    const response = await axiosInstance.post("/users/me/goal", body);
    return toGoalView(response.data.data);
};


// 추천 제외 목록 조회
export const getExcludedMissions = async () => {
    const response = await axiosInstance.get("/users/me/excluded-missions");
    return response.data.data; // { excludedMissions: [...], totalCount }
};

// 다시 추천받기
export const restoreMission = async (missionId) => {
    const response = await axiosInstance.delete(`/users/me/excluded-missions/${missionId}`);
    return response.data.data;
};
