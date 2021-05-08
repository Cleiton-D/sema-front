import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { School } from 'models/School';
import { initializeApi } from 'services/api';

export const listSchools = (session?: Session | null) => {
  const api = initializeApi(session);

  return api.get<School[]>('/schools').then((response) => response.data);
};

export const useListSchools = (session?: Session | null) => {
  return useQuery('get-schools', () => listSchools(session));
};
