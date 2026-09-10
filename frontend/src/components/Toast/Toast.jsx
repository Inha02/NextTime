import { ToastWrapper, Icon } from "./Toast.styles";

const TOAST_ICONS = {
  success: "✅",
  error: "⚠️",
  loading: "⏳",
};

const Toast = ({ message, type = "success", placement = "default" }) => {
  const icon = TOAST_ICONS[type];

  return (
    <ToastWrapper $placement={placement} $multiline={type !== "success"}>
      {icon ? <Icon>{icon}</Icon> : null}
      {message}
    </ToastWrapper>
  );
};

export default Toast;
