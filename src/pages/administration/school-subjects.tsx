import { GetServerSidePropsContext } from 'next';

import SchoolSubject from 'templates/Administration/SchoolSubjects';

import { listSchoolSubjects } from 'requests/queries/school-subjects';

import prefetchQuery from 'utils/prefetch-query';
import protectedRoutes from 'utils/protected-routes';

export default function SchoolSubjectPage() {
  return <SchoolSubject />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  const dehydratedState = await prefetchQuery({
    key: 'get-school-subjects',
    fetcher: () => listSchoolSubjects(session)
  });

  return {
    props: {
      session,
      dehydratedState
    }
  };
}
