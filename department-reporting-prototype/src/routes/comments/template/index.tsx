import { DataGrid, Dialog, IconButton, Typography } from '@moneyforward/mfui-components';
import { Document, Comment as IconComment } from '@moneyforward/mfui-icons-react';
import { useState, type FC } from 'react';
import { generatePath } from 'react-router';
import { type Comment } from '../../../api/comment';
import { TextLink } from '../../../components/TextLink';
import { Paths } from '../../../routes';
import styles from './styles.module.css';

type Props = {
  comments: Comment[];
};

/**
 * Comments page template.
 */
export const Template: FC<Props> = ({ comments }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const handleDetailClick = (comment: Comment) => {
    setSelectedComment(comment);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <DataGrid fixedHeader layout="edge-to-edge">
        <DataGrid.Header>
          <DataGrid.HeaderRow>
            <DataGrid.HeaderCell>ID</DataGrid.HeaderCell>
            <DataGrid.HeaderCell>Email</DataGrid.HeaderCell>
            <DataGrid.HeaderCell>Name</DataGrid.HeaderCell>
            <DataGrid.HeaderCell />
          </DataGrid.HeaderRow>
        </DataGrid.Header>

        <DataGrid.Body>
          {comments.map((comment) => (
            <DataGrid.Row key={comment.id}>
              <DataGrid.Cell>{comment.id}</DataGrid.Cell>
              <DataGrid.Cell>{comment.email}</DataGrid.Cell>
              <DataGrid.Cell>{comment.name}</DataGrid.Cell>
              <DataGrid.Cell>
                <IconButton
                  outlined
                  onClick={() => {
                    handleDetailClick(comment);
                  }}
                >
                  <IconComment />
                </IconButton>
              </DataGrid.Cell>
            </DataGrid.Row>
          ))}
        </DataGrid.Body>
      </DataGrid>

      {selectedComment ? (
        <Dialog open={openDialog} title={selectedComment.name} onClose={handleDialogClose}>
          <div className={styles.dialogBody}>
            <Typography as="div" variant="strongCondensedBody">
              {selectedComment.email}
            </Typography>
            <Typography as="p">{selectedComment.body}</Typography>

            <hr />

            <div className={styles.dialogFooter}>
              <Document />
              <TextLink to={generatePath(Paths.Posts.Detail, { postId: selectedComment.postId.toString() })}>
                View Post
              </TextLink>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  );
};
