import {
  Button,
  Card,
  DataGrid,
  GlobalHeader,
  MainNavigation,
  PageHeader,
  ProgressBar,
  Tabs,
  Tooltip,
  Typography,
} from '@moneyforward/mfui-components';
import { type FC } from 'react';
import styles from './department-manager-portal.module.css';

interface Manager {
  name: string;
  department: string;
  employeeCount: number;
}

interface CostData {
  monthly: {
    current: number;
    budget: number;
    variance: number;
  };
  quarterly: {
    current: number;
    budget: number;
    variance: number;
  };
  annual: {
    current: number;
    budget: number;
    variance: number;
  };
}

interface BudgetUtilization {
  spent: number;
  allocated: number;
  remaining: number;
  percentageUsed: number;
}

interface Location {
  name: string;
  cost: number;
  percentage: number;
  employeeCount: number;
  sqft: number;
}

interface CostTrend {
  month: string;
  cost: number;
  budget: number;
}

interface SpaceMetrics {
  costPerEmployee: number;
  costPerSqft: number;
  utilizationRate: number;
  benchmarkComparison: {
    industry: number;
    company: number;
  };
}

interface LeaseEvent {
  id: string;
  type: 'renewal' | 'expiration' | 'change';
  property: string;
  date: string;
  daysUntil: number;
  estimatedCost: number;
  actionRequired: boolean;
}

interface Props {
  managerData: Manager;
  costData: CostData;
  budgetUtilization: BudgetUtilization;
  locations: Location[];
  costTrends: CostTrend[];
  spaceMetrics: SpaceMetrics;
  upcomingEvents: LeaseEvent[];
  selectedView: 'monthly' | 'quarterly' | 'annual';
  alertsExpanded: boolean;
  onViewChange: (view: 'monthly' | 'quarterly' | 'annual') => void;
  onExportData: () => void;
  onLeaseAction: (leaseId: string, action: string) => void;
  onRequestSpaceChange: () => void;
  onToggleAlerts: () => void;
}

/**
 * Department Manager Self-Service Portal - Story 2.3 Implementation
 * Role-based access with department-specific cost monitoring and mobile optimization
 */
export const DepartmentManagerPortal: FC<Props> = ({
  managerData,
  costData,
  budgetUtilization,
  locations,
  costTrends,
  spaceMetrics,
  upcomingEvents,
  selectedView,
  alertsExpanded,
  onViewChange,
  onExportData,
  onLeaseAction,
  onRequestSpaceChange,
  onToggleAlerts,
}) => {
  const currentCostData = costData[selectedView];
  
  const locationColumns = [
    {
      key: 'name',
      label: 'Location',
      render: (row: Location) => row.name,
    },
    {
      key: 'cost',
      label: 'Monthly Cost',
      render: (row: Location) => `$${row.cost.toLocaleString()}`,
    },
    {
      key: 'percentage',
      label: '% of Total',
      render: (row: Location) => `${row.percentage.toFixed(1)}%`,
    },
    {
      key: 'employeeCount',
      label: 'Employees',
      render: (row: Location) => `${row.employeeCount}`,
    },
    {
      key: 'efficiency',
      label: 'Cost/Employee',
      render: (row: Location) => `$${(row.cost / row.employeeCount).toLocaleString()}`,
    },
  ];

  const leaseEventColumns = [
    {
      key: 'property',
      label: 'Property',
      render: (row: LeaseEvent) => row.property,
    },
    {
      key: 'type',
      label: 'Event Type',
      render: (row: LeaseEvent) => (
        <span className={styles[row.type]}>{row.type.charAt(0).toUpperCase() + row.type.slice(1)}</span>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (row: LeaseEvent) => new Date(row.date).toLocaleDateString(),
    },
    {
      key: 'daysUntil',
      label: 'Days Until',
      render: (row: LeaseEvent) => `${row.daysUntil} days`,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: LeaseEvent) => (
        <div className={styles.actionButtons}>
          {row.actionRequired && (
            <Button
              variant="primary"
              size="small"
              onClick={() => onLeaseAction(row.id, 'review')}
            >
              Review
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={() => onLeaseAction(row.id, 'details')}
          >
            Details
          </Button>
        </div>
      ),
    },
  ];

  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) > 5) return 'error';
    if (Math.abs(variance) > 2) return 'warning';
    return 'success';
  };

  const getBenchmarkComparison = (current: number, benchmark: number) => {
    const difference = ((current - benchmark) / benchmark) * 100;
    return {
      percentage: difference,
      color: difference > 10 ? 'error' : difference > 0 ? 'warning' : 'success',
    };
  };

  return (
    <div className={styles.portalContainer}>
      {/* Department-specific Global Header */}
      <div className={styles.header}>
        <Typography variant="pageHeading">
          {managerData.department} Department Portal
        </Typography>
        <div className={styles.managerInfo}>
          <Typography variant="body">
            Welcome, {managerData.name} | {managerData.employeeCount} team members
          </Typography>
        </div>
      </div>

      <PageHeader
        title={`${managerData.department} Space & Cost Dashboard`}
        actions={[
          <Button key="export" variant="secondary" onClick={onExportData}>
            Export Data
          </Button>,
          <Button key="space-request" variant="outlined" onClick={onRequestSpaceChange}>
            Request Space Change
          </Button>,
        ]}
      />

      {/* Time Period Selector */}
      <div className={styles.viewSelector}>
        <Tabs value={selectedView} onChange={(value) => onViewChange(value as typeof selectedView)}>
          <Tabs.Item value="monthly">Monthly View</Tabs.Item>
          <Tabs.Item value="quarterly">Quarterly View</Tabs.Item>
          <Tabs.Item value="annual">Annual View</Tabs.Item>
        </Tabs>
      </div>

      {/* Cost Overview Cards */}
      <div className={styles.overviewCards}>
        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Department Lease Costs</Typography>
          </Card.Header>
          <Card.Body>
            <div className={styles.costOverview}>
              <Typography variant="displayLarge" as="div">
                ${currentCostData.current.toLocaleString()}
              </Typography>
              <div className={styles.variance}>
                <span className={styles[getVarianceColor(currentCostData.variance)]}>
                  {currentCostData.variance >= 0 ? '+' : ''}{currentCostData.variance.toFixed(1)}% vs budget
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <div className={styles.cardHeaderWithTooltip}>
              <Typography variant="contentHeading">Budget Utilization</Typography>
              <Tooltip content="Shows current spend vs allocated budget for the selected period">
                <span className={styles.tooltipIcon}>ℹ</span>
              </Tooltip>
            </div>
          </Card.Header>
          <Card.Body>
            <div className={styles.budgetUtilization}>
              <ProgressBar
                value={Math.min(budgetUtilization.percentageUsed, 100)}
                max={100}
                color={getVarianceColor(budgetUtilization.percentageUsed - 100) as any}
                label={`${budgetUtilization.percentageUsed.toFixed(1)}% of budget used`}
              />
              <div className={styles.budgetDetails}>
                <div className={styles.budgetItem}>
                  <Typography variant="controlLabel">Allocated</Typography>
                  <Typography>${budgetUtilization.allocated.toLocaleString()}</Typography>
                </div>
                <div className={styles.budgetItem}>
                  <Typography variant="controlLabel">Spent</Typography>
                  <Typography>${budgetUtilization.spent.toLocaleString()}</Typography>
                </div>
                <div className={styles.budgetItem}>
                  <Typography variant="controlLabel">Remaining</Typography>
                  <Typography className={budgetUtilization.remaining < 0 ? styles.error : styles.success}>
                    ${Math.abs(budgetUtilization.remaining).toLocaleString()}
                    {budgetUtilization.remaining < 0 ? ' over' : ''}
                  </Typography>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Space Efficiency</Typography>
          </Card.Header>
          <Card.Body>
            <div className={styles.spaceMetrics}>
              <div className={styles.metricItem}>
                <Typography variant="controlLabel">Cost per Employee</Typography>
                <Typography variant="displaySmall" as="div">
                  ${spaceMetrics.costPerEmployee.toLocaleString()}
                </Typography>
                {(() => {
                  const comparison = getBenchmarkComparison(spaceMetrics.costPerEmployee, spaceMetrics.benchmarkComparison.company);
                  return (
                    <span className={styles[comparison.color]}>
                      {comparison.percentage >= 0 ? '+' : ''}{comparison.percentage.toFixed(1)}% vs company avg
                    </span>
                  );
                })()}
              </div>
              <div className={styles.metricItem}>
                <Typography variant="controlLabel">Cost per Sqft</Typography>
                <Typography variant="displaySmall" as="div">
                  ${spaceMetrics.costPerSqft.toFixed(2)}
                </Typography>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Location Breakdown */}
      <div className={styles.locationsSection}>
        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Cost Distribution by Location</Typography>
          </Card.Header>
          <Card.Body>
            <DataGrid
              data={locations}
              columns={locationColumns}
              pagination={{ pageSize: 5 }}
              sortable
            />
          </Card.Body>
        </Card>
      </div>

      {/* Cost Trend Analysis */}
      <div className={styles.trendsSection}>
        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Historical Spend Patterns</Typography>
          </Card.Header>
          <Card.Body>
            <div className={styles.trendPlaceholder}>
              <Typography variant="body">
                [Trend Chart Component Integration Point]
                <br />
                Historical cost trends vs budget over last 6 months
                <br />
                Current view: {selectedView}
              </Typography>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Upcoming Lease Events */}
      <div className={styles.eventsSection}>
        <Card>
          <Card.Header>
            <div className={styles.eventsHeader}>
              <Typography variant="contentHeading">Upcoming Lease Events</Typography>
              <Button variant="text" onClick={onToggleAlerts}>
                {alertsExpanded ? 'Show Less' : 'Show All'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <DataGrid
              data={alertsExpanded ? upcomingEvents : upcomingEvents.slice(0, 3)}
              columns={leaseEventColumns}
              pagination={false}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};