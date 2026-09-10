import styled from "styled-components";

export const TabName = styled.p`
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.4;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.375rem;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
`;

export const TextBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  margin-top: 0.22rem;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.bg0};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.4;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.4;
  word-break: keep-all;
`;

export const QuoteLabel = styled.p`
  color: ${({ theme }) => theme.colors.bg0};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const Quote = styled.p`
  color: ${({ theme }) => theme.colors.bg0};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  word-break: keep-all;
  margin-right: 0.63rem;
`;

export const Mascot = styled.img`
  width: min(9.4375rem, 36vw);
  height: auto;
  max-height: 10.6875rem;
  aspect-ratio: 151 / 171;
  object-fit: contain;
  flex-shrink: 1;
  min-width: 0;
`;
