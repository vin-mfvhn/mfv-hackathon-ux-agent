import { clsx } from 'clsx';
import { type ComponentProps, type FC } from 'react';
import { Link } from 'react-router';
import styles from './styles.module.css';

type Props = ComponentProps<typeof Link>;

/**
 * A text link is a clickable text element that navigates to another page or section of the current page.
 */
export const TextLink: FC<Props> = ({ children, className, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link className={clsx(styles.base, className)} {...rest}>
    {children}
  </Link>
);
