import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 7rem;
  padding: 0.75rem 1rem;

  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  background: rgba(247, 247, 250, 0.1);

  color: ${({ theme }) => theme.colors.gray};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;

  resize: none;
  outline: none;
  box-sizing: border-box;
  word-break: keep-all;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }

  &:focus {
    color: ${({ theme }) => theme.colors.bg0};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
