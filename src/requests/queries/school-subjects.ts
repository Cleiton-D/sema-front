import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { SchoolSubject } from 'models/SchoolSubject';
import { initializeApi } from 'services/api';

export const listSchoolSubjects = (session?: Session | null) => {
  const api = initializeApi(session);

  return api
    .get<SchoolSubject[]>('/education/admin/school-subjects')
    .then((response) => response.data);
};

export const useListSchoolsSubjects = (session?: Session | null) => {
  return useQuery('get-school-subjects', () => listSchoolSubjects(session));
};
