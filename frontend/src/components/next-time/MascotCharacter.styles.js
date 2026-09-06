import styled from "styled-components";

export const Image = styled.img`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  object-fit: contain;
  flex-shrink: 0;
`;
