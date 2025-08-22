import { Home, Notification } from '@moneyforward/mfui-icons-react';
import { type Meta, type StoryObj } from '@storybook/react';
import { MainNavigation } from '.';

export default {
  component: MainNavigation,
} as Meta<typeof MainNavigation>;

type Story = StoryObj<typeof MainNavigation>;

export const Default: Story = {
  args: {
    navigationItems: [
      {
        to: '/',
        icon: <Home />,
        label: 'Home',
      },
      {
        to: '/notifications',
        icon: <Notification />,
        label: 'Notifications',
      },
      {
        to: '/settings',
        label: 'Settings',
      },
    ],
  },
};
