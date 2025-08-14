import { type Metadata, type NextPage } from 'next';
import { getAllTodos } from '../../_api/todo';
import { getAllUsers } from '../../_api/user';
import { Template } from './_template';

type Props = {
  searchParams: Promise<{
    author?: string;
  }>;
};

/**
 * Todos page component.
 */
const Page: NextPage<Props> = async ({ searchParams: searchParamsPromise }) => {
  const { author } = await searchParamsPromise;

  const [todos, users] = await Promise.all([
    getAllTodos(author ? { userId: Number(author) } : undefined),
    getAllUsers(),
  ]);

  return <Template todos={todos} users={users} />;
};

export default Page;

/**
 * Sets the title of the page.
 */
export const metadata: Metadata = {
  title: 'Todos',
};
