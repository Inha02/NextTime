const LOADING_TOAST_ID = "api-loading";

const AI_API_RULES = [
  { method: "post", pattern: /^\/ai\/onboarding\/next-me$/ },
  { method: "post", pattern: /^\/ai\/onboarding\/coping-profile$/ },
  { method: "post", pattern: /^\/next-time\/sessions\/[^/]+\/future-voice$/ },
  { method: "post", pattern: /^\/next-time\/sessions\/[^/]+\/result$/ },
];

const LOADING_TOAST_RULES = [
  {
    method: "post",
    pattern: /^\/records\/smoking$/,
    message: "기록하는 중이에요",
  },
  {
    method: "delete",
    pattern: /^\/users\/me\/excluded-missions\/[^/]+$/,
    message: "추천을 다시 포함하는 중이에요",
  },
  {
    method: "post",
    pattern: /^\/users$/,
    message: "처리 중이에요",
  },
];

const RECOVERABLE_CONFLICT_RULES = [
  { method: "post", pattern: /^\/next-time\/sessions$/ },
  { method: "post", pattern: /^\/next-time\/sessions\/[^/]+\/recommendation$/ },
];

export const getRequestPath = (config = {}) => {
  const url = config.url || "";

  try {
    if (/^https?:\/\//.test(url)) {
      return new URL(url).pathname.replace(/\/+$/, "") || "/";
    }
  } catch {
    // fall through to the relative path
  }

  return (url.split("?")[0] || "").replace(/\/+$/, "") || "/";
};

const getMethod = (config = {}) => (config.method || "get").toLowerCase();

const matchesRule = (config, rule) =>
  getMethod(config) === rule.method && rule.pattern.test(getRequestPath(config));

export const isAiStatusApi = (config) =>
  AI_API_RULES.some((rule) => matchesRule(config, rule));

export const getLoadingToastConfig = (config) =>
  LOADING_TOAST_RULES.find((rule) => matchesRule(config, rule)) ?? null;

export const shouldSkipErrorToast = (error) => {
  const config = error?.config;
  if (!config) return false;
  if (config.skipErrorToast) return true;
  if (isAiStatusApi(config)) return true;
  if (error?.code === "ERR_CANCELED") return true;

  if (error?.response?.status === 409) {
    return RECOVERABLE_CONFLICT_RULES.some((rule) => matchesRule(config, rule));
  }

  return false;
};

export { LOADING_TOAST_ID };
