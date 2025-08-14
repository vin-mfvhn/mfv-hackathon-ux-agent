'use server';

import { updatePost, type Post } from '../../../../../_api/post';

/**
 * State type definition for the post update process.
 */
export type State = {
  /**
   * The current status of the update process.
   */
  status: 'idle' | 'success' | 'error';
  /**
   * The post being updated.
   */
  post: Post;
  /**
   * Any validation errors encountered during the update process.
   */
  errors?: {
    /**
     * Error related to the post title.
     */
    title?: string;
    /**
     * Error related to the post body.
     */
    body?: string;
  };
};

/**
 * Updates a post with the provided form data.
 *
 * @param state - The current state of the post update process.
 *
 * @param formData - The form data containing the updated post information.
 *
 * @returns The updated state after attempting to update the post.
 */
export async function requestUpdatePost(state: State, formData: FormData): Promise<State> {
  const newPost = Object.fromEntries(formData.entries());

  const errors: State['errors'] = {};

  if (!newPost.title) {
    errors.title = 'Title is required';
  }

  if (!newPost.body) {
    errors.body = 'Content is required';
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      post: {
        ...state.post,
        title: newPost.title as string,
        body: newPost.body as string,
      },
      errors,
    };
  }

  const response = await updatePost(state.post.id, newPost as Parameters<typeof updatePost>[1]);

  console.info({ response });

  return {
    status: 'success',
    post: {
      ...state.post,
      title: response.title,
      body: response.body,
    },
  };
}
