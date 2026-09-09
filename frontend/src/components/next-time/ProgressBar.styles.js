import styled from "styled-components";

export const Track = styled.div`
  width: 100%;
  height: 0.25rem;
  border-radius: 6.25rem;
  background: rgba(178, 178, 178, 0.4);
  overflow: hidden;
`;

export const Fill = styled.div`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  border-radius: 6.25rem;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.2s ease;
`;
