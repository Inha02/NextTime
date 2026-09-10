import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  height: 3.5rem;
  border: none;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ $variant, $disabled, theme }) => {
        if ($disabled || $variant === "ghost") {
            return `rgba(247, 247, 250, 0.1)`;
        }
        if ($variant === "primary") {
            return theme.colors.primary;
        }
        return `rgba(247, 247, 250, 0.1)`;
    }};
`;
