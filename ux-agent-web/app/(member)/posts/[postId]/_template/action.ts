'use server';

import { deletePost, type Post } from '../../../../_api/post';

/**
 * State type definition for the post destroy process.
 */
export type State = {
  /**
   * The current status of the update process.
   */
  status: 'idle' | 'success' | 'error';
  /**
   * The post being destroyed.
   */
  postId: Post['id'];
  /**
   * Any validation errors encountered during the destroy process.
   */
  errors?: {
    message: string;
  };
};

/**
 * Destroy a post with the provided post ID.
 *
 * @param _state - The current state of the post destroy process.
 *
 * @param postId - The ID of the post to destroy.
 */
export async function requestDeletePost(_state: State, postId: Post['id']): Promise<State> {
  try {
    await deletePost(postId);
  } catch {
    return {
      status: 'error',
      postId,
      errors: {
        message: 'Failed to destroy post.',
      },
    };
  }

  return {
    status: 'success',
    postId,
  };
}
