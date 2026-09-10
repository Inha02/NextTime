import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const StatusScreen = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ $variant }) => ($variant === "embed" ? "12rem" : "100%")};
  padding: ${({ $variant }) =>
    $variant === "embed" ? "0.5rem 0" : "0 1.25rem"};
  padding-top: ${({ $variant }) =>
    $variant === "embed"
      ? "0.5rem"
      : "max(var(--safe-top), env(safe-area-inset-top, 0px))"};
  padding-bottom: ${({ $variant }) =>
    $variant === "embed"
      ? "0.5rem"
      : "max(var(--safe-bottom), env(safe-area-inset-bottom, 0px))"};
  background-color: ${({ $variant, theme }) => {
    if ($variant === "embed") return "transparent";
    if ($variant === "dark") return theme.colors.bg_black;
    return theme.colors.bg0;
  }};
`;

export const StatusContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 18rem;
  text-align: center;
`;

export const Spinner = styled.div`
  width: ${({ $variant }) => ($variant === "embed" ? "2.5rem" : "3.5rem")};
  height: ${({ $variant }) => ($variant === "embed" ? "2.5rem" : "3.5rem")};
  margin-bottom: 0.5rem;
  border-radius: 50%;
  border: 0.28rem solid ${({ theme }) => theme.colors.gray};
  border-top-color: ${({ theme }) => theme.colors.primary};
  box-sizing: border-box;
  animation: ${spin} 0.8s linear infinite;
`;

export const Mascot = styled.img`
  width: ${({ $variant }) => ($variant === "embed" ? "5rem" : "7.5rem")};
  height: auto;
  margin-bottom: 0.5rem;
  object-fit: contain;
`;

export const StatusTitle = styled.h2`
  color: ${({ theme, $variant }) =>
    $variant === "dark" ? theme.colors.white : theme.colors.bg1};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.4;
`;

export const StatusDesc = styled.p`
  color: ${({ theme, $variant }) =>
    $variant === "dark" ? theme.colors.light_gray : theme.colors.gray};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  white-space: pre-line;
`;

export const RetryButton = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
`;
