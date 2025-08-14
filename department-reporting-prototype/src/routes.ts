/**
 * The paths used in the Department Reporting application.
 * Based on the MFUI Frontend Specification site map.
 */
export const Paths = {
  Home: '/',

  // Department Reporting Main Sections
  Executive: {
    Index: '/executive',
    Department: '/executive/department/:departmentId',
    Location: '/executive/department/:departmentId/location/:locationId',
    Contract: '/executive/contract/:contractId',
  },

  MyDepartment: {
    Index: '/my-department',
    Costs: '/my-department/costs',
    Budget: '/my-department/budget',
    Utilization: '/my-department/utilization',
    Renewals: '/my-department/renewals',
  },

  Allocation: {
    Index: '/allocation',
    Methods: '/allocation/methods',
    Mapping: '/allocation/mapping',
    Preview: '/allocation/preview',
  },

  Reports: {
    Index: '/reports',
    Templates: '/reports/templates',
    Scheduled: '/reports/scheduled',
    Export: '/reports/export',
  },

  // Legacy paths for compatibility
  Dashboard: '/',
} as const;
