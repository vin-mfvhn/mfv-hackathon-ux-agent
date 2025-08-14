import { type NextPage } from 'next';
import { getPostById } from '../../../../_api/post';
import { Template } from './_template';

type Props = {
  params: Promise<{ postId: string }>;
};

/**
 * Post page component.
 */
const Page: NextPage<Props> = async ({ params }) => {
  const { postId } = await params;

  const post = await getPostById(Number(postId));

  return <Template post={post} />;
};

export default Page;

/**
 * Sets the title of the page.
 */
export async function generateMetadata({ params }: Props) {
  const { postId } = await params;

  const post = await getPostById(Number(postId));

  return {
    title: `Edit Post - ${post.title}`,
  };
}
