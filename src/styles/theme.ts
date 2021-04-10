export default {
  grid: {
    container: '130rem',
    gutter: '3.2rem'
  },
  border: {
    radius: '0.4rem',
    rounded: '10rem'
  },
  shadow: {
    none: '0',
    small: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    medium: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    large: '0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.1)'
  },
  font: {
    poppins:
      "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    inter:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xsmall: '1.2rem',
      small: '1.4rem',
      medium: '1.6rem',
      large: '1.8rem',
      xlarge: '2.0rem',
      xxlarge: '2.8rem',
      huge: '5.2rem'
    }
  },
  background: {
    primary: '#0393BE',
    black: '#000000',
    white: '#ffffff',
    transparent: 'transparent'
  },
  colors: {
    primary: '#0393BE',
    secondary: '#0DBF87',
    mainBg: '#F8FAFA',
    white: '#ffffff',
    black: '#13110C',
    lightGray: '#BFC1C2',
    gray: '#717273',
    yellow: '#F4DA85',
    red: '#EE4C4C',
    silver: '#556365',
    lightSilver: '#97AEB1'
  },
  spacings: {
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '4.8rem',
    xxlarge: '5.6rem'
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  }
} as const;
