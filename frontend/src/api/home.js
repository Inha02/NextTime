import axiosInstance from "./axiosInstance";

export const getHome = async (config) => {
    const response = await axiosInstance.get("/home", config);
    return response.data.data;
};
