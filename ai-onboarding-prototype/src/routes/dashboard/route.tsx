import { type FC } from 'react';
import { useLoaderData } from 'react-router';
import { getAllComments } from '../../api/comment';
import { getAllPosts } from '../../api/post';
import { getAllTodos } from '../../api/todo';
import { getAllUsers } from '../../api/user';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Paths } from '../../routes';
import { Template } from './template';

/**
 * Loader function.
 */
export async function loader() {
  const [posts, comments, users, todos] = await Promise.all([
    getAllPosts(),
    getAllComments(),
    getAllUsers(),
    getAllTodos(),
  ]);

  return {
    posts: posts.length,
    comments: comments.length,
    users: users.length,
    todos: todos.length,
  };
}

/**
 * The Dashboard page.
 */
export const Component: FC = () => {
  const figures = useLoaderData<typeof loader>();

  const items = [
    {
      label: 'Users',
      figure: figures.users,
      to: Paths.Users.Index,
      themeColor: '#52c41a',
    },
    {
      label: 'Posts',
      figure: figures.posts,
      to: Paths.Posts.Index,
      themeColor: '#ff4d4f',
    },
    {
      label: 'Comments',
      figure: figures.comments,
      to: Paths.Comments,
      themeColor: '#faad14',
    },
    {
      label: 'Todos',
      figure: figures.todos,
      to: Paths.Todos,
      themeColor: '#00000073',
    },
  ];

  return (
    <>
      <DocumentTitle title="Dashboard" />

      <Template items={items} />
    </>
  );
};
