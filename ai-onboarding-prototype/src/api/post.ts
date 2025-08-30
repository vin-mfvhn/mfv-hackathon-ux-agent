import { type components, type operations } from '../types/jsonPlaceholderOpenapi';
import { client } from './common';

/**
 * Post type definition
 */
export type Post = components['schemas']['Post'];

/**
 * Get posts data from the server.
 * It can be filtered by User ID.
 *
 * @param query - Query parameters to filter posts.
 *
 * @example
 *
 * ```typescript
 * const posts = await getAllPosts({ userId: 1 }),
 * ```
 */
export async function getAllPosts(query?: operations['getAllPosts']['parameters']['query']) {
  const { data } = await client.GET('/posts', {
    params: {
      query,
    },
  });

  if (!data) {
    throw new Error('Server error or no data');
  }

  return data;
}

/**
 * Get post data from the server by User ID.
 *
 * @param id - Post ID to get post data.
 *
 * @example
 *
 * ```typescript
 * const post = await getPostById(1);
 * ```
 */
export async function getPostById(id: operations['getPostById']['parameters']['path']['id']) {
  const { data } = await client.GET('/posts/{id}', {
    params: {
      path: {
        id,
      },
    },
  });

  if (!data) {
    throw new Error('Server error or no data');
  }

  return data;
}

/**
 * Create a post.
 *
 * @param body - Request body.
 *
 * @example
 *
 * ```typescript
 * const post = await createPost({
 *   title: 'Hello world!',
 *   body: 'This is a new post.',
 * }),
 * ```
 */
export async function createPost(body: operations['createPost']['requestBody']['content']['application/json']) {
  const { data } = await client.POST('/posts', {
    body,
  });

  if (!data) {
    throw new Error('Sorry, server error is occurred');
  }

  return data;
}

/**
 * Update a post.
 *
 * @param id - Post ID to update post data.
 *
 * @param body - Request body.
 *
 * @example
 *
 * ```typescript
 * const post = await updatePost(1, {
 *  title: 'Hello world!',
 *  body: 'This is a new post.',
 * });
 * ```
 */
export async function updatePost(
  id: number,
  body: operations['updatePost']['requestBody']['content']['application/json'],
) {
  const { data } = await client.PUT('/posts/{id}', {
    params: {
      path: {
        id,
      },
    },
    body,
  });

  if (!data) {
    throw new Error('Sorry, server error is occurred');
  }

  return data;
}

/**
 * Destroy a post.
 *
 * @param id - Post ID to destroy post data.
 *
 * @example
 *
 * ```typescript
 * await deletePost(1);
 * ```
 */
export async function deletePost(id: operations['deletePost']['parameters']['path']['id']) {
  await client.DELETE('/posts/{id}', {
    params: {
      path: {
        id,
      },
    },
  });
}
