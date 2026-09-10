import * as S from "./PatternEmptyContent.styles";
import mascot from "../../../assets/mascot.webp";

function PatternEmptyContent({ recordCount, requiredCount }) {
  const ratio = requiredCount > 0 ? recordCount / requiredCount : 0;

  return (
    <S.Container>
      <S.Hero>
        <S.Mascot src={mascot} alt="" />
        <S.Message>
          기록이 {requiredCount}번 이상 누적되면
          <br />
          패턴을 알려드릴게요
        </S.Message>
      </S.Hero>
      <S.ProgressBlock>
        <S.ProgressBar>
          <S.Fill $ratio={ratio} />
        </S.ProgressBar>
        <S.CountText>
          현재 기록 {recordCount} / {requiredCount}
        </S.CountText>
      </S.ProgressBlock>
    </S.Container>
  );
}
export default PatternEmptyContent;
