import { clsx } from 'clsx';
import { type FC, type ReactNode } from 'react';
import { NavLink } from 'react-router';
import styles from './styles.module.css';

type NavigationItem = {
  /**
   * The label of the navigation item.
   */
  label: string;
  /**
   * The icon of the navigation item.
   */
  icon?: ReactNode;
  /**
   * The URL of the navigation item.
   */
  to: string;
};

type Props = {
  /**
   * The navigation items to display.
   */
  navigationItems: NavigationItem[];
};

/**
 * Main navigation component for the desktop layout.
 */
export const MainNavigation: FC<Props> = ({ navigationItems }) => (
  <div className={styles.base}>
    <nav className={styles.navigation}>
      {navigationItems.length > 0 ? (
        <ul>
          {navigationItems.map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => clsx(styles.link, isActive ? styles.linkActive : '')}>
                <div className={styles.linkIcon}>{icon}</div>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  </div>
);
