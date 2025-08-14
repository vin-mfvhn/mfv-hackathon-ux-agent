import { DataGrid, Typography } from '@moneyforward/mfui-components';
import { type FC } from 'react';
import { generatePath } from 'react-router';
import { type User } from '../../../api/user';
import { TextLink } from '../../../components/TextLink';
import { Paths } from '../../../routes';

type Props = {
  users: User[];
};

/**
 * Users page template.
 */
export const Template: FC<Props> = ({ users }) => (
  <DataGrid fixedHeader layout="edge-to-edge">
    <DataGrid.Header>
      <DataGrid.HeaderRow>
        <DataGrid.HeaderCell>ID</DataGrid.HeaderCell>
        <DataGrid.HeaderCell>Name</DataGrid.HeaderCell>
        <DataGrid.HeaderCell>Email</DataGrid.HeaderCell>
        <DataGrid.HeaderCell>Phone</DataGrid.HeaderCell>
      </DataGrid.HeaderRow>
    </DataGrid.Header>

    <DataGrid.Body>
      {users.map((user) => (
        <DataGrid.Row key={user.id}>
          <DataGrid.Cell>{user.id}</DataGrid.Cell>
          <DataGrid.Cell>
            <TextLink to={generatePath(Paths.Users.Detail, { userId: user.id.toString() })}>
              <Typography>{user.name}</Typography>
            </TextLink>
          </DataGrid.Cell>
          <DataGrid.Cell>{user.email}</DataGrid.Cell>
          <DataGrid.Cell>{user.phone}</DataGrid.Cell>
        </DataGrid.Row>
      ))}
    </DataGrid.Body>
  </DataGrid>
);
