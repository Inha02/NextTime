import UrgeActionSection from "./UrgeActionSection";
import TodayChangeSection from "./TodayChangeSection";
import * as S from "./HomeContent.styles";

function HomeContent({
  todaySummary,
  onStartNextTime,
  onSmokingRecorded,
  isStarting = false,
}) {
  const hasTodayRecords = (todaySummary?.totalAttemptCount ?? 0) > 0;

  return (
    <S.Container>
      <UrgeActionSection
        onStartNextTime={onStartNextTime}
        onSmokingRecorded={onSmokingRecorded}
        isStarting={isStarting}
      />
      {hasTodayRecords && <TodayChangeSection todaySummary={todaySummary} />}
    </S.Container>
  );
}
export default HomeContent;
