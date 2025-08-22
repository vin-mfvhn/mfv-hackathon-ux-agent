import { type FC } from 'react';
import { useRouteError } from 'react-router';
import { Template } from './template';

/**
 * An error page.
 */
export const Error: FC = () => {
  const error = useRouteError();

  console.error(error);

  return <Template error={error as Error} />;
};
