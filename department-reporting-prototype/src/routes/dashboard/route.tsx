import { type FC } from 'react';
import { useLoaderData } from 'react-router';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Paths } from '../../routes';
import { Template } from './template';

/**
 * Loader function - Mock data for department reporting overview
 */
export async function loader() {
  // Simulate loading department reporting summary data
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    totalLeaseCosts: 2400000, // $2.4M total
    departments: 12,
    locations: 8,
    budgetVariance: 5.2, // 5.2% over budget
  };
}

/**
 * The Department Reporting Dashboard page.
 */
export const Component: FC = () => {
  const summary = useLoaderData<typeof loader>();

  const items = [
    {
      label: 'Executive Dashboard',
      figure: `$${(summary.totalLeaseCosts / 1000000).toFixed(1)}M`,
      to: Paths.Executive.Index,
      themeColor: '#1890ff',
      description: 'Cost overview and variance analysis',
    },
    {
      label: 'My Department screen',
      figure: summary.departments,
      to: Paths.MyDepartment.Index,
      themeColor: '#52c41a',
      description: 'Self-service cost portal',
    },
    {
      label: 'Allocation Config',
      figure: `${summary.budgetVariance}%`,
      to: Paths.Allocation.Index,
      themeColor: summary.budgetVariance > 5 ? '#ff4d4f' : '#faad14',
      description: 'Cost allocation setup',
    },
    {
      label: 'Reports Center screen',
      figure: summary.locations,
      to: Paths.Reports.Index,
      themeColor: '#722ed1',
      description: 'Export and scheduling',
    },
  ];

  return (
    <>
      <DocumentTitle title="Department Reporting Dashboard" />

      <Template 
        items={items} 
        title="Department-Level Reporting & Cost Center Allocation"
        subtitle="Enterprise lease cost management and allocation system"
      />
    </>
  );
};
