import { type FC, useState } from 'react';
import { DocumentTitle } from '../../components/DocumentTitle';
import { DepartmentManagerPortal } from './template/DepartmentManagerPortal';

/**
 * Mock data for Epic 2 Story 2.3 - Department Manager Self-Service Portal
 */
const mockDepartmentManagerData = {
  manager: {
    name: 'Sarah Johnson',
    department: 'Marketing',
    employeeCount: 24,
  },
  costData: {
    monthly: {
      current: 40420,
      budget: 38500,
      variance: 4.98,
    },
    quarterly: {
      current: 121260,
      budget: 115500,
      variance: 4.98,
    },
    annual: {
      current: 485040,
      budget: 462000,
      variance: 4.98,
    },
  },
  budgetUtilization: {
    spent: 485040,
    allocated: 462000,
    remaining: -23040,
    percentageUsed: 105.0,
  },
  locations: [
    {
      name: 'NYC Office - Floor 12',
      cost: 285040,
      percentage: 58.8,
      employeeCount: 14,
      sqft: 2400,
    },
    {
      name: 'SF Office - Floor 8',
      cost: 200000,
      percentage: 41.2,
      employeeCount: 10,
      sqft: 1600,
    },
  ],
  costTrends: [
    { month: 'Jan 2024', cost: 38500, budget: 38500 },
    { month: 'Feb 2024', cost: 39200, budget: 38500 },
    { month: 'Mar 2024', cost: 38900, budget: 38500 },
    { month: 'Apr 2024', cost: 40100, budget: 38500 },
    { month: 'May 2024', cost: 39800, budget: 38500 },
    { month: 'Jun 2024', cost: 40420, budget: 38500 },
  ],
  spaceEfficiencyMetrics: {
    costPerEmployee: 20210,
    costPerSqft: 121.26,
    utilizationRate: 87,
    benchmarkComparison: {
      industry: 18500,
      company: 19200,
    },
  },
  upcomingLeaseEvents: [
    {
      id: 'lease-002',
      type: 'renewal',
      property: 'Marketing Storage Unit',
      date: '2026-05-31',
      daysUntil: 520,
      estimatedCost: 105000,
      actionRequired: true,
    },
    {
      id: 'lease-003',
      type: 'expiration',
      property: 'SF Office - Market St',
      date: '2027-02-28',
      daysUntil: 795,
      estimatedCost: 200000,
      actionRequired: false,
    },
  ],
};

/**
 * Department Manager Portal Route - Story 2.3 Implementation
 */
export const Component: FC = () => {
  const [selectedView, setSelectedView] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [alertsExpanded, setAlertsExpanded] = useState(false);

  const handleViewChange = (view: 'monthly' | 'quarterly' | 'annual') => {
    setSelectedView(view);
    console.log('View changed to:', view);
  };

  const handleExportData = () => {
    console.log('Exporting department manager portal data...');
    alert('Export department manager data - Story 2.5 implementation point');
  };

  const handleLeaseAction = (leaseId: string, action: string) => {
    console.log('Lease action:', action, 'for lease:', leaseId);
    alert(`Lease ${action} for ${leaseId} - Workflow integration point`);
  };

  const handleRequestSpaceChange = () => {
    console.log('Request space change initiated');
    alert('Space change request - Workflow integration point');
  };

  return (
    <>
      <DocumentTitle title="Department Manager Portal - Marketing" />

      <DepartmentManagerPortal
        managerData={mockDepartmentManagerData.manager}
        costData={mockDepartmentManagerData.costData}
        budgetUtilization={mockDepartmentManagerData.budgetUtilization}
        locations={mockDepartmentManagerData.locations}
        costTrends={mockDepartmentManagerData.costTrends}
        spaceMetrics={mockDepartmentManagerData.spaceEfficiencyMetrics}
        upcomingEvents={mockDepartmentManagerData.upcomingLeaseEvents}
        selectedView={selectedView}
        alertsExpanded={alertsExpanded}
        onViewChange={handleViewChange}
        onExportData={handleExportData}
        onLeaseAction={handleLeaseAction}
        onRequestSpaceChange={handleRequestSpaceChange}
        onToggleAlerts={() => setAlertsExpanded(!alertsExpanded)}
      />
    </>
  );
};