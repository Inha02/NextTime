import styled from "styled-components";

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const CardCell = styled.div`
  min-width: 0;

  & > button {
    width: 100%;
    aspect-ratio: 1 / 1;
  }
`;

export const ChipGrid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ $gap }) => $gap};
`;

export const ChipGrid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

export const ChipList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;
