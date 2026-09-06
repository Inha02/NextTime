import styled from "styled-components";

export const TopBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabName = styled.p`
  color: ${({ theme }) => theme.colors.bg0};
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.4;
`;

export const Recent = styled.p`
  color: ${({ theme }) => theme.colors.bg0};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const PatternDescription = styled.p`
  color: ${({ theme }) => theme.colors.bg0};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
  word-break: keep-all;
`;
