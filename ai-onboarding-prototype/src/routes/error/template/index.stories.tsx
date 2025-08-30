import { type Meta, type StoryObj } from '@storybook/react';
import { Template } from '.';

export default {
  component: Template,
} satisfies Meta<typeof Template>;

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  args: {
    error: {
      status: 404,
      statusText: 'Not Found',
      internal: false,
      data: 'Not Found',
    },
  },
};
