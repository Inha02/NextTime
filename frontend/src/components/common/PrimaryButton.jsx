import * as S from "./PrimaryButton.styles";

function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <S.Button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </S.Button>
  );
}

export default PrimaryButton;
