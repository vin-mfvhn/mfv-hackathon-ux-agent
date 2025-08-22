import { Button, DataGrid, SelectBox, Typography } from '@moneyforward/mfui-components';
import { useEffect, useState, type FC, type FormEvent } from 'react';
import { Form, generatePath } from 'react-router';
import { type Post } from '../../../api/post';
import { type User } from '../../../api/user';
import { TextLink } from '../../../components/TextLink';
import { Paths } from '../../../routes';
import styles from './styles.module.css';

type Props = {
  posts: Post[];
  users: User[];
  author: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

/**
 * Posts page template.
 */
export const Template: FC<Props> = ({ posts, users, author, onSubmit }) => {
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
              <DataGrid.HeaderCell>Content</DataGrid.HeaderCell>
              <DataGrid.HeaderCell>Author</DataGrid.HeaderCell>
            </DataGrid.HeaderRow>
          </DataGrid.Header>

          <DataGrid.Body>
            {posts.map((post) => (
              <DataGrid.Row key={post.id}>
                <DataGrid.Cell>{post.id}</DataGrid.Cell>
                <DataGrid.Cell>
                  <TextLink to={generatePath(Paths.Posts.Detail, { postId: post.id.toString() })}>
                    <Typography variant="strongBody">{post.title}</Typography>
                  </TextLink>
                </DataGrid.Cell>
                <DataGrid.Cell>{post.body}</DataGrid.Cell>
                <DataGrid.Cell>
                  <TextLink to={generatePath(Paths.Users.Detail, { userId: post.userId.toString() })}>
                    <Typography>{users.find((user) => user.id === post.userId)?.name}</Typography>
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
