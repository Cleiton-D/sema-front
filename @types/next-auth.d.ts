import NextAuth from 'next-auth';
import { RedirectableProvider } from 'next-auth/client';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      changePassword: boolean;
    };
    configs: {
      school_year_id: string;
    };
    jwt: string;
    id: string;
  }
}

declare module 'next-auth/client' {
  export type CustomRedirectableProvider = RedirectableProvider | 'teste';

  export function signIn<P extends SignInProvider = undefined>(
    provider?: P,
    options?: SignInOptions,
    authorizationParams?: SignInAuthorisationParams
  ): Promise<
    P extends CustomRedirectableProvider
      ? SignInResponse | undefined
      : undefined
  >;
}
