import { Applications, Chat, CheckboxChecked, Document, Employee } from '@moneyforward/mfui-icons-react';
import { type FC } from 'react';
import { useLoaderData, useNavigation } from 'react-router';
import { getUserById } from '../../api/user';
import { Paths } from '../../routes';

import { useSaveProfile } from '../../states/profileState';
import { getCookie } from '../../utils/cookie';
import { Template } from './template';

/**
 * Loader function.
 */
export async function loader() {
  const accessToken = getCookie('accessToken');

  if (!accessToken) {
    throw new Response('Unauthorized', {
      status: 400,
    });
  }

  const profile = await getUserById(Number(accessToken));

  return {
    profile,
  };
}

/**
 * Desktop layout component.
 */
export const Component: FC = () => {
  const { profile } = useLoaderData<typeof loader>();

  const saveProfile = useSaveProfile();

  const navigation = useNavigation();

  const loading = navigation.state === 'loading' || navigation.state === 'submitting';

  const navigationItems = [
    {
      to: Paths.Dashboard,
      icon: <Applications />,
      label: 'Dashboard',
    },
    {
      to: Paths.Executive.Index,
      icon: <Document />,
      label: 'Executive Dashboard',
    },
    {
      to: Paths.MyDepartment.Index,
      icon: <Employee />,
      label: 'My Department',
    },
    {
      to: Paths.Allocation.Index,
      icon: <CheckboxChecked />,
      label: 'Allocation Config',
    },
    {
      to: Paths.Reports.Index,
      icon: <Chat />,
      label: 'Reports',
    },
  ];

  saveProfile(profile);

  return <Template loading={loading} navigationItems={navigationItems} />;
};
