import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SectionTitle = styled.h3`
  color: #000;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.4;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 1.25rem;
  background: rgba(178, 178, 178, 0.04);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:hover {
    opacity: 0.98;
  }

  &:active {
    transform: scale(0.995);
    opacity: 0.96;
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatCount = styled.p`
  line-height: 1.4;
`;

export const Strong = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
`;

export const Muted = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.125rem;
  font-weight: 700;
`;

export const StatLabel = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const Chevron = styled.img`
  width: 0.5rem;
  height: 0.875rem;
  aspect-ratio: 4/7;
  object-fit: contain;
  display: block;
`;

export const MiddleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Summary = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(178, 178, 178, 0.3);
  margin: 0;
`;

export const NextActionBlock = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.bg1};
  line-height: 1.4;
`;

export const NextActionLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const NextActionTitle = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

export const NextActionDesc = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
`;
