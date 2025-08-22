import { type components, type operations } from '../types/jsonPlaceholderOpenapi';
import { client } from './common';

/**
 * Comment type definition.
 */
export type Comment = components['schemas']['Comment'];

/**
 * Get comments data from the server.
 * It can be filtered by Post ID.
 *
 * @param query - Query parameters to filter comments.
 *
 * @example
 *
 * ```typescript
 * const comments = await getAllComments({ postId: 1 });,
 * ```
 */
export async function getAllComments(query?: operations['getAllComments']['parameters']['query']) {
  const { data } = await client.GET('/comments', {
    params: {
      query,
    },
  });

  if (!data) {
    throw new Error('Server error or no data');
  }

  return data;
}
