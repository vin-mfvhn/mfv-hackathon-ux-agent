import { type FC, type FormEvent } from 'react';
import { useLoaderData, useSubmit, type LoaderFunctionArgs } from 'react-router';
import { getAllPosts } from '../../api/post';
import { getAllUsers } from '../../api/user';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Template } from './template';

/**
 * Posts page loader.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const author = url.searchParams.get('author');

  const [posts, users] = await Promise.all([
    getAllPosts(author ? { userId: Number(author) } : undefined),
    getAllUsers(),
  ]);

  return {
    posts,
    users,
    author,
  };
}

/**
 * Posts page component.
 */
export const Component: FC = () => {
  const { posts, users, author } = useLoaderData<typeof loader>();

  const submit = useSubmit();

  const handleFormSubmit = async ({ currentTarget }: FormEvent<HTMLFormElement>) => {
    await submit(currentTarget);
  };

  return (
    <>
      <DocumentTitle title="Posts" />

      <Template posts={posts} users={users} author={author} onSubmit={handleFormSubmit} />
    </>
  );
};
