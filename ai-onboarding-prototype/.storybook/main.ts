import { type StorybookConfig } from '@storybook/react-vite';

export default {
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },
  addons: ['@storybook/addon-docs', '@storybook/addon-links', 'storybook-addon-remix-react-router'],
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: {
    reactDocgenTypescriptOptions: {
      include: ['../**/*.tsx'],
    },
  },
} satisfies StorybookConfig;
