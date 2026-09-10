import TabMainLayout from "../layouts/TabMainLayout";
import PatternHeader from "../components/pattern/PatternHeader";
import PatternContent from "../components/pattern/PatternContent";
import PatternEmptyHeader from "../components/pattern/empty/PatternEmptyHeader";
import PatternEmptyContent from "../components/pattern/empty/PatternEmptyContent";
import useAsync from "../hooks/useAsync";
import useRefetchOnVisit from "../hooks/useRefetchOnVisit";
import usePatternSummary from "../hooks/usePatternSummary";
import { getPatternOverview } from "../api/pattern";

function PatternPage() {
  const { data: overview, refetch } = useAsync(getPatternOverview);
  useRefetchOnVisit(refetch);
  const { isReady, recordCount, requiredCount } = usePatternSummary(overview);

  if (!overview) return null;

  return isReady ? (
    <TabMainLayout
      scrollEntirePage
      header={<PatternHeader overview={overview} />}
      content={<PatternContent overview={overview} />}
    />
  ) : (
    <TabMainLayout
      scrollEntirePage
      header={<PatternEmptyHeader />}
      content={
        <PatternEmptyContent
          recordCount={recordCount}
          requiredCount={requiredCount}
        />
      }
    />
  );
}

export default PatternPage;
