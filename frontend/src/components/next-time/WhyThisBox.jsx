import * as S from "./WhyThisBox.styles";

function WhyThisBox({ text }) {
  return (
    <S.Box>
      <S.Title>💡 왜 이 행동일까요?</S.Title>
      <S.Body>{text}</S.Body>
    </S.Box>
  );
}

export default WhyThisBox;
