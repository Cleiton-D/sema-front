import { GetServerSidePropsContext } from 'next';
import protectedRoutes from 'utils/protected-routes';

import ChangePassword from 'templates/ChangePassword';

export default function ChangePasswordPage() {
  return <ChangePassword />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context, false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!session!.user?.changePassword) {
    const location = context.query.callbackUrl || '/';

    context.res.writeHead(302, { Location: location });
    context.res.end();
  }

  return { props: {} };
}
