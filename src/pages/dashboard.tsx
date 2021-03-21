import { GetServerSidePropsContext } from 'next';
import { signOut } from 'next-auth/client';

import protectedRoutes from 'utils/protected-routes';

export default function Dashboard() {
  const handleSignout = () => {
    signOut();
  };

  return (
    <div>
      <h1>Vc está logado</h1>
      <button onClick={handleSignout}>Logout</button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  return {
    props: {
      session
    }
  };
}
