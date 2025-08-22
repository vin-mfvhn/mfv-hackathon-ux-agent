import { type Meta, type StoryObj } from '@storybook/react';
import { Template } from '.';
import { type User } from '../../../../api/user';

export default {
  component: Template,
} satisfies Meta<typeof Template>;

type Story = StoryObj<typeof Template>;

const userData: User = {
  id: 1,
  name: 'John Lennon',
  username: 'johnlennon',
  email: 'john@example.com',
  address: {
    street: '251 Menlove Avenue',
    suite: 'Apt. 1',
    city: 'Liverpool',
    zipcode: 'L25 7SA',
    geo: {
      lat: '53.3794',
      lng: '-2.8973',
    },
  },
  phone: '123-456-7890',
  website: 'johnlennon.com',
  company: {
    name: 'The Beatles',
    catchPhrase: 'Imagine all the people',
    bs: 'Music and Peace',
  },
};

export const Default: Story = {
  args: {
    post: {
      id: 1,
      userId: 1,
      title: 'The Story Behind "Imagine"',
      body: 'John Lennon wrote "Imagine" in 1971. It is one of the most famous songs of all time, promoting peace and unity.',
    },
    comments: [
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
    ],
    author: userData,
    profile: userData,
  },
};
