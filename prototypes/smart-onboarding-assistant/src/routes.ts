/**
 * The paths used in the application.
 */
export const Paths = {
  Home: '/',

  Dashboard: '/',

  // Smart Onboarding Assistant Routes
  Onboarding: {
    Generator: '/onboarding/generator',
    HRDashboard: '/onboarding/hr-dashboard',
    ManagerDashboard: '/onboarding/manager-dashboard',
    EmployeeDashboard: '/onboarding/employee-dashboard',
    KeyPeople: '/onboarding/key-people',
    Documents: '/onboarding/documents',
  },

  Users: {
    Index: '/users',
    Detail: '/users/:userId',
  },

  Posts: {
    Index: '/posts',
    Detail: '/posts/:postId',
    New: '/posts/new',
    Edit: '/posts/:postId/edit',
    Destroy: '/posts/:postId/destroy',
  },

  Comments: '/comments',

  Todos: '/todos',
} as const;
