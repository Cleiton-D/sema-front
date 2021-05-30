import { GetServerSidePropsContext } from 'next';

import Grades from 'templates/Administration/Grades';
import { listGrades } from 'requests/queries/grades';
import prefetchQuery from 'utils/prefetch-query';

import protectedRoutes from 'utils/protected-routes';

export default function GradePage() {
  return <Grades />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const dehydratedState = await prefetchQuery('get-grades', () =>
    listGrades(session)
  );

  return {
    props: {
      session,
      dehydratedState
    }
  };
}