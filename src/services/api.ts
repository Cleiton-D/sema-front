import { useMemo } from 'react';
import { Session } from 'next-auth';
import axios from 'axios';

const createApi = (session?: Session | null) => {
  const jwt = session?.jwt;

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : ''
    }
  });

  return api;
};

export function initializeApi(session?: Session | null) {
  return createApi(session);
}

export function useApi(session?: Session | null) {
  const store = useMemo(() => createApi(session), [session]);
  return store;
}
