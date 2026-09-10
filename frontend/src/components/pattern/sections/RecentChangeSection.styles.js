import styled from "styled-components";
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.75rem;
  line-height: 1.4;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-self: flex-start;
`;

export const SectionTitle = styled.p`
  color: #000;
  font-size: 1.125rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.bg1};
  font-size: 0.75rem;
  font-weight: 400;
`;

export const SummaryBlock = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const PatternArrowIcon = styled.img`
  width: 2.125rem;
  height: 1.25rem;
  display: block;
  flex-shrink: 0;
  object-fit: contain;
`;

export const SummaryText = styled.p`
  width: 100%;
  display: flex;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  background: rgba(178, 178, 178, 0.1);

  color: ${({ theme }) => theme.colors.bg1};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
`;
