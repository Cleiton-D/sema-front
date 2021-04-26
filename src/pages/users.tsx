import { GetServerSidePropsContext } from 'next';

import Users, { UsersProps } from 'templates/Users';

import { User as UserType } from 'models/User';

import { initializeApi } from 'services/api';
import protectedRoutes from 'utils/protected-routes';

export default function UsersPage(props: UsersProps) {
  return <Users {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);
  const api = initializeApi(session);

  const response = await api.get<UserType[]>('/users');
  const users = response.data || [];

  return { props: { session, users } };
}
