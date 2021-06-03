import { GetServerSidePropsContext } from 'next';
import { getSchool } from 'requests/queries/schools';

import School from 'templates/School';
import prefetchQuery from 'utils/prefetch-query';

import protectedRoutes from 'utils/protected-routes';

export default function SchoolPage() {
  return <School />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const { school_id } = context.params!;

  const filters = {
    id: school_id as string
  };

  const dehydratedState = await prefetchQuery({
    key: `get-school${JSON.stringify(filters)}`,
    fetcher: () => getSchool(session, filters)
  });

  return {
    props: {
      session,
      dehydratedState
    }
  };
}
