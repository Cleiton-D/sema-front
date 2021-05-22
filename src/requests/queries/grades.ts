import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { Grade } from 'models/Grade';
import { initializeApi } from 'services/api';

export const listGrades = (session?: Session | null) => {
  const api = initializeApi(session);

  return api
    .get<Grade[]>('/education/admin/grades')
    .then((response) => response.data);
};

export const useListGrades = (session?: Session | null) => {
  return useQuery('get-grades', () => listGrades(session));
};
