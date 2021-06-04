import { GetServerSidePropsContext } from 'next';

import Enrolls from 'templates/Enrolls';

import { listEnrolls } from 'requests/queries/enrolls';

import prefetchQuery from 'utils/prefetch-query';
import protectedRoutes from 'utils/protected-routes';

export default function EnrollsPage() {
  return <Enrolls />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const { school_id } = context.params!;

  const filters = {
    school_id: school_id as string
  };

  const dehydratedState = await prefetchQuery({
    key: `list-enrolls-${JSON.stringify(filters)}`,
    fetcher: () => listEnrolls(session, filters)
  });

  return {
    props: {
      session,
      dehydratedState
    }
  };
}
