import { type FC } from 'react';
import { useLoaderData } from 'react-router';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Template } from './template';

/**
 * Department Manager Portal loader
 * Mock data representing a specific department's view
 */
export async function loader() {
  // Simulate API call to get current user's department data
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Mock current user as Engineering Department Manager (Mike)
  return {
    userProfile: {
      name: 'Mike Chen',
      department: 'Engineering',
      role: 'Department Manager',
    },
    departmentSummary: {
      departmentName: 'Engineering',
      monthlyCost: 52000,
      budgetedCost: 50000,
      variance: 4.0,
      yearToDateSpend: 198000,
      yearToDateBudget: 200000,
      utilizationRate: 85,
      headcount: 45,
    },
    locationBreakdown: [
      {
        id: '1',
        name: 'NYC Office - Floor 12',
        monthlyCost: 32000,
        sqFootage: 8500,
        headcount: 28,
        utilizationRate: 88,
      },
      {
        id: '2', 
        name: 'Austin Office - Building A',
        monthlyCost: 20000,
        sqFootage: 6200,
        headcount: 17,
        utilizationRate: 82,
      },
    ],
    upcomingRenewals: [
      {
        id: '1',
        location: 'NYC Office - Floor 12',
        expirationDate: '2025-10-31',
        monthsUntilExpiration: 14,
        currentRate: 32000,
        marketRate: 35000,
        status: 'renewal_planning',
      },
    ],
    budgetTracking: [
      { month: 'Jan', spent: 48000, budgeted: 50000 },
      { month: 'Feb', spent: 50000, budgeted: 50000 },
      { month: 'Mar', spent: 52000, budgeted: 50000 },
      { month: 'Apr', spent: 48000, budgeted: 50000 },
    ],
    spaceUtilization: {
      peakOccupancy: 92,
      averageOccupancy: 85,
      underutilizedSpaces: [
        'Conference Room C (62% utilization)',
        'Break Area East (71% utilization)',
      ],
    },
    actionItems: [
      {
        type: 'renewal',
        priority: 'medium' as 'medium',
        title: 'Plan NYC office lease renewal',
        dueDate: '2025-04-30',
        description: 'Begin renewal negotiations 6 months before expiration',
      },
      {
        type: 'budget',
        priority: 'low' as 'low',
        title: 'Review March budget variance',
        dueDate: '2025-04-15', 
        description: 'Analyze causes of 4% budget overrun',
      },
    ],
  };
}

/**
 * Department Manager Portal Component
 * Primary user: Department Managers (Mike)
 * Use case: Self-service access to department lease costs and planning
 */
export const Component: FC = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <DocumentTitle title={`${data.userProfile.department} Department Portal`} />
      
      <Template 
        userProfile={data.userProfile}
        departmentSummary={data.departmentSummary}
        locationBreakdown={data.locationBreakdown}
        upcomingRenewals={data.upcomingRenewals}
        budgetTracking={data.budgetTracking}
        spaceUtilization={data.spaceUtilization}
        actionItems={data.actionItems}
      />
    </>
  );
};