import { type FC } from 'react';
import { data, generatePath, redirect } from 'react-router';
import { createPost } from '../../../api/post';
import { DocumentTitle } from '../../../components/DocumentTitle';
import { Paths } from '../../../routes';
import { type CreateErrorSchema } from './schema';
import { Template } from './template';

/**
 * New post page action.
 *
 * @remarks
 *
 * After creating the post, the user is redirected to the post detail page.
 */
export async function action({ request }: { request: Request }) {
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

  const response = await createPost(newPost as Parameters<typeof createPost>[0]);

  console.info({ response });

  return redirect(generatePath(Paths.Posts.Detail, { postId: '100' }));
}

/**
 * New post page component.
 */
export const Component: FC = () => (
  <>
    <DocumentTitle title="New Post" />

    <Template />
  </>
);
