import { type Meta, type StoryObj } from '@storybook/react';
import { Template } from '.';

export default {
  component: Template,
} satisfies Meta<typeof Template>;

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  args: {
    post: {
      id: 1,
      userId: 1,
      title: 'The Story Behind "Imagine"',
      body: 'John Lennon wrote "Imagine" in 1971. It is one of the most famous songs of all time, promoting peace and unity.',
    },
  },
};
