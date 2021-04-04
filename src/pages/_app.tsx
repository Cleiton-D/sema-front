import { AppProps } from 'next/app';
import Head from 'next/head';

import { Provider as AuthProvider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from 'styles/global';
import theme from 'styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>SEMA</title>
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
