import * as S from "./PatternHeader.styles";
import mascotPattern from "../../assets/mascot-pattern.webp";
import PatternTopBlock from "./PatternTopBlock";

function formatHourRange(slot) {
  if (slot?.startHour == null || slot?.endHour == null) return null;
  return `${slot.startHour}~${slot.endHour}시`;
}

function buildWeeklyPatternCopy(overview) {
  const insight = overview?.insight;
  const trigger = insight?.topTrigger;
  const location = insight?.topLocation;
  const timeSlot = insight?.topTimeSlot;
  const hourRange = formatHourRange(timeSlot);
  const recentResultCount = overview?.recentResultCount;
  const topAction = overview?.effectiveActions?.[0];

  const title = trigger
    ? `${trigger.name} 가장 흔들렸어요`
    : hourRange
      ? `${hourRange}에 가장 흔들렸어요`
      : "이번 주 패턴이 보이기 시작했어요";

  const subParts = [];
  if (recentResultCount && trigger?.count != null) {
    subParts.push(`기록한 욕구 ${recentResultCount}번 중 ${trigger.count}번`);
  }
  if (location?.name) {
    subParts.push(`특히 ${location.name}에서 많았어요`);
  } else if (hourRange) {
    subParts.push(`특히 ${hourRange}에 많았어요`);
  }
  const subTitle = subParts.join(", ");

  const solution = topAction?.name ?? null;
  const similarPattern =
    topAction?.resultCount != null &&
    topAction?.avoidedImmediateSmokingCount != null
      ? {
          actionName: topAction.name,
          resultCount: topAction.resultCount,
          avoidedCount: topAction.avoidedImmediateSmokingCount,
        }
      : null;

  return { title, subTitle, solution, similarPattern };
}

function PatternHeader({ overview }) {
  const myPattern = buildWeeklyPatternCopy(overview);

  return (
    <>
      <PatternTopBlock />

      <S.MiddleBlock>
        <S.TextBlock>
          <S.Label>이번 주 패턴</S.Label>
          <S.Title>{myPattern.title}</S.Title>
          {myPattern.subTitle ? (
            <S.SubTitle>{myPattern.subTitle}</S.SubTitle>
          ) : null}
        </S.TextBlock>
        <S.Mascot src={mascotPattern} alt="" />
      </S.MiddleBlock>

      {myPattern.solution || myPattern.similarPattern ? (
        <S.BottomBlock>
          {myPattern.solution ? (
            <S.Solution>
              이럴 땐 <S.Emphasis>{myPattern.solution}</S.Emphasis>
            </S.Solution>
          ) : null}
          {myPattern.similarPattern ? (
            <S.SimilarPattern>
              비슷한 상황에서 {myPattern.similarPattern.actionName}를 했을 때{" "}
              <S.Bold>
                {myPattern.similarPattern.resultCount}번 중{" "}
                {myPattern.similarPattern.avoidedCount}번
              </S.Bold>
              은 바로 흡연으로 이어지지 않았어요
            </S.SimilarPattern>
          ) : null}
        </S.BottomBlock>
      ) : null}
    </>
  );
}

export default PatternHeader;
