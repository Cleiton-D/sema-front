import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
        <NextNprogress
          color={theme.colors.primary}
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
        />
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
