'use client';

import { DataGrid, TextLink, Typography } from '@moneyforward/mfui-components';
import Link from 'next/link';
import { type FC } from 'react';
import { type User } from '../../../_api/user';

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
            <TextLink href={`/users/${user.id.toString()}`} customLinkComponent={Link}>
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
