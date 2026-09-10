import styled from "styled-components";

export const DateTitle = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const DataFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FieldLabel = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 400;
  line-height: 1.4;
`;

export const FieldValue = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.bg1};
  line-height: 1.4;
`;
