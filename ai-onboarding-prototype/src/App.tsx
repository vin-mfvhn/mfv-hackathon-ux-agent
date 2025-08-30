import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { Paths } from './routes';
import { Error } from './routes/error/route';

/**
 * AI Onboarding Tool App - Simplified for demo purposes
 */
export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Main AI Onboarding Routes */}
        <Route path={Paths.SelectRole} lazy={() => import('./routes/onboarding/route')} errorElement={<Error />} />
        <Route path={Paths.HRDashboard} lazy={() => import('./routes/hr-dashboard/route')} errorElement={<Error />} />
        <Route path={Paths.EmployeeDashboard} lazy={() => import('./routes/employee-dashboard/route')} errorElement={<Error />} />
        
        {/* Demo and Comparison Routes */}
        <Route path={Paths.Demo} lazy={() => import('./routes/onboarding/route')} errorElement={<Error />} />
        <Route path={Paths.Comparison} lazy={() => import('./routes/onboarding/route')} errorElement={<Error />} />
        
        {/* Fallback route */}
        <Route path="*" lazy={() => import('./routes/onboarding/route')} />
      </>
    ),
  );

  return <RouterProvider router={router} />;
};
