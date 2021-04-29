import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export default async function prefetchQuery(
  key: string,
  fn: () => unknown | Promise<unknown>
) {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(key, fn);

  return dehydrate(queryClient);
}
