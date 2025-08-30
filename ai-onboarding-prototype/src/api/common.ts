import createClient from 'openapi-fetch';
import { type paths } from '../types/jsonPlaceholderOpenapi';

/**
 * API client.
 *
 * This client is used to make requests to the API.
 *
 * @remarks
 * It is created using the `openapi-fetch` library and is configured with the base URL of the API.
 * The `paths` type is imported from the OpenAPI specification and is used to define the types of the API endpoints.
 * The `createClient` function is used to create the client with the specified base URL.
 *
 * @see {@link https://openapi-ts.dev/openapi-fetch/api | API | openapi-fetch}
 */
export const client = createClient<paths>({
  baseUrl: 'https://jsonplaceholder.typicode.com',
});
