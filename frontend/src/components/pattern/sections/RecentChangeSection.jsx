import * as S from "./RecentChangeSection.styles";
import SummaryCard from "../SummaryCard";
import patternArrow from "../../../assets/pattern-arrow.svg";

const CHANGE_DESCRIPTIONS = {
  INCREASED: "바로 피우지 않는 경우가 늘고 있어요",
  DECREASED: "바로 피우지 않는 경우가 줄었어요",
  SAME: "바로 피우지 않은 비율이 비슷해요",
  NO_COMPARISON: "최근 7일 기록을 기준으로 보여드려요",
};

function RecentChangeSection({ behaviorChange }) {
  const previousPeriod = behaviorChange?.previousPeriod;
  const currentPeriod = behaviorChange?.currentPeriod;
  const description =
    CHANGE_DESCRIPTIONS[behaviorChange?.change] ??
    CHANGE_DESCRIPTIONS.NO_COMPARISON;

  return (
    <S.Section>
      <S.TitleBlock>
        <S.SectionTitle>최근의 변화</S.SectionTitle>
        <S.Subtitle>바로 흡연하지 않은 기록</S.Subtitle>
      </S.TitleBlock>

      <S.SummaryBlock>
        <SummaryCard
          title="이전 7일"
          overcomeCount={previousPeriod?.avoidedImmediateSmokingCount ?? 0}
          totalCount={previousPeriod?.totalCount ?? 0}
          variant="before"
        />
        <S.PatternArrowIcon src={patternArrow} alt="" aria-hidden="true" />
        <SummaryCard
          title="최근 7일"
          overcomeCount={currentPeriod?.avoidedImmediateSmokingCount ?? 0}
          totalCount={currentPeriod?.totalCount ?? 0}
          variant="after"
        />
      </S.SummaryBlock>

      <S.SummaryText>💡 {description}</S.SummaryText>
    </S.Section>
  );
}

export default RecentChangeSection;
