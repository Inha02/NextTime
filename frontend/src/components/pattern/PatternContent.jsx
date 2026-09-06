import * as S from "./PatternContent.styles";
import RecentChangeSection from "./sections/RecentChangeSection";
import HelpfulActionSection from "./sections/HelpfulActionSection";
import MemorableMomentSection from "./sections/MemorableMomentSection";
import RecentRecordsSection from "./sections/RecentRecordsSection";

function PatternContent({ overview }) {
  const {
    insight,
    behaviorChange,
    effectiveActions = [],
    frequentTriggers = [],
    recentRecords = [],
  } = overview ?? {};

  return (
    <S.Container>
      {behaviorChange ? (
        <RecentChangeSection behaviorChange={behaviorChange} />
      ) : null}
      {effectiveActions.length > 0 ? (
        <HelpfulActionSection actions={effectiveActions} />
      ) : null}
      {frequentTriggers.length > 0 ? (
        <MemorableMomentSection
          triggers={frequentTriggers}
          topTimeSlot={insight?.topTimeSlot}
        />
      ) : null}
      <RecentRecordsSection records={recentRecords} />
    </S.Container>
  );
}

export default PatternContent;
