import styled from 'styled-components';
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ViewAllButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.light_gray};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.4;
`;
