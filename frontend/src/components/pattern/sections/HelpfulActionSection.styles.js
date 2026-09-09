import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  line-height: 1.4;
`;

export const ActionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ActionItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: auto;
`;

export const CommonText = styled.p`
  color: ${({ $variant, theme }) =>
        $variant === "best" ? theme.colors.primary : theme.colors.gray};
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const ActionText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ActionDetail = styled.p`
  color: ${({ theme }) => theme.colors.bg1};
  font-size: 0.75rem;
  font-weight: 400;
`;
