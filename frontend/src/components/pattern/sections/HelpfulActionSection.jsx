import * as S from "./HelpfulActionSection.styled";
import { SectionTitle } from "./RecentChangeSection";

function mapAction(action, index) {
  const canShowResult = (action.resultCount ?? 0) >= 2;

  return {
    id: action.missionId ?? action.code ?? action.name,
    label: action.name,
    totalCount: canShowResult ? action.resultCount : action.evaluationCount,
    overcomeCount: canShowResult
      ? action.avoidedImmediateSmokingCount
      : action.helpfulCount,
    detail: canShowResult ? "바로 피우지 않았어요" : "도움이 됐어요",
    variant: index === 0 ? "best" : "normal",
  };
}

function HelpfulActionSection({ actions = [] }) {
  const fitActions = actions.map(mapAction);

  return (
    <S.Section>
      <SectionTitle>나와 잘 맞았던 행동</SectionTitle>
      <S.ActionList>
        {fitActions.map((action) => (
          <S.ActionItem key={action.id}>
            <S.CommonText $variant={action.variant}>
              {action.label}
            </S.CommonText>
            <S.ActionText>
              <S.CommonText $variant={action.variant}>
                {action.totalCount}회 중 {action.overcomeCount}회
              </S.CommonText>
              <S.ActionDetail>{action.detail}</S.ActionDetail>
            </S.ActionText>
          </S.ActionItem>
        ))}
      </S.ActionList>
    </S.Section>
  );
}

export default HelpfulActionSection;
