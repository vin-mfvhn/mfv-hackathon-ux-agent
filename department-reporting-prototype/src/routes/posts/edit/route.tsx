import { type FC } from 'react';
import { data, generatePath, type Params, redirect, useLoaderData, useNavigate } from 'react-router';
import { getPostById, updatePost } from '../../../api/post';
import { DocumentTitle } from '../../../components/DocumentTitle';
import { Paths } from '../../../routes';
import { type CreateErrorSchema } from './schema';
import { Template } from './template';

/**
 * Fetches post data and returns it as a prop.
 */
export async function loader({ params: { postId } }: { params: Params<'postId'> }) {
  if (!postId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const post = await getPostById(Number(postId));

  return {
    post,
  };
}

/**
 * Edit post page action.
 *
 * @remarks
 *
 * After updating the post, the user is redirected to the post detail page.
 */
export async function action({ request, params: { postId } }: { request: Request; params: Params<'postId'> }) {
  if (!postId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const formData = await request.formData();

  // When handling multiple types of actions, each Form should have `intent` data
  // and the processing should be branched according to the value.
  console.info('intent', formData.get('intent'));

  const newPost = Object.fromEntries(formData);

  const errors: CreateErrorSchema = {};

  if (!newPost.title) {
    errors.title = 'Title is required';
  }

  if (!newPost.body) {
    errors.body = 'Content is required';
  }

  if (Object.keys(errors).length > 0) {
    return data(
      {
        errors,
      },
      {
        status: 400,
      },
    );
  }

  const response = await updatePost(Number(postId), newPost as Parameters<typeof updatePost>[1]);

  console.info({ response });

  return redirect(generatePath(Paths.Posts.Detail, { postId }));
}

/**
 * Edit post page component.
 */
export const Component: FC = () => {
  const { post } = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  const handleCancel = async () => {
    await navigate(-1);
  };

  return (
    <>
      <DocumentTitle title="Edit Post" />

      <Template post={post} onCancel={handleCancel} />
    </>
  );
};
