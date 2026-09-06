import styled from "styled-components";

export const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.bg1};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.4;
`;

export const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TimeLabel = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 400;
  line-height: 1.4;
`;

export const Time = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.bg1};
  line-height: 1.4;
`;

export const QuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const QuestionLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.4;
`;

export const OptionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const OptionButton = styled.button`
  display: inline-flex;
  min-height: 2.75rem;
  padding: 0.625rem 1rem;
  align-items: center;
  border-radius: 0.5rem;
  border: ${({ $active, theme }) =>
        $active
            ? `1px solid ${theme.colors.primary}`
            : `0.4px solid ${theme.colors.light_gray}`};
  background: ${({ $active }) =>
        $active ? "rgba(0, 213, 121, 0.1)" : "transparent"};
  cursor: pointer;

  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.875rem;
  line-height: 1.3125rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
`;

export const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SkipButton = styled.button`
  width: 100%;
  height: 3.5rem;
  border: none;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
