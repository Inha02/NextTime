import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 8px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const AppFrame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;

  > *:first-child {
    flex: 1;
    min-height: 0;
    width: 100%;
  }
`;

export const ToastWrapper = styled.div`
  position: absolute;
  bottom: ${({ $placement }) =>
    $placement === "tab-bottom"
      ? "calc(4.5rem + env(safe-area-inset-bottom, 0px))"
      : "32px"};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: max-content;
  max-width: ${({ $multiline }) =>
    $multiline ? "min(20rem, calc(100% - 2.5rem))" : "calc(100% - 2.5rem)"};
  flex: none;
  padding: 16px 28px;
  border-radius: 6.25rem;
  background-color: ${({ theme }) => theme.brand.toast.bg};
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  white-space: ${({ $multiline }) => ($multiline ? "pre-line" : "normal")};
  word-break: keep-all;
  overflow-wrap: break-word;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  animation: ${slideUp} 0.25s ease;
`;

export const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
`;
