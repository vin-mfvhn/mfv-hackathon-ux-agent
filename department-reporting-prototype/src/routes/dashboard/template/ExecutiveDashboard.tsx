import { Button, Card, DataGrid, PageHeader, ProgressBar, Toast, Typography } from '@moneyforward/mfui-components';
import { type FC, useState } from 'react';
import { TextLink } from '../../../components/TextLink';
import styles from './executive-dashboard.module.css';

interface KPIData {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  themeColor?: 'success' | 'warning' | 'error';
}

interface TopCostCenter {
  department: string;
  totalCost: number;
  percentage: number;
  change: number;
  variance: 'over' | 'under' | 'on-budget';
}

interface VarianceAlert {
  id: string;
  department: string;
  variance: number;
  severity: 'high' | 'medium' | 'low';
  message: string;
}

interface Props {
  kpis: KPIData[];
  topCostCenters: TopCostCenter[];
  varianceAlerts: VarianceAlert[];
  selectedTimePeriod: string;
  onTimePeriodChange: (period: string) => void;
  onExportData: () => void;
  onDrillDown: (department: string) => void;
}

/**
 * Enhanced Executive Dashboard component for Story 2.1
 * Implements comprehensive KPIs, trend analysis, variance alerts, and drill-down capabilities
 */
export const ExecutiveDashboard: FC<Props> = ({
  kpis,
  topCostCenters,
  varianceAlerts,
  selectedTimePeriod,
  onTimePeriodChange,
  onExportData,
  onDrillDown,
}) => {
  const [showAllAlerts, setShowAllAlerts] = useState(false);

  const costCenterColumns = [
    {
      key: 'department',
      label: 'Department',
      render: (row: TopCostCenter) => (
        <TextLink onClick={() => onDrillDown(row.department)}>
          {row.department}
        </TextLink>
      ),
    },
    {
      key: 'totalCost',
      label: 'Total Cost',
      render: (row: TopCostCenter) => `$${row.totalCost.toLocaleString()}`,
    },
    {
      key: 'percentage',
      label: '% of Total',
      render: (row: TopCostCenter) => `${row.percentage.toFixed(1)}%`,
    },
    {
      key: 'change',
      label: 'Change',
      render: (row: TopCostCenter) => (
        <span className={row.change >= 0 ? styles.positiveChange : styles.negativeChange}>
          {row.change >= 0 ? '+' : ''}{row.change.toFixed(1)}%
        </span>
      ),
    },
    {
      key: 'variance',
      label: 'Budget Status',
      render: (row: TopCostCenter) => (
        <span className={styles[row.variance]}>
          {row.variance === 'over' ? 'Over Budget' : 
           row.variance === 'under' ? 'Under Budget' : 
           'On Budget'}
        </span>
      ),
    },
  ];

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'info';
    }
  };

  return (
    <div className={styles.dashboard}>
      <PageHeader
        title="Executive Dashboard - Lease Cost Analytics"
        actions={[
          <Button key="export" variant="secondary" onClick={onExportData}>
            Export Data
          </Button>,
          <Button key="period" variant="outlined" onClick={() => {}}>
            {selectedTimePeriod}
          </Button>,
        ]}
      />

      {/* Variance Alerts Section */}
      {varianceAlerts.length > 0 && (
        <div className={styles.alertsSection}>
          <Typography variant="sectionHeading">Variance Alerts</Typography>
          <div className={styles.alerts}>
            {varianceAlerts.slice(0, showAllAlerts ? varianceAlerts.length : 3).map((alert) => (
              <Toast
                key={alert.id}
                color={getAlertColor(alert.severity) as any}
                message={alert.message}
                persistent
                onClose={() => {}}
              />
            ))}
            {varianceAlerts.length > 3 && (
              <Button
                variant="text"
                onClick={() => setShowAllAlerts(!showAllAlerts)}
              >
                {showAllAlerts ? 'Show Less' : `Show ${varianceAlerts.length - 3} More Alerts`}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* KPI Cards Section */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <Card.Header>
              <Typography variant="contentHeading">{kpi.label}</Typography>
            </Card.Header>
            <Card.Body>
              <div className={styles.kpiValue}>
                <Typography variant="displayLarge" as="div">
                  {kpi.value}
                </Typography>
                <div className={styles.kpiChange}>
                  <span className={kpi.themeColor ? styles[kpi.themeColor] : ''}>
                    {kpi.changeLabel}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Executive Summary Cards */}
      <div className={styles.summarySection}>
        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Key Insights</Typography>
          </Card.Header>
          <Card.Body>
            <div className={styles.insights}>
              <div className={styles.insight}>
                <Typography variant="controlLabel">Highest Variance</Typography>
                <Typography>Marketing Dept: +12.5% over budget</Typography>
              </div>
              <div className={styles.insight}>
                <Typography variant="controlLabel">Biggest Opportunity</Typography>
                <Typography>IT Consolidation: Potential $45K/month savings</Typography>
              </div>
              <div className={styles.insight}>
                <Typography variant="controlLabel">Upcoming Renewals</Typography>
                <Typography>5 leases expiring in Q2 2025</Typography>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Top Cost Centers DataGrid */}
      <div className={styles.dataGridSection}>
        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Top Cost Centers</Typography>
          </Card.Header>
          <Card.Body>
            <DataGrid
              data={topCostCenters}
              columns={costCenterColumns}
              pagination={{ pageSize: 10 }}
              sortable
              onRowClick={(row) => onDrillDown(row.department)}
            />
          </Card.Body>
        </Card>
      </div>

      {/* Trend Chart Placeholder */}
      <div className={styles.chartSection}>
        <Card>
          <Card.Header>
            <Typography variant="contentHeading">12-Month Cost Evolution</Typography>
          </Card.Header>
          <Card.Body>
            <div className={styles.chartPlaceholder}>
              <Typography variant="body">
                [Chart Component Integration Point]
                <br />
                Trend visualization showing 12-month cost evolution
                <br />
                Time period: {selectedTimePeriod}
              </Typography>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};