import { Button, Dialog, Typography } from '@moneyforward/mfui-components';
import { Employee } from '@moneyforward/mfui-icons-react';
import { useState, type FC } from 'react';
import { Form, generatePath } from 'react-router';
import { type Comment } from '../../../../api/comment';
import { type Post } from '../../../../api/post';
import { type User } from '../../../../api/user';
import { Card } from '../../../../components/Card';
import { TextLink } from '../../../../components/TextLink';
import { Paths } from '../../../../routes';
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

  /**
   * The profile of the current user.
   */
  profile: User;
};

/**
 * A template component that displays a post and its comments.
 */
export const Template: FC<Props> = ({ post, comments, author, profile }) => (
  <div className={styles.base}>
    <article>
      <Card>
        <Card.Header>
          <div className={styles.articleMeta}>
            <Typography as="h1" variant="pageHeading1">
              {post.title}
            </Typography>

            <Typography as="p">
              by{' '}
              <TextLink to={generatePath(Paths.Users.Detail, { userId: author.id.toString() })}>{author.name}</TextLink>
            </Typography>

            {post.userId === profile.id ? (
              <div className={styles.authorControls}>
                <EditForm postId={post.id.toString()} />
                <DeleteForm postId={post.id.toString()} />
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

type EditFormProps = {
  postId: string;
};

const EditForm: FC<EditFormProps> = ({ postId }) => (
  <Form action={generatePath(Paths.Posts.Edit, { postId })}>
    <Button priority="primary" type="submit" size="small">
      Edit
    </Button>
  </Form>
);

type DeleteFormProps = {
  postId: string;
};

const DeleteForm: FC<DeleteFormProps> = ({ postId }) => {
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button destructive priority="secondary" size="small" onClick={handleDeleteClick}>
        Delete
      </Button>

      <Dialog
        open={open}
        title="Delete This Post?"
        actionSlot={
          <Form method="post" action={generatePath(Paths.Posts.Destroy, { postId })} className={styles.deleteForm}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button destructive type="submit">
              Delete
            </Button>
          </Form>
        }
        onClose={handleClose}
      >
        <p>Are you sure you want to delete this post?</p>
      </Dialog>
    </>
  );
};
