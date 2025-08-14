import { type Metadata, type NextPage } from 'next';
import { getAllPosts } from '../../_api/post';
import { getAllUsers } from '../../_api/user';
import { Template } from './_template';

type Props = {
  searchParams: Promise<{
    author?: string;
  }>;
};

/**
 * Posts page component.
 */
const Page: NextPage<Props> = async ({ searchParams: searchParamsPromise }) => {
  const { author } = await searchParamsPromise;

  const [posts, users] = await Promise.all([
    getAllPosts(author ? { userId: Number(author) } : undefined),
    getAllUsers(),
  ]);

  return <Template posts={posts} users={users} />;
};

export default Page;

/**
 * Sets the title of the page.
 */
export const metadata: Metadata = {
  title: 'Posts',
};
