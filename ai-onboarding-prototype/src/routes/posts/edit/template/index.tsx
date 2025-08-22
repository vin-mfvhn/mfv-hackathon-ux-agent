import { Button, HelpMessage, MultilineTextBox, TextBox, Typography } from '@moneyforward/mfui-components';
import { useState, type ChangeEvent, type FC } from 'react';
import { useFetcher } from 'react-router';
import { type Post } from '../../../../api/post';
import { Card } from '../../../../components/Card';
import { count } from '../../../../utils/string';
import { type CreateErrorSchema } from '../schema';
import styles from './styles.module.css';

type Props = {
  post: Post;
  onCancel: () => void;
};

/**
 * Edit post page template.
 */
export const Template: FC<Props> = ({ post, onCancel }) => {
  const { Form, data, state } = useFetcher<{ errors?: CreateErrorSchema }>();

  const [textCount, setTextCount] = useState(count(post.body));

  const loading = state === 'loading' || state === 'submitting';

  const handleBodyChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    setTextCount(count(value));
  };

  return (
    <Form method="post" className={styles.form}>
      <Card>
        <Card.Header>
          <label className={styles.label}>
            <Typography variant="strongControlLabel">Post Title</Typography>
            <TextBox
              name="title"
              textBoxSize="large"
              placeholder="Post Title"
              defaultValue={post.title}
              invalid={!!data?.errors?.title}
              readOnly={loading}
            />
            {data?.errors?.title ? <HelpMessage messageType="error">{data.errors.title}</HelpMessage> : null}
          </label>
        </Card.Header>

        <Card.Body>
          <label className={styles.label}>
            <Typography variant="strongControlLabel">Post Content</Typography>
            <MultilineTextBox
              name="body"
              className={styles.postBody}
              placeholder="Type your post here..."
              defaultValue={post.body}
              invalid={!!data?.errors?.body}
              readOnly={loading}
              onChange={handleBodyChange}
            />
            {data?.errors?.body ? <HelpMessage messageType="error">{data.errors.body}</HelpMessage> : null}
          </label>

          <div className={styles.count}>
            <HelpMessage>{textCount}</HelpMessage>
          </div>
        </Card.Body>
      </Card>

      <div className={styles.controls}>
        <Button type="button" size="large" disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
        <Button priority="primary" type="submit" size="large" name="intent" value="update" loading={loading}>
          Update Post
        </Button>
      </div>
    </Form>
  );
};
