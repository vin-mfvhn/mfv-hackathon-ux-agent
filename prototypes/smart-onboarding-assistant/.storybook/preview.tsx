import { type Preview } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';
import { ProfileProvider } from '../src/states/profileState';
import '../src/styles/app.css';

export default {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    withRouter,
    (Story) => (
      <ProfileProvider>
        <Story />
      </ProfileProvider>
    ),
  ],
} satisfies Preview;
