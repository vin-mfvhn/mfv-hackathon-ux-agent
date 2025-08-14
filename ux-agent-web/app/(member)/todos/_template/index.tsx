'use client';

import { Button, DataGrid, SelectBox, Tag, TextLink, Typography } from '@moneyforward/mfui-components';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, type FC } from 'react';
import { type Todo } from '../../../_api/todo';
import { type User } from '../../../_api/user';
import styles from './styles.module.css';

type Props = {
  todos: Todo[];
  users: User[];
};

/**
 * Todos page template.
 */
export const Template: FC<Props> = ({ todos, users }) => {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const router = useRouter();

  const [selectedAuthor, setSelectedAuthor] = useState(() => searchParams.get('author') ?? '');

  const handleChange = (value = '') => {
    setSelectedAuthor(value);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('author');

    router.replace(pathname);

    setSelectedAuthor('');
  };

  const handleSubmit = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);

    if (formData.get('author')) {
      params.set('author', formData.get('author') as string);
    } else {
      params.delete('author');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.base}>
      <form className={styles.form} action={handleSubmit}>
        <label className={styles.formGroup}>
          <Typography variant="controlLabel" className={styles.labelDisplay}>
            Author
          </Typography>
          <div className={styles.formItem}>
            <SelectBox
              name="author"
              value={selectedAuthor}
              options={[
                { label: '', value: '' },
                ...users.map((user) => ({ label: user.name, value: user.id.toString() })),
              ]}
              onChange={handleChange}
            />
          </div>
        </label>

        <Button type="submit" priority="primary">
          Filter
        </Button>

        <Button type="button" onClick={handleReset}>
          Reset
        </Button>
      </form>

      <div className={styles.dataGrid}>
        <DataGrid fixedHeader layout="edge-to-edge">
          <DataGrid.Header>
            <DataGrid.HeaderRow>
              <DataGrid.HeaderCell>ID</DataGrid.HeaderCell>
              <DataGrid.HeaderCell>Title</DataGrid.HeaderCell>
              <DataGrid.HeaderCell>Status</DataGrid.HeaderCell>
              <DataGrid.HeaderCell>Author</DataGrid.HeaderCell>
            </DataGrid.HeaderRow>
          </DataGrid.Header>

          <DataGrid.Body>
            {todos.map((todo) => (
              <DataGrid.Row key={todo.id}>
                <DataGrid.Cell>{todo.id}</DataGrid.Cell>
                <DataGrid.Cell>{todo.title}</DataGrid.Cell>
                <DataGrid.Cell>
                  <Tag label={todo.completed ? 'DONE' : 'PENDING'} />
                </DataGrid.Cell>
                <DataGrid.Cell>
                  <TextLink href={`/users/${todo.userId.toString()}`} customLinkComponent={Link}>
                    <Typography>{users.find((user) => user.id === todo.userId)?.name}</Typography>
                  </TextLink>
                </DataGrid.Cell>
              </DataGrid.Row>
            ))}
          </DataGrid.Body>
        </DataGrid>
      </div>
    </div>
  );
};
