import { type Meta, type StoryObj } from '@storybook/react';
import { Template } from '.';

export default {
  component: Template,
} satisfies Meta<typeof Template>;

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  args: {
    user: {
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
    },
  },
};
