import styled from "styled-components";

export const MiddleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  padding-bottom: 0.5rem;
  margin-top: 0.37rem;
`;

export const TextBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: flex-start;
  margin-top: 0.13rem;
  line-height: 1.4;
  word-break: keep-all;
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: 700;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.bg0};
  font-size: 1.5rem;
  font-weight: 700;
`;

export const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 400;
`;

export const Mascot = styled.img`
  width: min(8.9375rem, 34vw);
  height: auto;
  max-height: 8.4375rem;
  object-fit: contain;
  flex-shrink: 1;
  min-width: 0;
`;

export const BottomBlock = styled.div`
  max-width: 100%;
  border-top: 1px solid rgba(254, 254, 254, 0.2);
  padding-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  word-break: keep-all;
`;

export const Solution = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
`;

export const Emphasis = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
`;

export const SimilarPattern = styled.p`
  max-width: 15rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
`;

export const Bold = styled.span`
  font-weight: 700;
`;
