import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  flex-shrink: 0;
  margin-top: auto;
  padding-top: 0.625rem;
  padding-bottom: max(0.5rem, env(safe-area-inset-bottom, 0px));
  align-items: flex-start;
  box-sizing: border-box;
  border-top: 0.669px solid rgba(44, 44, 48, 0.2);
  background: ${({ theme }) => theme.colors.white};
`;
