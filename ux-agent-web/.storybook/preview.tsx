import { type Preview } from '@storybook/react';
import { StrictMode } from 'react';
import '../app/_styles/app.css';

export default {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      // https://storybook.js.org/docs/get-started/nextjs#set-nextjsappdirectory-to-true
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <StrictMode>
        <Story />
      </StrictMode>
    ),
  ],
} satisfies Preview;
