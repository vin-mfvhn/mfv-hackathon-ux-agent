import { Button, SectionMessage, SelectBox, Typography } from '@moneyforward/mfui-components';
import { type FC } from 'react';
import { Form, useLocation } from 'react-router';
import { type User } from '../../../api/user';
import { Card } from '../../../components/Card';
import styles from './styles.module.css';

type Props = {
  users: User[];
  loading?: boolean;
  error?: {
    message: string;
  };
};

/**
 * Login page template.
 */
export const Template: FC<Props> = ({ users, loading = false, error }) => {
  const location = useLocation();

  const data = [
    {
      label: '',
      value: '100',
    },
    ...users.map((user) => ({
      label: user.name,
      value: user.id.toString(),
    })),
  ];

  return (
    <div className={styles.base}>
      <Form method="post" action={`${location.pathname}${location.search}`}>
        <Card>
          <Card.Header>
            <Typography as="h1" variant="sectionHeading1">
              Welcome to the front-end boilerplate!
            </Typography>
          </Card.Header>

          <Card.Body>
            <div className={styles.formBody}>
              {error ? <SectionMessage messageType="error">{error.message}</SectionMessage> : null}

              <Typography as="p">Login to access the app.</Typography>

              <label>
                <Typography variant="controlLabel" className={styles.formLabel}>
                  Select User
                </Typography>
                <SelectBox name="userId" defaultValue={data[0].value} options={data} disabled={loading} />
              </label>

              <Button loading={loading} type="submit" priority="primary">
                Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};
