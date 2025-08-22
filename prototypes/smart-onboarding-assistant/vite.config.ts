import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig(({ mode }): UserConfig => {
  console.info({ mode });

  return {
    root: new URL('.', import.meta.url).pathname,
    build: {
      sourcemap: true,
    },
    server: {
      port: 3001,
      host: true,
      open: true,
    },
    plugins: [react()],
    css: {
      devSourcemap: true,
    },
  };
});
