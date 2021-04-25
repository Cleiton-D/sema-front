import { GetServerSidePropsContext } from 'next';
import { signOut } from 'next-auth/client';

import Dashboard from 'templates/Dashboard';

import protectedRoutes from 'utils/protected-routes';

export default function DashboardPage() {
  return <Dashboard />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  return {
    props: {
      session
    }
  };
}
