import { type FC } from 'react';
import { useLoaderData } from 'react-router';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Template } from './template';

/**
 * Allocation Configuration loader
 * Mock data for system administrator cost allocation setup
 */
export async function loader() {
  // Simulate API call to get current allocation configuration
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    currentConfig: {
      allocationMethod: 'headcount',
      lastUpdated: '2024-03-15T10:30:00Z',
      updatedBy: 'admin@company.com',
    },
    availableMethods: [
      {
        id: 'headcount',
        name: 'Headcount-Based',
        description: 'Allocate costs based on number of employees per department',
        formula: 'Department Cost = Total Cost × (Department Headcount / Total Headcount)',
      },
      {
        id: 'square_footage',
        name: 'Square Footage',
        description: 'Allocate costs based on occupied space per department',
        formula: 'Department Cost = Total Cost × (Department Sq Ft / Total Sq Ft)',
      },
      {
        id: 'revenue',
        name: 'Revenue-Based',
        description: 'Allocate costs based on department revenue contribution',
        formula: 'Department Cost = Total Cost × (Department Revenue / Total Revenue)',
      },
      {
        id: 'custom',
        name: 'Custom Percentages',
        description: 'Manually define percentage allocation for each department',
        formula: 'Department Cost = Total Cost × Custom Percentage',
      },
    ],
    departments: [
      {
        id: '1',
        name: 'Sales',
        headcount: 25,
        squareFootage: 4200,
        revenue: 1500000,
        currentAllocation: 28.5,
      },
      {
        id: '2',
        name: 'Engineering',
        headcount: 45,
        squareFootage: 7200,
        revenue: 0, // Cost center
        currentAllocation: 42.8,
      },
      {
        id: '3',
        name: 'Marketing',
        headcount: 15,
        squareFootage: 2800,
        revenue: 0, // Cost center
        currentAllocation: 14.3,
      },
      {
        id: '4',
        name: 'Operations',
        headcount: 12,
        squareFootage: 2200,
        revenue: 0, // Cost center
        currentAllocation: 11.4,
      },
      {
        id: '5',
        name: 'Finance',
        headcount: 8,
        squareFootage: 1600,
        revenue: 0, // Cost center
        currentAllocation: 7.6,
      },
    ],
    previewData: {
      totalMonthlyCost: 200000,
      allocationBreakdown: [
        { departmentId: '1', departmentName: 'Sales', allocatedCost: 57000 },
        { departmentId: '2', departmentName: 'Engineering', allocatedCost: 85600 },
        { departmentId: '3', departmentName: 'Marketing', allocatedCost: 28600 },
        { departmentId: '4', departmentName: 'Operations', allocatedCost: 22800 },
        { departmentId: '5', departmentName: 'Finance', allocatedCost: 15200 },
      ],
    },
    auditTrail: [
      {
        date: '2024-03-15T10:30:00Z',
        user: 'admin@company.com',
        action: 'Updated allocation method',
        details: 'Changed from square footage to headcount-based allocation',
      },
      {
        date: '2024-02-28T14:15:00Z',
        user: 'admin@company.com',
        action: 'Added new department',
        details: 'Added Operations department to allocation mapping',
      },
      {
        date: '2024-02-01T09:45:00Z',
        user: 'admin@company.com',
        action: 'Configuration validation',
        details: 'Verified allocation percentages sum to 100%',
      },
    ],
  };
}

/**
 * Allocation Configuration Component
 * Primary user: System Administrators
 * Use case: Configure automated cost allocation rules with real-time preview
 */
export const Component: FC = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <DocumentTitle title="Allocation Configuration - Department Reporting" />
      
      <Template 
        currentConfig={data.currentConfig}
        availableMethods={data.availableMethods}
        departments={data.departments}
        previewData={data.previewData}
        auditTrail={data.auditTrail}
      />
    </>
  );
};