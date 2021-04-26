import { useCallback } from 'react';
import { Session } from 'next-auth';

import { User, FormattedUser } from 'models/User';

import { useSWRFetch } from 'services/api';
import { userMapper } from 'utils/mappers/userMapper';

type UseUsersProps = {
  initialData?: User[];
  session?: Session | null;
};
export const useUsers = ({ initialData, session }: UseUsersProps) => {
  const usersFormatter = useCallback((users: User[]) => {
    return users.map(userMapper);
  }, []);

  return useSWRFetch<FormattedUser[]>(
    '/users',
    { session, formatter: usersFormatter },
    { initialData }
  );
};
