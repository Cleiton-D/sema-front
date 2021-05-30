import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/lib/style.css';

import { QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { Provider as AuthProvider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';

import { AtomProvider, AtomHydrator } from 'hooks/AtomProvider';

import GlobalStyles from 'styles/global';
import theme from 'styles/theme';

import { queryClient } from 'services/api';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AtomProvider initialState={pageProps.initialState}>
            <AtomHydrator initialState={pageProps.initialState}>
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
            </AtomHydrator>
          </AtomProvider>
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
