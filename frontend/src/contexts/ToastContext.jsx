import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { bindToastApi } from "../api/toastBridge";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const hideToast = useCallback((id) => {
    setToast((prev) => {
      if (!prev) return null;
      if (id && prev.id !== id) return prev;
      return null;
    });
  }, []);

  const showToast = useCallback((message, options = {}) => {
    const { type = "success", duration = 2000, id = "toast" } = options;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setToast({ message, type, id });

    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        setToast((prev) => (prev?.id === id ? null : prev));
        timeoutRef.current = null;
      }, duration);
    }
  }, []);

  useEffect(() => {
    bindToastApi({ showToast, hideToast });
    return () => {
      bindToastApi(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hideToast, showToast]);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 안에서만 사용할 수 있어요.");
  }
  return context;
};
