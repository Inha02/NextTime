import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";
import { API_BASE_URL } from "./config";
import { getApiErrorMessage } from "./getApiErrorMessage";
import {
    getLoadingToastConfig,
    LOADING_TOAST_ID,
    shouldSkipErrorToast,
} from "./apiFeedback";
import { hideAppToast, showAppToast } from "./toastBridge";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
    const session = await fetchAuthSession();
    const accessToken = session.tokens?.accessToken?.toString();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const loadingToast = getLoadingToastConfig(config);
    if (loadingToast) {
        config._loadingToast = true;
        showAppToast(loadingToast.message, {
            type: "loading",
            duration: 0,
            id: LOADING_TOAST_ID,
        });
    }

    return config;
});

const clearLoadingToast = (config) => {
    if (config?._loadingToast) {
        hideAppToast(LOADING_TOAST_ID);
    }
};

axiosInstance.interceptors.response.use(
    (response) => {
        clearLoadingToast(response.config);
        return response;
    },
    (error) => {
        clearLoadingToast(error?.config);
        if (!shouldSkipErrorToast(error)) {
            showAppToast(getApiErrorMessage(error), { type: "error" });
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
