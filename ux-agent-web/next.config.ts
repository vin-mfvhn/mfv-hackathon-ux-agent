import { type NextConfig } from 'next';

export default {
  // eslint-disable-next-line @typescript-eslint/require-await
  redirects: async () => [
    {
      source: '/',
      destination: '/chat',
      permanent: true,
    },
  ],
  reactStrictMode: true,
} satisfies NextConfig;
