import { useEffect, type FC } from 'react';
import { useActionData, useLoaderData, useNavigation, useRouteError } from 'react-router';
import { login } from '../../api/auth';
import { getAllUsers } from '../../api/user';
import { DocumentTitle } from '../../components/DocumentTitle';
import { useSaveAccessToken } from '../../states/sessionState';
import { Template } from './template';

/**
 * Login page loader.
 */
export async function loader() {
  const users = await getAllUsers();

  return {
    users,
  };
}

/**
 * Login page action.
 */
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const userId = formData.get('userId');

  const response = await login(Number(userId));

  return {
    user: response,
  };
}

/**
 * Login page component.
 */
export const Component: FC = () => {
  const { users } = useLoaderData<typeof loader>();

  const actionData = useActionData<typeof action>();

  const saveAccessToken = useSaveAccessToken();

  const { state } = useNavigation();

  const loading = state === 'loading' || state === 'submitting';

  useEffect(() => {
    if (actionData?.user.id) {
      saveAccessToken(actionData.user.id.toString());
    }
  }, [actionData?.user, saveAccessToken]);

  return (
    <>
      <DocumentTitle title="Login" />

      <Template users={users} loading={loading} />
    </>
  );
};

/**
 * Login page error boundary.
 */
export const ErrorBoundary: FC = () => {
  const { users } = useLoaderData<typeof loader>();

  const routeError = useRouteError();

  const error = routeError
    ? {
        message: 'Selected user is not found...',
      }
    : undefined;

  return <Template users={users} error={error} />;
};
