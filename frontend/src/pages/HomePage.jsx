import TabMainLayout from "../layouts/TabMainLayout";
import HomeHeader from "../components/home/HomeHeader";
import HomeContent from "../components/home/HomeContent";
import useAsync from "../hooks/useAsync";
import useRefetchOnVisit from "../hooks/useRefetchOnVisit";
import useStartNextTime from "../hooks/useStartNextTime";
import { getHome } from "../api/home";

function HomePage() {
  const { data: homeData, refetch, setData } = useAsync(getHome);
  useRefetchOnVisit(refetch);
  const { start: startNextTime, isLoading: isStarting } = useStartNextTime(
    homeData?.activeNextTimeSession,
  );

  const handleSmokingRecorded = (_record, nextHome) => {
    if (nextHome) setData(nextHome);
  };

  if (!homeData) return null;

  return (
    <TabMainLayout
      scrollEntirePage
      header={<HomeHeader nextMe={homeData.nextMe} />}
      content={
        <HomeContent
          todaySummary={homeData.todaySummary}
          onStartNextTime={startNextTime}
          onSmokingRecorded={handleSmokingRecorded}
          isStarting={isStarting}
        />
      }
    />
  );
}

export default HomePage;
