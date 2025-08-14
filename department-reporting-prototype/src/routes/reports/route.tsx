import { type FC } from 'react';
import { useLoaderData } from 'react-router';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Template } from './template';

/**
 * Reports Center loader
 */
export async function loader() {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    reportTemplates: [
      {
        id: '1',
        name: 'Executive Summary Report',
        description: 'High-level cost overview for executive presentations',
        frequency: 'Monthly',
        lastGenerated: '2024-04-01T09:00:00Z',
        format: 'PDF',
      },
      {
        id: '2', 
        name: 'Department Cost Breakdown',
        description: 'Detailed cost allocation by department and location',
        frequency: 'Weekly',
        lastGenerated: '2024-04-07T10:30:00Z',
        format: 'Excel',
      },
      {
        id: '3',
        name: 'Budget Variance Analysis',
        description: 'Department-level budget vs actual analysis',
        frequency: 'Monthly',
        lastGenerated: '2024-04-01T08:15:00Z',
        format: 'PDF',
      },
    ],
    scheduledReports: [
      {
        id: '1',
        templateId: '1',
        templateName: 'Executive Summary Report', 
        schedule: 'First Monday of each month',
        recipients: ['cfo@company.com', 'finance-team@company.com'],
        nextRun: '2024-05-06T09:00:00Z',
        active: true,
      },
      {
        id: '2',
        templateId: '2',
        templateName: 'Department Cost Breakdown',
        schedule: 'Every Monday at 10:00 AM',
        recipients: ['managers@company.com'],
        nextRun: '2024-04-14T10:00:00Z', 
        active: true,
      },
    ],
    quickExports: [
      { label: 'Current Month Costs', description: 'Export current month department costs', format: 'Excel' },
      { label: 'YTD Budget Analysis', description: 'Year-to-date budget vs actual', format: 'PDF' },
      { label: 'Allocation Summary', description: 'Current cost allocation settings', format: 'Excel' },
      { label: 'Utilization Metrics', description: 'Space utilization by department', format: 'PDF' },
    ],
  };
}

/**
 * Reports Center Component
 */
export const Component: FC = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <DocumentTitle title="Reports Center - Department Reporting" />
      
      <Template 
        reportTemplates={data.reportTemplates}
        scheduledReports={data.scheduledReports}
        quickExports={data.quickExports}
      />
    </>
  );
};