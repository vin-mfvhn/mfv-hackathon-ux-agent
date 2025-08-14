import { type FC } from 'react';
import { isRouteErrorResponse } from 'react-router';
import styles from './styles.module.css';

type Props = {
  error: unknown;
};

/**
 * Error page template.
 */
export const Template: FC<Props> = ({ error }) => (
  <main className={styles.base}>
    <h1>Oops!</h1>

    <p>Sorry, an unexpected error has occurred.</p>

    {isRouteErrorResponse(error) ? (
      <ul>
        <li>Status: {error.status}</li>
        <li>Status Text: {error.statusText}</li>
        <li>Data: {JSON.stringify(error.data)}</li>
      </ul>
    ) : (
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    )}
  </main>
);
