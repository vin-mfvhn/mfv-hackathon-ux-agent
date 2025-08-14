import { Chat } from '@moneyforward/mfui-icons-react';
import { type NextPage } from 'next';
import { type ComponentProps, type ReactNode } from 'react';
import { getUserById } from '../_api/user';
import { Template } from './_template';

type Props = {
  children: ReactNode;
};

/**
 * Member's layout component.
 */
const Layout: NextPage<Props> = async ({ children }: Props) => {
  // Set the dummy access token to get the user profile.
  const accessToken = 1;

  const profile = await getUserById(accessToken);
  
  // Override the profile name to "Fantastic Four"
  const updatedProfile = { ...profile, name: 'Fantastic Four' };

  const navigationItems: ComponentProps<typeof Template>['navigationItems'] = [
        {
      href: '/dashboard',
      label: 'Chat',
      icon: <Chat />,
    },
  ];

  return (
    <Template profile={updatedProfile} navigationItems={navigationItems}>
      {children}
    </Template>
  );
};

export default Layout;
