import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { initializeApi } from 'services/api';
import { ClassPeriod, FormattedClassPeriod } from 'models/ClassPeriod';
import { classPeriodsMapper } from 'utils/mappers/classPeriodMapper';

export const listClassPeriods = (
  session?: Session | null
): Promise<FormattedClassPeriod[]> => {
  const api = initializeApi(session);

  return api
    .get<ClassPeriod[]>('/education/admin/class-periods')
    .then((response) => response.data.map(classPeriodsMapper));
};

export const useListClassPeriods = (session?: Session | null) => {
  return useQuery('get-class-periods', () => listClassPeriods(session));
};
