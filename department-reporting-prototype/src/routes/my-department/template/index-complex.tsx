import {
  Typography,
  Panel,
  VStack,
  HStack,
  Tabs,
  KeyValue,
  ProgressIndicator,
  StatusLabel,
  Badge,
  Button,
  DataGrid,
} from '@moneyforward/mfui-components';
import { type FC, useState } from 'react';
import { TextLink } from '../../../components/TextLink';
import { Paths } from '../../../routes';
import styles from './styles.module.css';

type UserProfile = {
  name: string;
  department: string;
  role: string;
};

type DepartmentSummary = {
  departmentName: string;
  monthlyCost: number;
  budgetedCost: number;
  variance: number;
  yearToDateSpend: number;
  yearToDateBudget: number;
  utilizationRate: number;
  headcount: number;
};

type LocationData = {
  id: string;
  name: string;
  monthlyCost: number;
  sqFootage: number;
  headcount: number;
  utilizationRate: number;
};

type Renewal = {
  id: string;
  location: string;
  expirationDate: string;
  monthsUntilExpiration: number;
  currentRate: number;
  marketRate: number;
  status: string;
};

type BudgetPoint = {
  month: string;
  spent: number;
  budgeted: number;
};

type SpaceUtilization = {
  peakOccupancy: number;
  averageOccupancy: number;
  underutilizedSpaces: string[];
};

type ActionItem = {
  type: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  dueDate: string;
  description: string;
};

type Props = {
  userProfile: UserProfile;
  departmentSummary: DepartmentSummary;
  locationBreakdown: LocationData[];
  upcomingRenewals: Renewal[];
  budgetTracking: BudgetPoint[];
  spaceUtilization: SpaceUtilization;
  actionItems: ActionItem[];
};

const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString()}`;
};

const getVarianceStatus = (variance: number): 'success' | 'warning' | 'error' => {
  if (variance <= -5) return 'success';
  if (variance <= 5) return 'warning';
  return 'error';
};

const getPriorityBadge = (priority: string): 'error' | 'warning' | 'default' => {
  switch (priority) {
    case 'high': return 'error';
    case 'medium': return 'warning';
    default: return 'default';
  }
};

/**
 * Department Manager Portal Template
 * Self-service portal following MFUI portal patterns
 */
export const Template: FC<Props> = ({
  userProfile,
  departmentSummary,
  locationBreakdown,
  upcomingRenewals,
  budgetTracking,
  spaceUtilization,
  actionItems,
}) => {
  const [activeTab, setActiveTab] = useState('costs');

  const locationColumns = [
    {
      key: 'name',
      title: 'Location',
      render: (location: LocationData) => location.name,
    },
    {
      key: 'monthlyCost',
      title: 'Monthly Cost',
      render: (location: LocationData) => formatCurrency(location.monthlyCost),
    },
    {
      key: 'sqFootage',
      title: 'Sq Footage',
      render: (location: LocationData) => `${location.sqFootage.toLocaleString()} sq ft`,
    },
    {
      key: 'headcount',
      title: 'Headcount',
      render: (location: LocationData) => location.headcount.toString(),
    },
    {
      key: 'utilizationRate',
      title: 'Utilization',
      render: (location: LocationData) => `${location.utilizationRate}%`,
    },
  ];

  const renewalColumns = [
    {
      key: 'location',
      title: 'Location',
      render: (renewal: Renewal) => renewal.location,
    },
    {
      key: 'expirationDate',
      title: 'Expiration',
      render: (renewal: Renewal) => new Date(renewal.expirationDate).toLocaleDateString(),
    },
    {
      key: 'monthsUntilExpiration',
      title: 'Time Remaining',
      render: (renewal: Renewal) => `${renewal.monthsUntilExpiration} months`,
    },
    {
      key: 'currentRate',
      title: 'Current Rate',
      render: (renewal: Renewal) => formatCurrency(renewal.currentRate),
    },
    {
      key: 'marketRate',
      title: 'Market Rate',
      render: (renewal: Renewal) => formatCurrency(renewal.marketRate),
    },
    {
      key: 'status',
      title: 'Status',
      render: (renewal: Renewal) => (
        <Badge variant="default">{renewal.status.replace('_', ' ')}</Badge>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      {/* Page Header with User Info */}
      <div className={styles.pageHeader}>
        <div>
          <Typography as="h1" variant="pageHeading1">
            My Department Portal
          </Typography>
          <Typography variant="body" className={styles.userInfo}>
            {userProfile.name} • {userProfile.role} • {userProfile.department}
          </Typography>
        </div>
        <HStack gap={12}>
          <Button priority="secondary">Export Report</Button>
          <Button priority="primary">Request Space Change</Button>
        </HStack>
      </div>

      <VStack gap={24}>
        {/* Department Summary Cards */}
        <HStack gap={16} className={styles.summaryRow}>
          <Panel className={styles.summaryCard}>
            <Panel.Header>
              <Typography variant="contentHeading">Monthly Cost</Typography>
            </Panel.Header>
            <Panel.Body>
              <VStack gap={8}>
                <Typography variant="amount" className={styles.costValue}>
                  {formatCurrency(departmentSummary.monthlyCost)}
                </Typography>
                <StatusLabel status={getVarianceStatus(departmentSummary.variance)}>
                  {departmentSummary.variance > 0 ? '+' : ''}
                  {departmentSummary.variance.toFixed(1)}% vs Budget
                </StatusLabel>
              </VStack>
            </Panel.Body>
          </Panel>

          <Panel className={styles.summaryCard}>
            <Panel.Header>
              <Typography variant="contentHeading">YTD Budget</Typography>
            </Panel.Header>
            <Panel.Body>
              <VStack gap={8}>
                <ProgressIndicator
                  value={(departmentSummary.yearToDateSpend / departmentSummary.yearToDateBudget) * 100}
                  label={`${formatCurrency(departmentSummary.yearToDateSpend)} / ${formatCurrency(departmentSummary.yearToDateBudget)}`}
                />
                <Typography variant="controlLabel">
                  {((departmentSummary.yearToDateSpend / departmentSummary.yearToDateBudget) * 100).toFixed(1)}% utilized
                </Typography>
              </VStack>
            </Panel.Body>
          </Panel>

          <Panel className={styles.summaryCard}>
            <Panel.Header>
              <Typography variant="contentHeading">Space Utilization</Typography>
            </Panel.Header>
            <Panel.Body>
              <VStack gap={8}>
                <Typography variant="amount" className={styles.utilizationValue}>
                  {departmentSummary.utilizationRate}%
                </Typography>
                <Typography variant="controlLabel">
                  {departmentSummary.headcount} people
                </Typography>
              </VStack>
            </Panel.Body>
          </Panel>
        </HStack>

        {/* Tabbed Content */}
        <Panel>
          <Panel.Header>
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.Tab value="costs">Cost Breakdown</Tabs.Tab>
              <Tabs.Tab value="budget">Budget Tracking</Tabs.Tab>
              <Tabs.Tab value="utilization">Space Utilization</Tabs.Tab>
              <Tabs.Tab value="renewals">Upcoming Renewals</Tabs.Tab>
            </Tabs>
          </Panel.Header>
          <Panel.Body>
            {activeTab === 'costs' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading">Location Breakdown</Typography>
                <DataGrid
                  layout="edge-to-edge"
                  columns={locationColumns}
                  data={locationBreakdown}
                  emptyMessage="No location data available"
                />
              </VStack>
            )}

            {activeTab === 'budget' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading">Monthly Budget vs Actual</Typography>
                <div className={styles.budgetChart}>
                  {budgetTracking.map((point) => (
                    <div key={point.month} className={styles.budgetPoint}>
                      <Typography variant="controlLabel">{point.month}</Typography>
                      <KeyValue
                        items={[
                          { label: 'Budgeted', value: formatCurrency(point.budgeted) },
                          { label: 'Spent', value: formatCurrency(point.spent) },
                          {
                            label: 'Variance',
                            value: `${(((point.spent - point.budgeted) / point.budgeted) * 100).toFixed(1)}%`,
                          },
                        ]}
                      />
                    </div>
                  ))}
                </div>
              </VStack>
            )}

            {activeTab === 'utilization' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading">Space Usage Analytics</Typography>
                <HStack gap={24}>
                  <KeyValue
                    items={[
                      { label: 'Peak Occupancy', value: `${spaceUtilization.peakOccupancy}%` },
                      { label: 'Average Occupancy', value: `${spaceUtilization.averageOccupancy}%` },
                    ]}
                  />
                </HStack>
                {spaceUtilization.underutilizedSpaces.length > 0 && (
                  <div>
                    <Typography variant="contentHeading">Underutilized Areas</Typography>
                    <ul className={styles.underutilizedList}>
                      {spaceUtilization.underutilizedSpaces.map((space, index) => (
                        <li key={index}>
                          <Typography variant="body">{space}</Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </VStack>
            )}

            {activeTab === 'renewals' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading">Lease Renewals</Typography>
                <DataGrid
                  layout="edge-to-edge"
                  columns={renewalColumns}
                  data={upcomingRenewals}
                  emptyMessage="No upcoming renewals"
                />
              </VStack>
            )}
          </Panel.Body>
        </Panel>

        {/* Action Items */}
        {actionItems.length > 0 && (
          <Panel>
            <Panel.Header>
              <Typography variant="sectionHeading">Action Items</Typography>
            </Panel.Header>
            <Panel.Body>
              <VStack gap={12}>
                {actionItems.map((item, index) => (
                  <div key={index} className={styles.actionItem}>
                    <HStack gap={12} className={styles.actionHeader}>
                      <Badge variant={getPriorityBadge(item.priority)}>
                        {item.priority}
                      </Badge>
                      <Typography variant="contentHeading">{item.title}</Typography>
                      <Typography variant="controlLabel">Due: {new Date(item.dueDate).toLocaleDateString()}</Typography>
                    </HStack>
                    <Typography variant="body">{item.description}</Typography>
                  </div>
                ))}
              </VStack>
            </Panel.Body>
          </Panel>
        )}
      </VStack>
    </div>
  );
};