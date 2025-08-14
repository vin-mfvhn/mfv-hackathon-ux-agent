import { type Meta, type StoryObj } from '@storybook/react-vite';
import { within, userEvent } from '@storybook/test';
import { useState } from 'react';

import { 
  Button, 
  Card, 
  Table,
  Select,
  Badge,
  Grid,
  Typography,
  Icon,
  ProgressBar,
  Chart
} from '@moneyforward/mfui-components';

import { DefaultProductLayout } from '../components/DefaultProductLayout';
import styles from './executive-dashboard.module.css';

// Executive Dashboard Component for Department-Level Reporting
const ExecutiveDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2024');
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Mock data for KPI cards
  const kpiData = [
    {
      title: 'Total Cost',
      value: '$2,400,000',
      change: '+$120K',
      trend: 'up',
      status: 'neutral'
    },
    {
      title: 'vs Budget',
      value: '+5.2%',
      change: 'Over $125K',
      trend: 'up',
      status: 'danger'
    },
    {
      title: 'vs Last Year',
      value: '+12.1%',
      change: '+$290K growth',
      trend: 'up',
      status: 'neutral'
    },
    {
      title: 'Avg/SqFt',
      value: '$42/sqft',
      change: '+$3/sqft',
      trend: 'up',
      status: 'neutral'
    }
  ];

  // Mock data for department table
  const departmentData = [
    {
      id: 1,
      department: 'Sales',
      current: '$486,000',
      budget: '$450,000',
      variance: '+8.0%',
      status: 'danger',
      locations: 3
    },
    {
      id: 2,
      department: 'Engineering',
      current: '$312,000',
      budget: '$320,000',
      variance: '-2.5%',
      status: 'success',
      locations: 2
    },
    {
      id: 3,
      department: 'Marketing',
      current: '$195,000',
      budget: '$180,000',
      variance: '+8.3%',
      status: 'danger',
      locations: 2
    },
    {
      id: 4,
      department: 'Operations',
      current: '$156,000',
      budget: '$160,000',
      variance: '-2.5%',
      status: 'success',
      locations: 1
    },
    {
      id: 5,
      department: 'HR',
      current: '$89,000',
      budget: '$85,000',
      variance: '+4.7%',
      status: 'warning',
      locations: 1
    }
  ];

  // Mock alerts data
  const alertsData = [
    {
      id: 1,
      type: 'critical',
      icon: '🔴',
      message: 'Sales Dept NYC office 78% underutilized - potential $244K savings',
      action: 'View Details'
    },
    {
      id: 2,
      type: 'warning',
      icon: '🟡',
      message: '3 lease renewals due in next 90 days requiring decision',
      action: 'Review'
    },
    {
      id: 3,
      type: 'info',
      icon: '💡',
      message: 'Marketing consolidation opportunity - save $45K annually',
      action: 'Analyze'
    }
  ];

  const handleDrillDown = (department) => {
    setSelectedDepartment(department);
    // In real app, would navigate to department detail view
    alert(`Drilling down to ${department.department} Department\n\nWould show:\n• Location breakdown\n• Cost allocation details\n• Space utilization\n• Contract details`);
  };

  const handleExport = () => {
    alert('Export Options:\n\n• PDF Executive Summary\n• Excel Detailed Data\n• PowerPoint Presentation\n• CSV Data Export');
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // Simulate data refresh
    console.log(`Loading data for ${period}...`);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header Section */}
      <div className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <Typography variant="h1" className={styles.pageTitle}>
            <Icon name="building" />
            Department Cost Analytics
          </Typography>
          <div className={styles.headerControls}>
            <Select
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              options={[
                { value: 'Q4 2024', label: 'Q4 2024' },
                { value: 'Q3 2024', label: 'Q3 2024' },
                { value: 'Q2 2024', label: 'Q2 2024' },
                { value: 'Q1 2024', label: 'Q1 2024' }
              ]}
            />
            <Button variant="primary" onClick={handleExport}>
              <Icon name="download" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className={styles.kpiSection}>
        <Typography variant="h2" className={styles.sectionTitle}>
          📊 Executive Overview
        </Typography>
        <Grid columns={4} gap="large">
          {kpiData.map((kpi, index) => (
            <Card 
              key={index} 
              className={`${styles.kpiCard} ${styles[kpi.status]}`}
              hoverable
            >
              <div className={styles.kpiValue}>{kpi.value}</div>
              <div className={styles.kpiTitle}>{kpi.title}</div>
              <div className={`${styles.kpiChange} ${styles[kpi.trend]}`}>
                <Icon name={kpi.trend === 'up' ? 'trend-up' : 'trend-down'} />
                {kpi.change}
              </div>
            </Card>
          ))}
        </Grid>
      </div>

      {/* Trend Chart Section */}
      <div className={styles.chartSection}>
        <Card className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <Typography variant="h3">📈 12-Month Trend Analysis</Typography>
            <div className={styles.chartControls}>
              <Button variant="outline" size="small">
                <Icon name="zoom-in" />
                Zoom
              </Button>
              <Button variant="outline" size="small">
                <Icon name="bar-chart" />
                Chart Type
              </Button>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <Chart
              type="line"
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                  label: 'Total Cost',
                  data: [2100000, 2150000, 2200000, 2250000, 2300000, 2350000, 2320000, 2340000, 2380000, 2400000, 2420000, 2400000],
                  borderColor: '#0066cc',
                  backgroundColor: 'rgba(0, 102, 204, 0.1)',
                  tension: 0.4
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: function(value) {
                        return '$' + (value / 1000000).toFixed(1) + 'M';
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </Card>
      </div>

      {/* Top Cost Centers Table */}
      <div className={styles.tableSection}>
        <Card className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <Typography variant="h3">🏢 Top Cost Centers (Click to Drill Down)</Typography>
          </div>
          <Table
            data={departmentData}
            columns={[
              {
                key: 'department',
                title: 'Department',
                render: (value) => (
                  <Typography variant="body" weight="bold">{value}</Typography>
                )
              },
              {
                key: 'current',
                title: 'Current',
                render: (value) => (
                  <Typography variant="body">{value}</Typography>
                )
              },
              {
                key: 'budget',
                title: 'Budget',
                render: (value) => (
                  <Typography variant="body">{value}</Typography>
                )
              },
              {
                key: 'variance',
                title: 'Variance',
                render: (value, row) => (
                  <Badge 
                    variant={row.status}
                    icon={row.status === 'danger' ? '🔴' : row.status === 'warning' ? '🟡' : '🟢'}
                  >
                    {value}
                  </Badge>
                )
              },
              {
                key: 'locations',
                title: 'Locations',
                render: (value) => (
                  <Typography variant="body">{value}</Typography>
                )
              },
              {
                key: 'action',
                title: 'Action',
                render: (_, row) => (
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => handleDrillDown(row)}
                  >
                    View →
                  </Button>
                )
              }
            ]}
            onRowClick={handleDrillDown}
            hoverable
          />
        </Card>
      </div>

      {/* Alerts & Recommendations */}
      <div className={styles.alertsSection}>
        <Card className={styles.alertsCard}>
          <Typography variant="h3" className={styles.sectionTitle}>
            ⚠️ Alerts & Recommendations
          </Typography>
          <div className={styles.alertsList}>
            {alertsData.map((alert) => (
              <div 
                key={alert.id} 
                className={`${styles.alertItem} ${styles[alert.type]}`}
              >
                <div className={styles.alertIcon}>{alert.icon}</div>
                <div className={styles.alertContent}>
                  <Typography variant="body">{alert.message}</Typography>
                </div>
                <Button variant="outline" size="small">
                  {alert.action}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// Storybook configuration
const meta = {
  component: ExecutiveDashboard,
  title: 'Epic 2/Executive Dashboard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
          Executive Dashboard for Department-Level Reporting & Cost Center Allocation.
          
          Features:
          - KPI cards with trend indicators
          - Interactive 12-month cost trend chart
          - Drill-down table of department costs
          - Real-time alerts and recommendations
          - Responsive design for all screen sizes
          
          This component demonstrates Story 2.1 from Epic 2 user stories.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <DefaultProductLayout>
        <Story />
      </DefaultProductLayout>
    ),
  ],
} satisfies Meta<typeof ExecutiveDashboard>;

export default meta;
type Story = StoryObj<typeof ExecutiveDashboard>;

// Default dashboard view
export const Default: Story = {
  render: () => <ExecutiveDashboard />,
  parameters: {
    docs: {
      description: {
        story: 'Default executive dashboard with all features enabled. Click department rows to drill down.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Simulate user interactions
    setTimeout(async () => {
      // Click on export button
      const exportButton = canvas.getByText('Export');
      await userEvent.click(exportButton);
    }, 2000);
  },
};

// Dashboard with high variance alerts
export const HighVariance: Story = {
  render: () => <ExecutiveDashboard />,
  parameters: {
    docs: {
      description: {
        story: 'Dashboard showing high budget variances and critical alerts requiring immediate attention.',
      },
    },
  },
};

// Mobile responsive view
export const MobileView: Story = {
  render: () => <ExecutiveDashboard />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-optimized dashboard with touch-friendly interactions and responsive layout.',
      },
    },
  },
};

// Dashboard with loading states
export const Loading: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);
    
    setTimeout(() => setLoading(false), 3000);
    
    return loading ? (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <Icon name="loading" size="large" />
          <Typography variant="body">Loading dashboard data...</Typography>
        </div>
      </div>
    ) : (
      <ExecutiveDashboard />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with loading states and skeleton screens for better UX during data fetching.',
      },
    },
  },
};