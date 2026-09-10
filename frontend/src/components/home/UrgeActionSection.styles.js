import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Title = styled.h3`
  color: #000;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.4;
`;

export const Subtitle = styled.p`
  color: #000;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
`;

export const QuickRecordRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const QuickRecordLabel = styled.span`
  color: ${({ theme }) => theme.colors.bg1};
`;

export const QuickRecordLink = styled.button`
  border: none;
  background: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.gray};
  font: inherit;
  cursor: pointer;
`;
