import { 
  Typography, 
  Panel, 
  VStack, 
  HStack,
  Badge,
  StatusLabel,
  DataGrid,
  Button,
  SectionMessage 
} from '@moneyforward/mfui-components';
import { type FC } from 'react';
import { TextLink } from '../../../components/TextLink';
import { Paths } from '../../../routes';
import styles from './styles.module.css';

type KpiMetrics = {
  totalLeaseCosts: number;
  budgetVariance: number;
  yearOverYearChange: number;
  costPerSqFt: number;
};

type DepartmentData = {
  id: string;
  name: string;
  monthlyCost: number;
  budgetedCost: number;
  variance: number;
  locations: string[];
  utilizationRate: number;
};

type TrendPoint = {
  month: string;
  cost: number;
};

type Alert = {
  type: 'warning' | 'info' | 'error';
  message: string;
  action: string;
};

type Props = {
  kpiMetrics: KpiMetrics;
  departmentBreakdown: DepartmentData[];
  trendData: TrendPoint[];
  alerts: Alert[];
};

/**
 * Formats currency values
 */
const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${amount.toLocaleString()}`;
};

/**
 * Gets status label type based on variance
 */
const getVarianceStatus = (variance: number): 'success' | 'warning' | 'error' => {
  if (variance <= -5) return 'success';
  if (variance <= 5) return 'warning';
  return 'error';
};

/**
 * Executive Dashboard Template
 * Follows MFUI layout patterns from the specification
 */
export const Template: FC<Props> = ({ 
  kpiMetrics, 
  departmentBreakdown, 
  trendData, 
  alerts 
}) => {
  const departmentColumns = [
    {
      key: 'name',
      title: 'Department',
      render: (department: DepartmentData) => (
        <TextLink to={`${Paths.Executive.Department.replace(':departmentId', department.id)}`}>
          {department.name}
        </TextLink>
      ),
    },
    {
      key: 'monthlyCost',
      title: 'Monthly Cost',
      render: (department: DepartmentData) => formatCurrency(department.monthlyCost),
    },
    {
      key: 'budgetedCost', 
      title: 'Budgeted',
      render: (department: DepartmentData) => formatCurrency(department.budgetedCost),
    },
    {
      key: 'variance',
      title: 'Variance',
      render: (department: DepartmentData) => (
        <StatusLabel status={getVarianceStatus(department.variance)}>
          {department.variance > 0 ? '+' : ''}{department.variance.toFixed(1)}%
        </StatusLabel>
      ),
    },
    {
      key: 'locations',
      title: 'Locations',
      render: (department: DepartmentData) => department.locations.join(', '),
    },
    {
      key: 'utilizationRate',
      title: 'Utilization',
      render: (department: DepartmentData) => `${department.utilizationRate}%`,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <Typography as="h1" variant="pageHeading1">
          Executive Dashboard
        </Typography>
        <HStack gap={12}>
          <Button priority="secondary">Export Report</Button>
          <Button priority="primary">
            <TextLink to={Paths.Allocation.Index} className={styles.buttonLink}>
              Configure Allocation
            </TextLink>
          </Button>
        </HStack>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className={styles.alertsSection}>
          {alerts.map((alert, index) => (
            <SectionMessage 
              key={index}
              status={alert.type} 
              title={alert.message}
            >
              {alert.action}
            </SectionMessage>
          ))}
        </div>
      )}

      <VStack gap={24}>
        {/* KPI Cards Row */}
        <HStack gap={16} className={styles.kpiRow}>
          <Panel className={styles.kpiCard}>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.kpiValue}>
                {formatCurrency(kpiMetrics.totalLeaseCosts)}
              </Typography>
              <Typography variant="body">Total Lease Costs</Typography>
              <StatusLabel status={getVarianceStatus(kpiMetrics.budgetVariance)}>
                {kpiMetrics.budgetVariance > 0 ? '+' : ''}
                {kpiMetrics.budgetVariance.toFixed(1)}% vs Budget
              </StatusLabel>
            </VStack>
          </Panel>

          <Panel className={styles.kpiCard}>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.kpiValue}>
                {kpiMetrics.yearOverYearChange > 0 ? '+' : ''}
                {kpiMetrics.yearOverYearChange.toFixed(1)}%
              </Typography>
              <Typography variant="body">YoY Change</Typography>
              <Badge variant={kpiMetrics.yearOverYearChange < 0 ? 'success' : 'warning'}>
                {kpiMetrics.yearOverYearChange < 0 ? 'Decreased' : 'Increased'}
              </Badge>
            </VStack>
          </Panel>

          <Panel className={styles.kpiCard}>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.kpiValue}>
                ${kpiMetrics.costPerSqFt.toFixed(2)}
              </Typography>
              <Typography variant="body">Cost per Sq Ft</Typography>
            </VStack>
          </Panel>

          <Panel className={styles.kpiCard}>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.kpiValue}>
                {departmentBreakdown.length}
              </Typography>
              <Typography variant="body">Departments</Typography>
            </VStack>
          </Panel>
        </HStack>

        {/* Department Breakdown Table */}
        <Panel>
          <Panel.Header>
            <Typography as="h2" variant="sectionHeading">
              Department Cost Breakdown
            </Typography>
          </Panel.Header>
          <Panel.Body>
            <DataGrid 
              layout="edge-to-edge" 
              fixedHeader
              columns={departmentColumns}
              data={departmentBreakdown}
              emptyMessage="No department data available"
            />
          </Panel.Body>
        </Panel>

        {/* Trend Analysis Section */}
        <Panel>
          <Panel.Header>
            <Typography as="h2" variant="sectionHeading">
              Cost Trend Analysis
            </Typography>
          </Panel.Header>
          <Panel.Body>
            <div className={styles.trendSection}>
              <Typography variant="body">
                Monthly lease cost trends showing gradual increase over Q1 2024.
              </Typography>
              <div className={styles.trendChart}>
                {trendData.map((point, index) => (
                  <div key={point.month} className={styles.trendPoint}>
                    <Typography variant="controlLabel">{point.month}</Typography>
                    <Typography variant="body">{formatCurrency(point.cost)}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </Panel.Body>
        </Panel>
      </VStack>
    </div>
  );
};