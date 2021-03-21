import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const options = {
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    Providers.Credentials({
      name: 'sign-in',
      credentials: {},
      async authorize({ email, password }) {
        const response = await axios.post('http://localhost:3333/sessions', {
          login: email,
          password
        });

        const { data } = response;
        if (data.user) {
          return { ...data.user, jwt: data.token };
        }

        return null;
      }
    })
  ],
  callbacks: {
    session: async (session: any, user: any) => {
      session.jwt = user.jwt;
      session.id = user.id;

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
