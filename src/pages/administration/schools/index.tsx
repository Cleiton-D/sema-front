import { GetServerSidePropsContext } from 'next';

import Schools from 'templates/Administration/Schools';
import { listSchools } from 'requests/queries/schools';
import prefetchQuery from 'utils/prefetch-query';

import protectedRoutes from 'utils/protected-routes';

export default function SchoolsPage() {
  return <Schools />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const dehydratedState = await prefetchQuery('get-schools', () =>
    listSchools(session)
  );

  return {
    props: {
      session,
      dehydratedState
    }
  };
}
