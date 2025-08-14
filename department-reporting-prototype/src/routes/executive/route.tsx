import { type FC } from 'react';
import { useLoaderData } from 'react-router';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Template } from './template';

/**
 * Executive Dashboard loader - Mock data for finance director use case
 */
export async function loader() {
  // Simulate API call to get executive dashboard data
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    kpiMetrics: {
      totalLeaseCosts: 2400000, // $2.4M
      budgetVariance: 5.2, // 5.2% over budget
      yearOverYearChange: -3.1, // -3.1% from previous year
      costPerSqFt: 42.50, // $42.50 per sq ft
    },
    departmentBreakdown: [
      {
        id: '1',
        name: 'Sales',
        monthlyCost: 48000,
        budgetedCost: 42000,
        variance: 14.3,
        locations: ['NYC', 'SF'],
        utilizationRate: 78,
      },
      {
        id: '2',
        name: 'Engineering',
        monthlyCost: 52000,
        budgetedCost: 50000,
        variance: 4.0,
        locations: ['NYC', 'Austin'],
        utilizationRate: 85,
      },
      {
        id: '3',
        name: 'Marketing',
        monthlyCost: 28000,
        budgetedCost: 30000,
        variance: -6.7,
        locations: ['SF'],
        utilizationRate: 82,
      },
      {
        id: '4',
        name: 'Operations',
        monthlyCost: 22000,
        budgetedCost: 25000,
        variance: -12.0,
        locations: ['Austin'],
        utilizationRate: 74,
      },
      {
        id: '5',
        name: 'Finance',
        monthlyCost: 18000,
        budgetedCost: 18000,
        variance: 0.0,
        locations: ['NYC'],
        utilizationRate: 88,
      },
    ],
    trendData: [
      { month: 'Jan', cost: 2200000 },
      { month: 'Feb', cost: 2280000 },
      { month: 'Mar', cost: 2350000 },
      { month: 'Apr', cost: 2400000 },
    ],
    alerts: [
      {
        type: 'warning',
        message: 'Sales department 14.3% over budget',
        action: 'Review space utilization',
      },
      {
        type: 'info',
        message: 'NYC lease expires in 14 months',
        action: 'Begin renewal planning',
      },
    ],
  };
}

/**
 * Executive Dashboard Component
 * Primary user: Finance Directors (Sarah)
 * Use case: Monthly cost review and variance analysis
 */
export const Component: FC = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <DocumentTitle title="Executive Dashboard - Department Reporting" />
      
      <Template 
        kpiMetrics={data.kpiMetrics}
        departmentBreakdown={data.departmentBreakdown}
        trendData={data.trendData}
        alerts={data.alerts}
      />
    </>
  );
};