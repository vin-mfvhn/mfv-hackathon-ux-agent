import { Button, DataGrid, SelectBox, Tag, Typography } from '@moneyforward/mfui-components';
import { type FC, type FormEvent, useEffect, useState } from 'react';
import { Form, generatePath } from 'react-router';
import { type Todo } from '../../../api/todo';
import { type User } from '../../../api/user';
import { TextLink } from '../../../components/TextLink';
import { Paths } from '../../../routes';
import styles from './styles.module.css';

type Props = {
  todos: Todo[];
  users: User[];
  author: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

/**
 * Todos page template.
 */
export const Template: FC<Props> = ({ todos, users, author, onSubmit }) => {
  const [selectedAuthor, setSelectedAuthor] = useState<User['id'] | null>(null);

  const handleAuthorChange = (value = '') => {
    setSelectedAuthor(Number(value));
  };

  const handleReset = () => {
    setSelectedAuthor(null);
  };

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    onSubmit(event);
  };

  useEffect(() => {
    setSelectedAuthor(author ? Number(author) : null);
  }, [author]);

  return (
    <div className={styles.base}>
      <Form className={styles.form} onSubmit={handleFormChange}>
        <label className={styles.formGroup}>
          <Typography variant="controlLabel" className={styles.labelDisplay}>
            Author
          </Typography>
          <div className={styles.formItem}>
            <SelectBox
              name="author"
              value={selectedAuthor?.toString() ?? ''}
              options={[
                { label: '', value: '' },
                ...users.map((user) => ({ label: user.name, value: user.id.toString() })),
              ]}
              onChange={handleAuthorChange}
            />
          </div>
        </label>

        <Button type="submit" priority="primary">
          Filter
        </Button>

        <Button type="submit" onClick={handleReset}>
          Reset
        </Button>
      </Form>

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
                  <TextLink to={generatePath(Paths.Users.Detail, { userId: todo.userId.toString() })}>
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
