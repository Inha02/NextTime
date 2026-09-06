import * as S from "./PrimaryButton.styles";

function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}) {
  const activeVariant = disabled ? "ghost" : variant;

  return (
    <S.Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      $variant={activeVariant}
      $disabled={disabled}
    >
      {children}
    </S.Button>
  );
}

export default PrimaryButton;
