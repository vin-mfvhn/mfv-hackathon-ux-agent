'use client';

import {
  DropdownMenu,
  GlobalHeader,
  MainNavigation,
  Tooltip,
  Typography,
  type MainNavigationRef,
} from '@moneyforward/mfui-components';
import { Add, MoreVertical } from '@moneyforward/mfui-icons-react';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, type ComponentProps, type FC, type ReactNode } from 'react';
import { type User } from '../../_api/user';
import { clearProfileAtom, saveProfileAtom } from '../../_atoms/profileAtoms';
import { clearAccessTokenAtom } from '../../_atoms/sessionAtoms';
import Logo from './logo.png';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  profile: User;
  navigationItems: ComponentProps<typeof MainNavigation>['navigationItems'];
  loading?: boolean;
};

/**
 * Layout template component for Member.
 */
export const Template: FC<Props> = ({ children, profile, navigationItems: navigationItemsRaw, loading }) => {
  const mainNavigationRef = useRef<MainNavigationRef>(null);

  const saveProfile = useSetAtom(saveProfileAtom);

  const pathname = usePathname();

  const navigationItems = navigationItemsRaw.map((item) => ({
    ...item,
    isCurrent: item.href && pathname.includes(item.href),
  })) as typeof navigationItemsRaw;

  saveProfile(profile);

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <GlobalHeader
          mainNavigationButtonProps={{
            onClick: () => {
              mainNavigationRef.current?.openMainNavigation();
            },
            'aria-label': 'Menu',
          }}
          logoSlot={{
            base: <Image src={Logo} alt="Logo" width={180} height={24} />,
          }}
          rightPaneSlot={{
            base: (
              <>
                <AddPost />
                <AccountMenu profile={profile} mode="base" />
              </>
            ),
            narrowViewport: (
              <>
                <AddPost />
                <AccountMenu profile={profile} mode="narrowViewport" />
              </>
            ),
          }}
        />
      </div>

      <div className={styles.sidebar}>
        <MainNavigation ref={mainNavigationRef} navigationItems={navigationItems} customLinkComponent={Link} />
      </div>

      <div className={styles.detail}>
        {children}
        {loading ? (
          <div className={styles.loading}>
            <p>Loading...</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const AddPost: FC = () => (
  <Link href="/posts/new" className={styles.linkButton}>
    <Add />
    <Typography variant="condensedControlLabel">Add Post</Typography>
  </Link>
);

type AccountMenuProps = {
  profile: User;
  mode: 'base' | 'narrowViewport';
};

const AccountMenu: FC<AccountMenuProps> = ({ profile, mode }) => {
  const clearAccessToken = useSetAtom(clearAccessTokenAtom);

  const clearProfile = useSetAtom(clearProfileAtom);

  const handleLogoutClick = () => {
    clearProfile();
    clearAccessToken();
  };

  return mode === 'base' ? (
    <Tooltip content="Account" placement="bottom">
      <DropdownMenu label={profile.name} triggerProps={{ priority: 'tertiary', size: 'small' }}>
        <DropdownMenu.Item>
          <Typography>{profile.name}</Typography>
        </DropdownMenu.Item>
        <DropdownMenu.Divider />
        <DropdownMenu.Item onClick={handleLogoutClick}>Logout</DropdownMenu.Item>
      </DropdownMenu>
    </Tooltip>
  ) : (
    <DropdownMenu label="Account" icon={<MoreVertical />}>
      <DropdownMenu.Item>
        <Typography>{profile.name}</Typography>
      </DropdownMenu.Item>
      <DropdownMenu.Divider />
      <DropdownMenu.Item onClick={handleLogoutClick}>Logout</DropdownMenu.Item>
    </DropdownMenu>
  );
};
