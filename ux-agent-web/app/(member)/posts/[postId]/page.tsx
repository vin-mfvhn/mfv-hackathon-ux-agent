import { type NextPage } from 'next';
import { getAllComments } from '../../../_api/comment';
import { getPostById } from '../../../_api/post';
import { getUserById } from '../../../_api/user';
import { Template } from './_template';

type Props = {
  params: Promise<{ postId: string }>;
};

/**
 * Post page component.
 */
const Page: NextPage<Props> = async ({ params }) => {
  const { postId } = await params;

  const [post, comments] = await Promise.all([getPostById(Number(postId)), getAllComments({ postId: Number(postId) })]);

  const author = await getUserById(post.userId);

  return <Template post={post} comments={comments} author={author} />;
};

export default Page;

/**
 * Sets the title of the page.
 */
export async function generateMetadata({ params }: Props) {
  const { postId } = await params;

  const post = await getPostById(Number(postId));

  return {
    title: post.title,
  };
}
