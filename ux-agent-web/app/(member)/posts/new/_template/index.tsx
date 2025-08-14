'use client';

import { Button, HelpMessage, MultilineTextBox, TextBox, Typography } from '@moneyforward/mfui-components';
import { useAtomValue } from 'jotai';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useState, type ChangeEvent, type FC } from 'react';
import { profileAtom } from '../../../../_atoms/profileAtoms';
import { Card } from '../../../../_components/Card';
import { count } from '../../../../_utils/string';
import { requestCreatePost } from './action';
import styles from './styles.module.css';

/**
 * New post page template.
 */
export const Template: FC = () => {
  const [textCount, setTextCount] = useState(0);

  const profile = useAtomValue(profileAtom);

  const [state, formAction, loading] = useActionState(requestCreatePost, {
    status: 'idle',
    post: {
      userId: -1,
      id: -1,
      title: '',
      body: '',
    },
  });

  if (!profile) {
    throw new Error('Profile not found');
  }

  const handleBodyChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    setTextCount(count(value));
  };

  const handleSubmit = (formData: FormData) => {
    formAction({ userId: profile.id, formData });
  };

  useEffect(() => {
    if (state.status === 'success') {
      // redirect(`/posts/${state.post.id.toString()}`);
      redirect(`/posts/100`);
    }
  }, [state.post.id, state.status]);

  return (
    <form className={styles.form} action={handleSubmit}>
      <Card>
        <Card.Header>
          <label className={styles.label}>
            <Typography variant="strongControlLabel">Post Title</Typography>
            <TextBox
              name="title"
              textBoxSize="large"
              placeholder="Post Title"
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
        <Button priority="primary" type="submit" size="large" name="intent" value="create" loading={loading}>
          Post
        </Button>
      </div>
    </form>
  );
};
