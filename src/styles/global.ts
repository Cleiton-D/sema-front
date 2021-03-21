import {
  GlobalStyleComponent,
  DefaultTheme,
  createGlobalStyle
} from 'styled-components';

const GlobalStyles: GlobalStyleComponent<
  never,
  DefaultTheme
> = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &::before, &::after {
      box-sizing: inherit;
    }
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: Arial;
    font-size: 2rem;

    height: 100vh;
    width: 100vw;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
