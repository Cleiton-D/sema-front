import styled, { css } from 'styled-components';

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: grid;
    grid-template-areas:
      'sidebar header'
      'sidebar main-content';
    grid-template-columns: 29rem 1fr;
    grid-template-rows: 10rem 1fr;
    width: 100vw;
    height: 100vh;
    background: ${theme.colors.mainBg};
  `}
`;

export const Content = styled.section`
  grid-area: main-content;
  overflow-y: auto;
`;
