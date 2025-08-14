import { type Meta, type StoryObj } from '@storybook/react';
import { Template } from '.';
import { useSaveProfile } from '../../../states/profileState';

export default {
  component: Template,
  decorators: [
    (Story) => {
      const saveProfile = useSaveProfile();

      saveProfile({
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: '',
          },
        },
        phone: '',
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      });

      return <Story />;
    },
  ],
} satisfies Meta<typeof Template>;

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  args: {
    loading: false,
    navigationItems: [
      {
        to: '/',
        label: 'Home',
        icon: <span>🏠</span>,
      },
      {
        to: '/posts',
        label: 'Posts',
        icon: <span>✉️</span>,
      },
      {
        to: '/comments',
        label: 'Comments',
        icon: <span>💬</span>,
      },
      {
        to: '/otherwise',
        label: 'Otherwise',
      },
    ],
  },
};
