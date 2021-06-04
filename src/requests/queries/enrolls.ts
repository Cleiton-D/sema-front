import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { Enroll } from 'models/Enroll';

import { initializeApi } from 'services/api';

type EnrollFilters = {
  classroom_id?: string;
  school_id?: string;
  grade_id?: string;
};

export const listEnrolls = (
  session?: Session | null,
  filters: EnrollFilters = {}
) => {
  const api = initializeApi(session);

  return api
    .get<Enroll[]>('/enrolls', { params: filters })
    .then((response) => response.data);
};

export const useListEnrolls = (
  session?: Session | null,
  filters: EnrollFilters = {}
) => {
  const key = `list-enrolls-${JSON.stringify(filters)}`;

  const result = useQuery(key, () => listEnrolls(session, filters));
  return { ...result, key };
};
