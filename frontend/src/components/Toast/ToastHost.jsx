import { Outlet, useLocation } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import Toast from "./Toast";
import { AppFrame } from "./Toast.styles";

export function RootLayout() {
  return (
    <AppFrame>
      <Outlet />
      <ToastHost />
    </AppFrame>
  );
}

function ToastHost() {
  const { toast } = useToast();
  const { pathname } = useLocation();

  if (!toast) return null;

  return (
    <Toast
      message={toast.message}
      type={toast.type}
      placement={pathname.startsWith("/main") ? "tab-bottom" : "default"}
    />
  );
}
