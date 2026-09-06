import styled from "styled-components";
import { CommonText } from "./HelpfulActionSection";

export const MomentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MomentItem = styled.div`
  display: flex;
`;

export const MomentLabel = styled(CommonText)`
  width: 10.19rem;
  flex-shrink: 0;
  text-align: start;
`;

export const MomentContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.06rem;
  flex: 1;
`;

export const MomentBar = styled.div`
  width: ${({ $widthPercent }) =>
        (10 * $widthPercent) / 100}rem;
  height: 1.3125rem;
  flex-shrink: 0;
  background: ${({ $variant, theme }) =>
        $variant === "best" ? theme.colors.primary : theme.colors.light_gray};
`;