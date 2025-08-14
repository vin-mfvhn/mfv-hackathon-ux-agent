import { type NextConfig } from 'next';

export default {
  // eslint-disable-next-line @typescript-eslint/require-await
  redirects: async () => [
    {
      source: '/',
      destination: '/dashboard',
      permanent: true,
    },
  ],
  reactStrictMode: true,
} satisfies NextConfig;
