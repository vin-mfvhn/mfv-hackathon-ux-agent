import { type FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { Paths } from './routes';
import { Error } from './routes/error/route';
import { ProfileProvider } from './states/profileState';
import { SessionProvider, useAccessToken } from './states/sessionState';

/**
 * Renders the app.
 */
export const App = () => (
  <SessionProvider>
    <Router />
  </SessionProvider>
);

const Router: FC = () => {
  const accessToken = useAccessToken();

  return accessToken ? (
    <ProfileProvider>
      <Member />
    </ProfileProvider>
  ) : (
    <Guest />
  );
};

/**
 * Member-only routes.
 */
const Member = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={Paths.Home} lazy={() => import('./layouts/Desktop/route')} errorElement={<Error />}>
        <Route index lazy={() => import('./routes/dashboard/route')} />
        <Route path={Paths.Onboarding.Generator} lazy={() => import('./routes/onboarding/generator/route')} />
        <Route path={Paths.Onboarding.HRDashboard} lazy={() => import('./routes/onboarding/hr-dashboard/route')} />
        <Route path={Paths.Onboarding.EmployeeDashboard} lazy={() => import('./routes/onboarding/employee-dashboard/route')} />
        <Route path={Paths.Onboarding.KeyPeople} lazy={() => import('./routes/onboarding/key-people/route')} />
        <Route path={Paths.Onboarding.Documents} lazy={() => import('./routes/onboarding/documents/route')} />
        <Route path={Paths.Users.Index} lazy={() => import('./routes/users/route')} />
        <Route path={Paths.Users.Detail} lazy={() => import('./routes/users/user/route')} />
        <Route path={Paths.Posts.Index} lazy={() => import('./routes/posts/route')} />
        <Route path={Paths.Posts.Detail} lazy={() => import('./routes/posts/post/route')} />
        <Route path={Paths.Posts.New} lazy={() => import('./routes/posts/new/route')} />
        <Route path={Paths.Posts.Edit} lazy={() => import('./routes/posts/edit/route')} />
        <Route path={Paths.Posts.Destroy} lazy={() => import('./routes/posts/destroy/route')} />
        <Route path={Paths.Comments} lazy={() => import('./routes/comments/route')} />
        <Route path={Paths.Todos} lazy={() => import('./routes/todos/route')} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

/**
 * Guest-only routes.
 */
const Guest = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="*" lazy={() => import('./routes/login/route')} />),
  );

  return <RouterProvider router={router} />;
};
