import { type FC } from 'react';
import { useLoaderData } from 'react-router';
import { getAllUsers } from '../../api/user';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Template } from './template';

/**
 * Users page loader.
 */
export async function loader() {
  const users = await getAllUsers();

  return {
    users,
  };
}

/**
 * Users page component.
 */
export const Component: FC = () => {
  const { users } = useLoaderData<typeof loader>();

  return (
    <>
      <DocumentTitle title="Users" />

      <Template users={users} />
    </>
  );
};
