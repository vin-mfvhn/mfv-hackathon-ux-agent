'use client';

import {
  DropdownMenu,
  GlobalHeader,
  MainNavigation,
  Tooltip,
  Typography,
  type MainNavigationRef, HStack,
} from '@moneyforward/mfui-components'
import { MoreVertical } from '@moneyforward/mfui-icons-react';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, type ComponentProps, type FC, type ReactNode } from 'react';
import { type User } from '../../_api/user';
import { clearProfileAtom, saveProfileAtom } from '../../_atoms/profileAtoms';
import { clearAccessTokenAtom } from '../../_atoms/sessionAtoms';
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
            base: (
              <HStack gap="icon-and-text.horizontal" alignItems="center">
                <svg width="133" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="m32.747 2.111 1.807 12.613H32.19l-.967-7.615h-.031l-2.733 7.787h-.82L25.002 7.11h-.032l-1.072 7.626h-2.364l2.028-12.613h1.66l2.974 8.1 2.848-8.1h1.703v-.01Zm10.919 8.628c0 2.477-1.66 4.254-4.13 4.254-2.47 0-4.13-1.777-4.13-4.254 0-2.5 1.681-4.266 4.13-4.266 2.448 0 4.13 1.767 4.13 4.266Zm-2.27 0c0-1.11-.704-2.251-1.86-2.251-1.156 0-1.86 1.141-1.86 2.25 0 1.078.704 2.23 1.86 2.23 1.156 0 1.86-1.152 1.86-2.23Zm8.029-4.266c-.799 0-1.587.28-2.05.991h-.03v-.732h-2.24v8.003h2.24V10.77c0-.959.02-2.477 1.344-2.477 1.261 0 1.22 1.238 1.22 2.197v4.233h2.238v-4.88c0-1.863-.61-3.37-2.722-3.37Zm11.697 4.352v.28h-5.17c0 1.012.378 2.154 1.555 2.154.735 0 1.198-.452 1.503-1.088l2.06.345c-.547 1.594-1.924 2.499-3.574 2.499-2.428 0-3.92-1.756-3.92-4.19 0-2.424 1.261-4.33 3.805-4.33 2.585-.022 3.74 1.917 3.74 4.33ZM59.01 9.683c-.116-.818-.62-1.616-1.493-1.616-.893 0-1.398.787-1.503 1.616h2.995Zm6.872 1.594-1.87-4.545h-2.543l3.342 6.786-2.596 5.493h2.459l5.717-12.268H67.89l-2.008 4.534Zm22.27-.538c0 2.477-1.66 4.254-4.13 4.254-2.47 0-4.13-1.777-4.13-4.254 0-2.5 1.68-4.266 4.13-4.266 2.448 0 4.13 1.767 4.13 4.266Zm-2.27 0c0-1.11-.705-2.251-1.86-2.251-1.157 0-1.86 1.141-1.86 2.25 0 1.078.703 2.23 1.86 2.23 1.155 0 1.86-1.152 1.86-2.23Zm5.832-3.178h-.031v-.83h-2.25v8.004h2.24v-3.598c0-1.238.157-2.639 1.712-2.639.337 0 .652.097.925.291l.273-2.122a2.454 2.454 0 0 0-.924-.194c-.83 0-1.503.388-1.945 1.088Zm23.047-.83h2.207v8.004h-2.207v-.733h-.031c-.484.636-1.314.991-2.134.991-2.301 0-3.615-2.133-3.615-4.297 0-2.122 1.324-4.223 3.584-4.223.819 0 1.65.356 2.196 1.013v-.754Zm.231 3.997c0-1.077-.725-2.23-1.87-2.23-1.156 0-1.86 1.153-1.86 2.23s.704 2.251 1.86 2.251c1.145-.01 1.87-1.185 1.87-2.251Zm6.106-3.167h-.031v-.83h-2.239v8.004h2.239v-3.598c0-1.238.157-2.639 1.713-2.639.336 0 .662.097.924.291l.274-2.122a2.457 2.457 0 0 0-.925-.194c-.83 0-1.503.388-1.955 1.088Zm11.277-5.116v12.29h-2.239v-.754h-.031c-.463.657-1.293 1.012-2.113 1.012-2.301 0-3.615-2.133-3.615-4.297 0-2.122 1.324-4.223 3.584-4.223.819 0 1.65.356 2.144.991h.031V2.445h2.239Zm-2.018 8.283c0-1.077-.704-2.23-1.86-2.23-1.156 0-1.86 1.153-1.86 2.23s.704 2.251 1.86 2.251c1.156 0 1.86-1.185 1.86-2.251Zm-57.013 4.007h2.354V9.317h3.405V7.238h-3.405V4.535h3.636v-2.09h-5.99v12.29Zm38.863-9.996c-.01 0 .179-2.24.179-2.24-.462 0-.914.064-1.356.172-1.881.474-3.342 1.831-4.351 3.468-.746 1.207-1.292 2.52-1.87 3.803-.074.161-.147.333-.221.495-.052.108-.115.248-.2.399l-1.776-4.373h-1.24l-1.818 4.491-1.734-4.222h-2.448l3.615 8.164h1.156l1.87-4.868 1.682 4.868h1.135l.031-.064c.326-.679 2.207-4.977 2.953-6.463.326-.646.768-1.41 1.23-1.971.82-1.002 1.965-1.702 3.163-1.659ZM12.8 11.02a1.291 1.291 0 0 1-1.114-.571l-1.45-2.111-1.124 3.339a1.326 1.326 0 0 1-1.02.883 1.31 1.31 0 0 1-1.25-.485l-.988-1.281-.704 2.348c-.18.57-.694.937-1.251.937-.126 0-.263-.022-.389-.065-.694-.215-1.072-.97-.862-1.67l1.461-4.76a1.322 1.322 0 0 1 1.009-.905c.473-.086.967.097 1.261.485l1.04 1.346 1.178-3.5a1.3 1.3 0 0 1 1.05-.884c.484-.064.967.14 1.251.55l1.787 2.595 2.406-3.996C13.525 1.357 11.171.13 8.523.13 3.815.13 0 4.007 0 8.8c0 4.794 3.815 8.682 8.523 8.682s8.523-3.888 8.523-8.681a8.745 8.745 0 0 0-.483-2.887l-2.69 4.47c-.232.377-.631.625-1.073.636ZM17.634 0c-.935 0-1.691.776-1.691 1.723 0 .948.756 1.724 1.691 1.724.936 0 1.692-.776 1.692-1.724C19.326.776 18.57 0 17.634 0Z" fill="#0054AC"/>
                </svg>
                <Typography variant="pageHeading1" style={{ color: 'var(--color-primary-content-none)', fontWeight: 'bold' }}>
                  UX Agent
                </Typography>
              </HStack>
            ),
          }}
          rightPaneSlot={{
            base: (
              <>
                <AccountMenu profile={profile} mode="base" />
              </>
            ),
            narrowViewport: (
              <>
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
