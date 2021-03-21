import { AppProps } from 'next/app';
import Head from 'next/head';

import { Provider as AuthProvider } from 'next-auth/client';

import GlobalStyles from 'styles/global';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Head>
        <title>SEMA</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
