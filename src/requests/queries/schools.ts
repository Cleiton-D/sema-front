import { Session } from 'next-auth';
import { QueryOptions, useQuery } from 'react-query';

import { SchoolWithEnrollCount } from 'models/School';
import { initializeApi } from 'services/api';

export const listSchools = (session?: Session | null) => {
  const api = initializeApi(session);

  return api
    .get<SchoolWithEnrollCount[]>('/schools')
    .then((response) => response.data);
};

export const useListSchools = (
  session?: Session | null,
  queryOptions: QueryOptions<SchoolWithEnrollCount[]> = {}
) => {
  return useQuery<SchoolWithEnrollCount[]>(
    'get-schools',
    () => listSchools(session),
    queryOptions
  );
};
