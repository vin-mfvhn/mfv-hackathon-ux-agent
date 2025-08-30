import { type FC } from 'react';
import { useLoaderData, type Params } from 'react-router';
import { getAllComments } from '../../../api/comment';
import { getPostById } from '../../../api/post';
import { getUserById } from '../../../api/user';
import { DocumentTitle } from '../../../components/DocumentTitle';
import { useProfile } from '../../../states/profileState';
import { Template } from './template';

/**
 * Post page loader.
 */
export async function loader({ params: { postId } }: { params: Params<'postId'> }) {
  if (!postId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const [post, comments] = await Promise.all([getPostById(Number(postId)), getAllComments({ postId: Number(postId) })]);

  const author = await getUserById(post.userId);

  return {
    post,
    comments,
    author,
  };
}

/**
 * Post page component.
 */
export const Component: FC = () => {
  const { post, comments, author } = useLoaderData<typeof loader>();

  const profile = useProfile();

  if (!profile) {
    throw new Error('Profile not found');
  }

  return (
    <>
      <DocumentTitle title={post.title} />

      <Template post={post} comments={comments} author={author} profile={profile} />
    </>
  );
};
