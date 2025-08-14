import { type FC } from 'react';
import { type Params, useLoaderData } from 'react-router';
import { getUserById } from '../../../api/user';
import { DocumentTitle } from '../../../components/DocumentTitle';
import { Template } from './template';

/**
 * User page loader.
 */
export async function loader({ params: { userId } }: { params: Params<'userId'> }) {
  if (!userId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const user = await getUserById(Number(userId));

  return {
    user,
  };
}

/**
 * User page component.
 */
export const Component: FC = () => {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <DocumentTitle title={user.name} />

      <Template user={user} />
    </>
  );
};
