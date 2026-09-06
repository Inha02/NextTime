import * as S from "./PatternTopBlock.styles";
function PatternTopBlock() {
  return (
    <S.TopBlock>
      <S.TopRow>
        <S.TabName>내 패턴</S.TabName>
        <S.Recent>최근 7일</S.Recent>
      </S.TopRow>
      <S.PatternDescription>
        기록이 쌓일수록 나에게 잘 맞는 순간과 행동을 찾아드려요.
      </S.PatternDescription>
    </S.TopBlock>
  );
}

export default PatternTopBlock;
