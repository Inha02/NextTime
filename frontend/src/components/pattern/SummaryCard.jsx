import * as S from "./SummaryCard.styles";

function SummaryCard({ title, overcomeCount, totalCount, variant = "before" }) {
  return (
    <S.Card $variant={variant}>
      <S.Title $variant={variant}>{title}</S.Title>
      <S.Count $variant={variant}>
        {overcomeCount} / {totalCount}
      </S.Count>
    </S.Card>
  );
}

export default SummaryCard;
