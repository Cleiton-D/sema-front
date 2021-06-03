import { GetServerSidePropsContext } from 'next';

import Classrooms from 'templates/Classrooms';

import { listClassrooms } from 'requests/queries/classrooms';

import protectedRoutes from 'utils/protected-routes';
import prefetchQuery from 'utils/prefetch-query';

export default function ClassroomsPage() {
  return <Classrooms />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const { school_id } = context.params!;

  const filters = {
    school_id: school_id as string
  };

  const dehydratedState = await prefetchQuery({
    key: `list-classrooms-${JSON.stringify(filters)}`,
    fetcher: () => listClassrooms(session, filters)
  });

  return {
    props: {
      session,
      dehydratedState
    }
  };
}
