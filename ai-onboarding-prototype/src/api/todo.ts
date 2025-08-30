import { type components, type operations } from '../types/jsonPlaceholderOpenapi';
import { client } from './common';

/**
 * Todo type definition
 */
export type Todo = components['schemas']['Todo'];

/**
 * Get todos data from the server.
 * It can be filtered by User ID.
 *
 * @param query - Query parameters to filter todos.
 *
 * @example
 *
 * ```typescript
 * const todos = await getAllTodos({ query: { userId: 1 } }),
 * ```
 */
export async function getAllTodos(query?: operations['getAllTodos']['parameters']['query']) {
  const { data } = await client.GET('/todos', {
    params: {
      query,
    },
  });

  if (!data) {
    throw new Error('Server error or no data');
  }

  return data;
}
