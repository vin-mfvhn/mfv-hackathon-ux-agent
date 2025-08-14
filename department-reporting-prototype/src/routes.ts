/**
 * The paths used in the application.
 */
export const Paths = {
  Home: '/',

  Dashboard: '/',

  // Department Reporting & Cost Allocation paths
  DepartmentReporting: {
    Dashboard: '/department-reporting',
    AllocationConfig: '/department-reporting/allocation-config',
    DepartmentDetail: '/department-reporting/departments/:departmentId',
    Reports: '/department-reporting/reports',
  },

  // Original demo paths kept for reference
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
