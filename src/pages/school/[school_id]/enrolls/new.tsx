import { GetServerSidePropsContext } from 'next';

import NewEnroll from 'templates/Enrolls/New';

import protectedRoutes from 'utils/protected-routes';

export default function NewEnrollPage() {
  return <NewEnroll />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  return {
    props: {
      session
    }
  };
}
