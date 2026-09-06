import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 2rem;
  padding-bottom: 2rem;
  min-height: 100%;

  /* 두 번째 자식부터 모두 */
  & > * + * {
    padding-top: 1.25rem;
    padding-bottom: 1.75rem;
  }

  /* 마지막 자식 빼고 모두 */
  & > *:not(:last-child) {
    border-bottom: 1px solid rgba(178, 178, 178, 0.2);
  }

  & > *:last-child {
    padding-bottom: 0;
  }
`;
