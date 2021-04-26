import { useMemo } from 'react';
import { Session } from 'next-auth';
import useSWR, { SWRConfiguration } from 'swr';
import axios, { AxiosResponse } from 'axios';

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

type FetchOptions<T> = {
  session?: Session | null;
  formatter?: (value: any) => T;
};

export function useSWRFetch<T = unknown>(
  url: string,
  options: FetchOptions<T> = {},
  swrConfig: SWRConfiguration = {}
) {
  const api = useApi(options.session);
  const newSwrConfig = useMemo(() => {
    const initialData = swrConfig.initialData;
    if (initialData) {
      const newInitalData: Partial<AxiosResponse<unknown>> = {
        data: initialData
      };
      return { ...swrConfig, initialData: newInitalData };
    }

    return swrConfig;
  }, [swrConfig]);

  const { data, ...rest } = useSWR<AxiosResponse<unknown>>(
    url,
    api.get,
    newSwrConfig
  );

  return useMemo(() => {
    const responseData = data?.data as T | undefined;

    if (!responseData || !options.formatter)
      return { data: responseData, ...rest };

    const newData = options.formatter(responseData);
    return { data: newData, ...rest };
  }, [options, data, rest]);
}
