import { type Meta, type StoryObj } from '@storybook/react';
import { Template } from '.';

export default {
  component: Template,
} as Meta<typeof Template>;

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  args: {
    users: [
      {
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
      {
        id: 2,
        name: 'Paul McCartney',
        username: 'paulmccartney',
        email: 'paul@example.com',
        address: {
          street: '20 Forthlin Road',
          suite: 'Apt. 2',
          city: 'Liverpool',
          zipcode: 'L18 9TN',
          geo: {
            lat: '53.3656',
            lng: '-2.9187',
          },
        },
        phone: '234-567-8901',
        website: 'paulmccartney.com',
        company: {
          name: 'The Beatles',
          catchPhrase: 'Live and Let Die',
          bs: 'Music and Love',
        },
      },
      {
        id: 3,
        name: 'George Harrison',
        username: 'georgeharrison',
        email: 'george@example.com',
        address: {
          street: '12 Arnold Grove',
          suite: 'Apt. 3',
          city: 'Liverpool',
          zipcode: 'L15 8HP',
          geo: {
            lat: '53.3890',
            lng: '-2.9130',
          },
        },
        phone: '345-678-9012',
        website: 'georgeharrison.com',
        company: {
          name: 'The Beatles',
          catchPhrase: 'Here Comes the Sun',
          bs: 'Music and Spirituality',
        },
      },
      {
        id: 4,
        name: 'Ringo Starr',
        username: 'ringostarr',
        email: 'ringo@example.com',
        address: {
          street: '10 Admiral Grove',
          suite: 'Apt. 4',
          city: 'Liverpool',
          zipcode: 'L8 8EH',
          geo: {
            lat: '53.3986',
            lng: '-2.9783',
          },
        },
        phone: '456-789-0123',
        website: 'ringostarr.com',
        company: {
          name: 'The Beatles',
          catchPhrase: 'Peace and Love',
          bs: 'Music and Drums',
        },
      },
    ],
  },
};
