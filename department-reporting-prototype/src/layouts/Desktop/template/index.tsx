import { DropdownMenu, GlobalHeader, ProgressIndicator, Tooltip, Typography } from '@moneyforward/mfui-components';
import { Add } from '@moneyforward/mfui-icons-react';
import { type FC, type ReactNode } from 'react';
import { Link, Outlet } from 'react-router';
import { Paths } from '../../../routes';
import { useProfile } from '../../../states/profileState';
import { useClearAccessToken } from '../../../states/sessionState';
import Logo from './logo.png';
import { MainNavigation } from './MainNavigation';
import styles from './styles.module.css';

type Props = {
  loading: boolean;
  navigationItems: {
    to: string;
    label: string;
    icon?: ReactNode;
  }[];
};

/**
 * Layout template component for desktop.
 */
export const Template: FC<Props> = ({ loading, navigationItems }) => (
  <div className={styles.base}>
    <div className={styles.header}>
      <GlobalHeader
        logoSlot={{
          base: <img src={Logo} alt="Logo" width={180} height={24} />,
        }}
        rightPaneSlot={{
          base: <RightPane />,
        }}
      />
    </div>

    <div className={styles.sidebar}>
      <MainNavigation navigationItems={navigationItems} />
    </div>

    <div className={styles.detail}>
      <Outlet />
      {loading ? (
        <div className={styles.loading}>
          <ProgressIndicator />
        </div>
      ) : null}
    </div>
  </div>
);

const RightPane: FC = () => {
  const profile = useProfile();

  return (
    <>
      <Link to={Paths.Reports.Index} className={styles.linkButton}>
        <Add />
        <Typography variant="condensedControlLabel">New Report</Typography>
      </Link>

      {profile ? <AccountMenu profile={profile} /> : null}
    </>
  );
};

type AccountMenuProps = {
  profile: NonNullable<ReturnType<typeof useProfile>>;
};

const AccountMenu: FC<AccountMenuProps> = ({ profile }) => {
  const clearAccessToken = useClearAccessToken();

  const handleLogoutClick = () => {
    clearAccessToken();
  };

  return (
    <Tooltip content="Account" placement="bottom">
      <DropdownMenu label={profile.name} triggerProps={{ priority: 'tertiary', size: 'small' }}>
        <DropdownMenu.Item>
          <Typography>{profile.name}</Typography>
        </DropdownMenu.Item>
        <DropdownMenu.Divider />
        <DropdownMenu.Item onClick={handleLogoutClick}>Logout</DropdownMenu.Item>
      </DropdownMenu>
    </Tooltip>
  );
};
