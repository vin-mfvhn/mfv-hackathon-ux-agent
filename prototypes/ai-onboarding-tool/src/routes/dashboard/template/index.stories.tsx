import { type Meta, type StoryObj } from '@storybook/react';
import { Template } from '.';

export default {
  component: Template,
} satisfies Meta<typeof Template>;

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Users',
        figure: 10,
        to: '/users',
        themeColor: '##52c41a',
      },
      {
        label: 'Posts',
        figure: 20,
        to: '/posts',
        themeColor: '#ff4d4f',
      },
      {
        label: 'Albums',
        figure: 30,
        to: '/albums',
        themeColor: '#faad14',
      },
    ],
  },
};
