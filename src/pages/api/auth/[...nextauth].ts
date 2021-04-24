import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

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
        const response = await axios.post(`${process.env.API_URL}/sessions`, {
          login: email,
          password
        });

        const { data } = response;
        if (data.user) {
          return {
            ...data.user,
            jwt: data.token
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    session: async (session: any, user: any) => {
      session.jwt = user.jwt;
      session.id = user.id;
      session.user = {
        ...session.user,
        changePassword: user.changePassword
      };

      return Promise.resolve(session);
    },
    jwt: async (token: any, user: any) => {
      if (user) {
        token.id = user.id;
        token.email = user.login;
        token.jwt = user.jwt;
        token.changePassword = user.change_password;
      }

      return Promise.resolve(token);
    }
  }
};

const Auth = (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, options);

export default Auth;
