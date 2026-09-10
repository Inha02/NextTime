import axiosInstance from "./axiosInstance";

export const registerUser = async () => {
    const response = await axiosInstance.post("/users");
    return response.data.data;
};

export const getMe = async () => {
    try {
        const response = await axiosInstance.get("/users/me", {
            skipErrorToast: true,
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};