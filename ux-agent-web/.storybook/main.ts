import { type StorybookConfig } from '@storybook/nextjs';

export default {
  framework: '@storybook/nextjs',
  addons: ['@storybook/addon-docs', '@storybook/addon-links'],
  stories: ['../app/**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: {
    reactDocgenTypescriptOptions: {
      include: ['../**/*.tsx'],
    },
  },
} satisfies StorybookConfig;
