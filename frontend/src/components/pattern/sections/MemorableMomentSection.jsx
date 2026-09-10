import * as S from "./MemorableMomentSection.styles";
import {
  TitleBlock,
  SectionTitle,
  Subtitle,
  SummaryText,
} from "./RecentChangeSection.styles";
import { Section, CommonText } from "./HelpfulActionSection.styles";

function MemorableMomentSection({ triggers = [], topTimeSlot }) {
  const visibleMoments = triggers.filter((trigger) => trigger.count > 0);
  const maxCount = Math.max(...visibleMoments.map((moment) => moment.count), 0);
  const hourRange =
    topTimeSlot?.startHour != null && topTimeSlot?.endHour != null
      ? `${topTimeSlot.startHour}~${topTimeSlot.endHour}시`
      : null;

  if (visibleMoments.length === 0) {
    return null;
  }

  return (
    <Section>
      <TitleBlock>
        <SectionTitle>가장 생각났던 순간</SectionTitle>
        <Subtitle>최근 7일 기록</Subtitle>
      </TitleBlock>

      <S.MomentList>
        {visibleMoments.map((moment, index) => {
          const widthPercent =
            maxCount > 0 ? (moment.count / maxCount) * 100 : 0;
          const variant = index === 0 ? "best" : "normal";

          return (
            <S.MomentItem key={moment.id ?? moment.code ?? moment.name}>
              <S.MomentLabel $variant={variant}>{moment.name}</S.MomentLabel>
              <S.MomentContent>
                <S.MomentBar $widthPercent={widthPercent} $variant={variant} />
                <CommonText $variant={variant}>{moment.count}회</CommonText>
              </S.MomentContent>
            </S.MomentItem>
          );
        })}
      </S.MomentList>

      {hourRange ? (
        <SummaryText>💡 {hourRange}에 가장 많았어요</SummaryText>
      ) : null}
    </Section>
  );
}

export default MemorableMomentSection;
