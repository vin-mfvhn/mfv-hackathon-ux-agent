import { type components, type operations } from '../_types/jsonPlaceholderOpenapi';
import { client } from './common';

/**
 * User type definition
 */
export type User = components['schemas']['User'];

/**
 * Get users data from the server.
 *
 * @example
 *
 * ```typescript
 * const users = await getAllUsers(),
 * ```
 */
export async function getAllUsers() {
  const { data } = await client.GET('/users');

  if (!data) {
    throw new Error('Server error or no data');
  }

  return data;
}

/**
 * Get user data from the server by User ID.
 *
 * @param id - User ID to get user data.
 *
 * @example
 *
 * ```typescript
 * const user = await getUserById(1),
 * ```
 */
export async function getUserById(id: operations['getUserById']['parameters']['path']['id']) {
  const { data } = await client.GET(`/users/{id}`, {
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
