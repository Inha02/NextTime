import { Outlet, useLocation } from "react-router-dom";
import BottomNavigation from "../components/common/navigation/BottomNavigation";
import styled from "styled-components";

function TabLayout() {
  const { pathname } = useLocation();

  return (
    <TabContainer>
      <MainContent>
        <Outlet key={pathname} />
      </MainContent>
      <BottomNavigation />
    </TabContainer>
  );
}

export default TabLayout;

const TabContainer = styled.div`
  flex: 1;
  min-height: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.bg0};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContent = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;
