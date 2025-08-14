import { Applications, Chat, CheckboxChecked, Document, Employee, MessageBubble } from '@moneyforward/mfui-icons-react';
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

  const navigationItems: ComponentProps<typeof Template>['navigationItems'] = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <Applications />,
    },
    {
      href: '/chat',
      label: 'Chat',
      icon: <MessageBubble />,
    },
    {
      href: '/users',
      label: 'Users',
      icon: <Employee />,
    },
    {
      href: '/posts',
      label: 'Posts',
      icon: <Document />,
    },
    {
      href: '/comments',
      label: 'Comments',
      icon: <Chat />,
    },
    {
      href: '/todos',
      label: 'Todos',
      icon: <CheckboxChecked />,
    },
  ];

  return (
    <Template profile={profile} navigationItems={navigationItems}>
      {children}
    </Template>
  );
};

export default Layout;
