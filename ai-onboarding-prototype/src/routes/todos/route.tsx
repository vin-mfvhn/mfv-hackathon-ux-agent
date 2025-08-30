import { type FC, type FormEvent } from 'react';
import { useLoaderData, useSubmit, type LoaderFunctionArgs } from 'react-router';
import { getAllTodos } from '../../api/todo';
import { getAllUsers } from '../../api/user';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Template } from './template';

/**
 * Todos page loader.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const author = url.searchParams.get('author');

  const [todos, users] = await Promise.all([
    getAllTodos(author ? { userId: Number(author) } : undefined),
    getAllUsers(),
  ]);

  return {
    todos,
    users,
    author,
  };
}

/**
 * Todos page component.
 */
export const Component: FC = () => {
  const { todos, users, author } = useLoaderData<typeof loader>();

  const submit = useSubmit();

  const handleFormSubmit = async ({ currentTarget }: FormEvent<HTMLFormElement>) => {
    await submit(currentTarget);
  };

  return (
    <>
      <DocumentTitle title="Todos" />

      <Template todos={todos} users={users} author={author} onSubmit={handleFormSubmit} />
    </>
  );
};
