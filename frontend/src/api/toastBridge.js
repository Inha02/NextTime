let toastApi = {
  showToast: () => {},
  hideToast: () => {},
};

export const bindToastApi = (api) => {
  toastApi = api ?? {
    showToast: () => {},
    hideToast: () => {},
  };
};

export const showAppToast = (message, options) => {
  toastApi.showToast?.(message, options);
};

export const hideAppToast = (id) => {
  toastApi.hideToast?.(id);
};
