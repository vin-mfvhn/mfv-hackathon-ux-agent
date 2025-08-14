import { TextLink, Typography } from '@moneyforward/mfui-components';
import { type FC } from 'react';
import { type User } from '../../../../_api/user';
import styles from './styles.module.css';

type Props = {
  user: User;
};

/**
 * User page template.
 */
export const Template: FC<Props> = ({ user }) => (
  <dl className={styles.base}>
    <div className={styles.row}>
      <Typography as="dt" variant="contentHeading" className={styles.head}>
        Name
      </Typography>
      <Typography as="dd">{user.name}</Typography>
    </div>

    <div className={styles.row}>
      <Typography as="dt" variant="contentHeading" className={styles.head}>
        Username
      </Typography>
      <Typography as="dd">{user.username}</Typography>
    </div>

    <div className={styles.row}>
      <Typography as="dt" variant="contentHeading" className={styles.head}>
        Phone
      </Typography>
      <Typography as="dd">{user.phone}</Typography>
    </div>

    <div className={styles.row}>
      <Typography as="dt" variant="contentHeading" className={styles.head}>
        Address
      </Typography>
      <Typography as="dd">{`${user.address.suite}, ${user.address.street} Street, ${user.address.city}, ${user.address.zipcode}`}</Typography>
    </div>

    <div className={styles.row}>
      <Typography as="dt" variant="contentHeading" className={styles.head}>
        Website
      </Typography>
      <Typography as="dd">
        <TextLink href={user.website} target="__blank">
          {user.website}
        </TextLink>
      </Typography>
    </div>

    <div className={styles.row}>
      <Typography as="dt" variant="contentHeading" className={styles.head}>
        Company
      </Typography>
      <Typography as="dd">{user.company.name}</Typography>
    </div>

    <div className={styles.row}>
      <Typography as="dt" variant="contentHeading" className={styles.head}>
        Company catchphrase
      </Typography>
      <Typography as="dd">{user.company.catchPhrase}</Typography>
    </div>
  </dl>
);
