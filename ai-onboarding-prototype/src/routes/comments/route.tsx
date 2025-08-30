import { type FC } from 'react';
import { useLoaderData } from 'react-router';
import { getAllComments } from '../../api/comment';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Template } from './template';

/**
 * Loader function.
 */
export async function loader() {
  const comments = await getAllComments();

  return {
    comments,
  };
}

/**
 * Comments route component.
 */
export const Component: FC = () => {
  const { comments } = useLoaderData<typeof loader>();

  return (
    <>
      <DocumentTitle title="Comments" />

      <Template comments={comments} />
    </>
  );
};
