'use client';

import { Button, HelpMessage, MultilineTextBox, TextBox, Typography } from '@moneyforward/mfui-components';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useState, type ChangeEvent, type FC } from 'react';
import { type Post } from '../../../../../_api/post';
import { Card } from '../../../../../_components/Card';
import { count } from '../../../../../_utils/string';
import { requestUpdatePost } from './action';
import styles from './styles.module.css';

type Props = {
  post: Post;
};

/**
 * Edit post page template.
 */
export const Template: FC<Props> = ({ post }) => {
  const [textCount, setTextCount] = useState(count(post.body));

  const [state, formAction, loading] = useActionState(requestUpdatePost, {
    status: 'idle',
    post,
  });

  const handleBodyChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    setTextCount(count(value));
  };

  const handleCancel = () => {
    redirect(`/posts/${post.id.toString()}`);
  };

  useEffect(() => {
    if (state.status === 'success') {
      redirect(`/posts/${post.id.toString()}`);
    }
  }, [post.id, state.status]);

  return (
    <form className={styles.form} action={formAction}>
      <Card>
        <Card.Header>
          <label className={styles.label}>
            <Typography variant="strongControlLabel">Post Title</Typography>
            <TextBox
              name="title"
              textBoxSize="large"
              placeholder="Post Title"
              defaultValue={state.post.title}
              invalid={!!state.errors?.title}
              readOnly={loading}
            />
            {state.errors?.title ? <HelpMessage messageType="error">{state.errors.title}</HelpMessage> : null}
          </label>
        </Card.Header>

        <Card.Body>
          <label className={styles.label}>
            <Typography variant="strongControlLabel">Post Content</Typography>
            <MultilineTextBox
              name="body"
              className={styles.postBody}
              placeholder="Type your post here..."
              defaultValue={state.post.body}
              invalid={!!state.errors?.body}
              readOnly={loading}
              onChange={handleBodyChange}
            />
            {state.errors?.body ? <HelpMessage messageType="error">{state.errors.body}</HelpMessage> : null}
          </label>

          <div className={styles.count}>
            <HelpMessage>{textCount}</HelpMessage>
          </div>
        </Card.Body>
      </Card>

      <div className={styles.controls}>
        <Button type="button" size="large" disabled={loading} onClick={handleCancel}>
          Cancel
        </Button>
        <Button priority="primary" type="submit" size="large" name="intent" value="update" loading={loading}>
          Update Post
        </Button>
      </div>
    </form>
  );
};
