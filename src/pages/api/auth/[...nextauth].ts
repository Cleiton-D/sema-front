import { SchoolYear } from 'models/SchoolYear';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers, { CredentialsProvider } from 'next-auth/providers';

import { initializeApi } from 'services/api';

const Teste: CredentialsProvider = (options) => ({
  id: 'teste',
  name: 'teste',
  type: 'credentials',
  authorize: () => null,
  credentials: () => null,
  ...options
});

const signInProvider = Providers.Credentials({
  name: 'sign-in',
  credentials: {},
  async authorize({ email, password }: Record<string, string>) {
    const api = initializeApi();

    const response = await api.post(`/sessions`, {
      login: email,
      password
    });

    const { data } = response;
    if (data.user) {
      return {
        ...data.user,
        name: data.user.username,
        jwt: data.token
      };
    }

    return null;
  }
});

const options = {
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    signInProvider,
    Teste({
      name: 'teste',
      credentials: {},
      async authorize(args: Record<string, string>) {
        console.log(args);
        return null;
      }
    })
  ],
  callbacks: {
    session: async (session: any, user: any) => {
      const api = initializeApi();

      const { data } = await api.get('/users/me', {
        headers: { authorization: user.jwt ? `Bearer ${user.jwt}` : '' }
      });

      const { school_year_id, ...rest } = user;

      session.jwt = user.jwt;
      session.id = user.id;
      session.user = {
        ...rest,
        changePassword: data.change_password
      };
      session.configs = {
        school_year_id: school_year_id
      };

      return Promise.resolve(session);
    },
    jwt: async (token: any, user: any) => {
      if (user) {
        const api = initializeApi();

        try {
          const { data } = await api.get<SchoolYear>(
            '/education/admin/school-years/current',
            {
              headers: { authorization: user.jwt ? `Bearer ${user.jwt}` : '' }
            }
          );

          token.school_year_id = data?.id;
        } catch {
          token.school_year_id = undefined;
        }

        token.id = user.id;
        token.email = user.login;
        token.jwt = user.jwt;
      }

      return Promise.resolve(token);
      // if (user) {
      //   const api = initializeApi();
      //   const { data } = await api.get<SchoolYear>(
      //     '/education/admin/school-years/current',
      //     {
      //       headers: { authorization: user.jwt ? `Bearer ${user.jwt}` : '' }
      //     }
      //   );

      //   token.id = user.id;
      //   token.email = user.login;
      //   token.jwt = user.jwt;
      //   token.school_year_id = data?.id;
      // }

      // return Promise.resolve(token);
    }
  }
};

const Auth = (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, options);

export default Auth;
