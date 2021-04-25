import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { initializeApi } from 'services/api';

const options = {
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    Providers.Credentials({
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
    })
  ],
  callbacks: {
    session: async (session: any, user: any) => {
      const api = initializeApi();

      const { data } = await api.get('/users/me', {
        headers: { authorization: user.jwt ? `Bearer ${user.jwt}` : '' }
      });

      session.jwt = user.jwt;
      session.id = user.id;
      session.user = {
        ...session.user,
        changePassword: data.change_password
      };

      return Promise.resolve(session);
    },
    jwt: async (token: any, user: any) => {
      if (user) {
        token.id = user.id;
        token.email = user.login;
        token.jwt = user.jwt;
      }

      return Promise.resolve(token);
    }
  }
};

const Auth = (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, options);

export default Auth;
