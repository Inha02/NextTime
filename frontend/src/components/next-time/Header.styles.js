import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  position: relative;
`;

export const NavRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding-bottom: 1.25rem;
`;

export const BackButton = styled.button`
  grid-column: 1;
  justify-self: start;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
`;

export const TitleBlock = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center; /* 타이틀만 있을 때도 가운데 정렬 */
  gap: 0.25rem;
  min-width: 0;
`;

export const ArrowIcon = styled.img`
  width: 0.73594rem;
  height: 1.25rem;
  flex-shrink: 0;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.bg0};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.4;
`;
