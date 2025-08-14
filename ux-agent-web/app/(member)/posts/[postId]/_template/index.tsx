'use client';

import { Button, Dialog, TextLink, Typography } from '@moneyforward/mfui-components';
import { Employee } from '@moneyforward/mfui-icons-react';
import { useAtomValue } from 'jotai';
import { redirect, useRouter } from 'next/navigation';
import { Suspense, useActionState, useEffect, useState, type FC } from 'react';
import { type Comment } from '../../../../_api/comment';
import { type Post } from '../../../../_api/post';
import { type User } from '../../../../_api/user';
import { profileAtom } from '../../../../_atoms/profileAtoms';
import { Card } from '../../../../_components/Card';
import { requestDeletePost } from './action';
import styles from './styles.module.css';

type Props = {
  /**
   * The post to display.
   */
  post: Post;
  /**
   * The comments that belong to the post.
   */
  comments: Comment[];
  /**
   * The author of the post.
   */
  author: User;
};

/**
 * A template component that displays a post and its comments.
 */
export const Template: FC<Props> = ({ post, comments, author }) => {
  const profile = useAtomValue(profileAtom);

  if (!profile) {
    throw new Error('Profile not found');
  }

  return (
    <div className={styles.base}>
      <article>
        <Card>
          <Card.Header>
            <div className={styles.articleMeta}>
              <Typography as="h1" variant="pageHeading1">
                {post.title}
              </Typography>

              <Typography as="p">
                by <TextLink href={`/users/${author.id.toString()}`}>{author.name}</TextLink>
              </Typography>

              {post.userId === profile.id ? (
                <div className={styles.authorControls}>
                  <EditForm postId={post.id} />
                  <Suspense fallback={null}>
                    <DeleteForm postId={post.id} />
                  </Suspense>
                </div>
              ) : null}
            </div>
          </Card.Header>
          <Card.Body>
            <Typography as="p">{post.body}</Typography>
          </Card.Body>
        </Card>
      </article>

      <section>
        <Card>
          <Card.Header>
            <Typography as="h2" variant="sectionHeading2">
              Comments
            </Typography>
          </Card.Header>
          <Card.Body>
            <ul className={styles.comments}>
              {comments.map((comment) => (
                <li key={comment.id} className={styles.comment}>
                  <div className={styles.avatar}>
                    <Employee />
                  </div>
                  <div>
                    <Typography as="div" variant="strongCondensedBody">
                      {comment.email}
                    </Typography>
                    <Typography as="p" variant="condensedBody">
                      {comment.body}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

type EditFormProps = {
  postId: Post['id'];
};

const EditForm: FC<EditFormProps> = ({ postId }) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/posts/${postId.toString()}/edit`);
  };

  return (
    <form action={handleSubmit}>
      <Button priority="primary" type="submit" size="small">
        Edit
      </Button>
    </form>
  );
};

type DeleteFormProps = {
  postId: Post['id'];
};

const DeleteForm: FC<DeleteFormProps> = ({ postId }) => {
  const [open, setOpen] = useState(false);

  const [state, formAction, loading] = useActionState(requestDeletePost, {
    status: 'idle',
    postId,
  });

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    formAction(postId);
  };

  useEffect(() => {
    if (state.status === 'success') {
      setOpen(false);
      redirect(`/posts`);
    }
  }, [state.status]);

  return (
    <>
      <Button destructive priority="secondary" size="small" onClick={handleDeleteClick}>
        Delete
      </Button>

      <Dialog
        open={open}
        title="Delete This Post?"
        actionSlot={
          <form action={handleSubmit} className={styles.deleteForm}>
            <Button disabled={loading} onClick={handleClose}>
              Cancel
            </Button>
            <Button destructive type="submit" loading={loading}>
              Delete
            </Button>
          </form>
        }
        onClose={handleClose}
      >
        <p>Are you sure you want to delete this post?</p>
      </Dialog>
    </>
  );
};
