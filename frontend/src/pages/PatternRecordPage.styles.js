import styled from 'styled-components';
import { RecordItem } from "../components/pattern/RecordList.styles";

export const PageContainer = styled.div`
  position: relative;
  height: 100%; /* 부모 레이아웃 기준으로 꽉 채움 */
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg0};
`;

export const HeaderWrap = styled.div`
  flex-shrink: 0; /* 헤더 영역은 줄어들지 않게 고정 */
`;

export const ScrollContent = styled.div`
  flex: 1; /* 남은 공간 전부 차지 */
  overflow-y: auto; /* 이 영역만 스크롤 */
  padding: 3.87rem 1.25rem 1.75rem 1.25rem;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  text-align: center;
  padding-top: 2.5rem;
`;

export const RecordPageItem = styled(RecordItem)`
  cursor: pointer;
`;

export const AddButton = styled.button`
  position: absolute; /* 화면 기준 고정 */
  bottom: 2.75rem;
  right: 1.25rem;

  border: none;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 27.5735rem;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);

  display: flex;
  width: 3.75rem;
  height: 3.75rem;
  padding: 0.77206rem;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  z-index: 10; /* 콘텐츠 위에 항상 보이도록 */
  cursor: pointer;
`;

export const AddImg = styled.img`
  width: 2.20588rem;
  height: 2.20588rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;
