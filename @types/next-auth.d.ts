import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      changePassword: boolean;
    };
    jwt: string;
    id: string;
  }
}
