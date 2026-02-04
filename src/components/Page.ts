import styled from 'styled-components';

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  overflow: hidden;
`;
