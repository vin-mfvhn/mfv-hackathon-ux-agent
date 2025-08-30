/**
 * The paths used in the AI Onboarding Tool.
 */
export const Paths = {
  Home: '/',
  
  // Main onboarding dashboards
  SelectRole: '/',
  HRDashboard: '/hr',
  EmployeeDashboard: '/employee',
  
  // Demo and comparison features
  Demo: '/demo',
  Comparison: '/comparison',
  
  // Legacy routes (kept for compatibility)
  Dashboard: '/',
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
