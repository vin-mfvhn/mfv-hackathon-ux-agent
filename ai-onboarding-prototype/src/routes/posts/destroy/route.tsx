import { type Params, redirect } from 'react-router';
import { deletePost } from '../../../api/post';
import { Paths } from '../../../routes';

/**
 * Delete a post.
 */
export async function action({ params: { postId } }: { params: Params<'postId'> }) {
  if (!postId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  await deletePost(Number(postId));

  return redirect(Paths.Posts.Index);
}
