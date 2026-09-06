import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const MenuLink = styled(NavLink)`
  flex: 1;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 400;
  text-decoration: none;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

export const MenuButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const MenuIcon = styled.span`
  width: 1.375rem;
  height: 1.375rem;
`;

export const MenuText = styled.p`
  text-align: center;
  font-size: 0.625rem;
  line-height: 0.9375rem; /* 150% */
  letter-spacing: -0.0125rem;
`;
