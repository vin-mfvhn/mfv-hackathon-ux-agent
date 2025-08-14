import { type ReactNode } from 'react';
import './_styles/app.css';

type Props = {
  children: ReactNode;
};

/**
 * Layout for the app.
 */
export default ({ children }: Props) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>{children}</body>
  </html>
);
