import { type Meta, type StoryObj } from '@storybook/react';
import { Template } from '.';

export default {
  component: Template,
} satisfies Meta<typeof Template>;

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  args: {
    comments: [
      {
        postId: 1,
        id: 1,
        email: 'john@example.com',
        name: 'John Lennon',
        body: 'Imagine all the people living life in peace.',
      },
      {
        postId: 1,
        id: 2,
        email: 'paul@example.com',
        name: 'Paul McCartney',
        body: 'And in the end, the love you take is equal to the love you make.',
      },
      {
        postId: 1,
        id: 3,
        email: 'george@example.com',
        name: 'George Harrison',
        body: "Here comes the sun, and I say it's all right.",
      },
      {
        postId: 1,
        id: 4,
        email: 'ringo@example.com',
        name: 'Ringo Starr',
        body: 'Peace and love, peace and love.',
      },
      {
        postId: 1,
        id: 5,
        email: 'beatles@example.com',
        name: 'The Beatles',
        body: 'We all live in a yellow submarine.',
      },
    ],
  },
};
