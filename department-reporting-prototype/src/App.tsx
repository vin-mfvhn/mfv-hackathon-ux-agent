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
 * Member-only routes for Department Reporting Application.
 */
const Member = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={Paths.Home} lazy={() => import('./layouts/Desktop/route')} errorElement={<Error />}>
        <Route index lazy={() => import('./routes/dashboard/route')} />
        
        {/* Executive Dashboard Routes */}
        <Route path={Paths.Executive.Index} lazy={() => import('./routes/executive/route')} />
        
        {/* Department Manager Portal Routes */}
        <Route path={Paths.MyDepartment.Index} lazy={() => import('./routes/my-department/route')} />
        
        {/* Allocation Configuration Routes */}
        <Route path={Paths.Allocation.Index} lazy={() => import('./routes/allocation/route')} />
        
        {/* Reports Center Routes */}
        <Route path={Paths.Reports.Index} lazy={() => import('./routes/reports/route')} />
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
