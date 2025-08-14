import { client } from './common';

/**
 * Logs in a user by their ID and retrieves user data from the server.
 *
 * @param id - User ID.
 *
 * @example
 *
 * ```typescript
 * const user = await login(1),
 * ```
 */
export async function login(id: number) {
  const { data } = await client.GET('/users/{id}', {
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
