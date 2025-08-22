import { type Meta, type StoryObj } from '@storybook/react';
import { TextLink } from '.';

export default {
  component: TextLink,
} satisfies Meta<typeof TextLink>;

type Story = StoryObj<typeof TextLink>;

export const Default: Story = {
  args: {
    children: 'Click me!',
    to: '/example',
  },
};
