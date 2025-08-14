import { type Metadata, type NextPage } from 'next';
import { getAllComments } from '../../_api/comment';
import { getAllPosts } from '../../_api/post';
import { getAllTodos } from '../../_api/todo';
import { getAllUsers } from '../../_api/user';
import { Template } from './_template';

/**
 * The Dashboard page.
 */
const Page: NextPage = async () => {
  const [posts, comments, users, todos] = await Promise.all([
    getAllPosts(),
    getAllComments(),
    getAllUsers(),
    getAllTodos(),
  ]);

  const items = [
    {
      label: 'Users',
      figure: users.length,
      href: '/users',
      themeColor: '#52c41a',
    },
    {
      label: 'Posts',
      figure: posts.length,
      href: '/posts',
      themeColor: '#ff4d4f',
    },
    {
      label: 'Comments',
      figure: comments.length,
      href: '/comments',
      themeColor: '#faad14',
    },
    {
      label: 'Todos',
      figure: todos.length,
      href: '/todos',
      themeColor: '#00000073',
    },
  ];

  return <Template items={items} />;
};

export default Page;

/**
 * Sets the title of the page.
 */
export const metadata: Metadata = {
  title: 'Dashboard',
};
