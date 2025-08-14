import { DocumentTitle } from '../../components/DocumentTitle';
import { Button } from '@moneyforward/mfui-components';
import { Link } from 'react-router';
import { Paths } from '../../routes';
import styles from './template/styles.module.css';

// Mock data based on PRD use case scenarios
const mockDashboardData = {
  totalLeaseCosts: 2400000,
  budgetVariance: 5.2,
  costPerSqFt: 42.50,
  departmentCount: 8,
  topDepartments: [
    { id: 1, name: 'Sales', cost: 580000, variance: 8.0, sqft: 12000, utilization: 78 },
    { id: 2, name: 'Engineering', cost: 420000, variance: 2.1, sqft: 10500, utilization: 82 },
    { id: 3, name: 'Marketing', cost: 350000, variance: 15.0, sqft: 8500, utilization: 65 },
    { id: 4, name: 'Operations', cost: 280000, variance: -2.5, sqft: 7200, utilization: 90 },
    { id: 5, name: 'HR', cost: 180000, variance: 1.8, sqft: 4800, utilization: 75 },
  ],
  recentAllocations: [
    { date: '2024-08-13', type: 'Monthly Allocation', status: 'Complete', duration: '28s' },
    { date: '2024-08-01', type: 'Configuration Update', status: 'Complete', duration: '12s' },
    { date: '2024-07-31', type: 'Monthly Allocation', status: 'Complete', duration: '31s' },
  ],
};

export function Component() {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  const formatPercentage = (value: number) => 
    `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return styles.varianceHigh;
    if (variance > 0) return styles.varianceMedium;
    return styles.varianceLow;
  };

  return (
    <div className={styles.departmentDashboard}>
      <DocumentTitle title="Department-Level Reporting Dashboard" baseTitle="Money Forward" />
      
      <div className={styles.header}>
        <h1 className={styles.title}>
          Department-Level Reporting Dashboard
        </h1>
        <div className={styles.headerActions}>
          <Link to={Paths.DepartmentReporting.AllocationConfig}>
            <Button priority="primary">Configure Allocation</Button>
          </Link>
          <Link to={Paths.DepartmentReporting.Reports}>
            <Button priority="secondary">Generate Reports</Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className={styles.kpiSection}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiContent}>
            <div className={styles.kpiLabel}>Total Lease Costs</div>
            <div className={styles.kpiValue}>{formatCurrency(mockDashboardData.totalLeaseCosts)}</div>
            <div className={`${styles.kpiVariance} ${getVarianceColor(mockDashboardData.budgetVariance)}`}>
              {formatPercentage(mockDashboardData.budgetVariance)} vs Budget
            </div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiContent}>
            <div className={styles.kpiLabel}>Cost per Sq Ft</div>
            <div className={styles.kpiValue}>${mockDashboardData.costPerSqFt}</div>
            <div className={styles.kpiSubtext}>Average across all locations</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiContent}>
            <div className={styles.kpiLabel}>Departments</div>
            <div className={styles.kpiValue}>{mockDashboardData.departmentCount}</div>
            <div className={styles.kpiSubtext}>Active cost centers</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiContent}>
            <div className={styles.kpiLabel}>Last Allocation</div>
            <div className={styles.kpiValue}>28s</div>
            <div className={styles.kpiSubtext}>Completed Aug 13</div>
          </div>
        </div>
      </div>

      {/* Top Departments Summary */}
      <div className={styles.contentSection}>
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            Top Cost Centers
          </h2>
          <div className={styles.departmentTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Department</div>
              <div className={styles.headerCell}>Total Cost</div>
              <div className={styles.headerCell}>Budget Variance</div>
              <div className={styles.headerCell}>Square Feet</div>
              <div className={styles.headerCell}>Utilization</div>
              <div className={styles.headerCell}>Actions</div>
            </div>
            {mockDashboardData.topDepartments.map((dept) => (
              <div key={dept.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <strong>{dept.name}</strong>
                </div>
                <div className={styles.tableCell}>
                  {formatCurrency(dept.cost)}
                </div>
                <div className={`${styles.tableCell} ${getVarianceColor(dept.variance)}`}>
                  {formatPercentage(dept.variance)}
                </div>
                <div className={styles.tableCell}>
                  {dept.sqft.toLocaleString()} sq ft
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.utilizationBar}>
                    <div 
                      className={styles.utilizationFill}
                      style={{ width: `${dept.utilization}%` }}
                    />
                    <span className={styles.utilizationText}>{dept.utilization}%</span>
                  </div>
                </div>
                <div className={styles.tableCell}>
                  <Link to={Paths.DepartmentReporting.DepartmentDetail.replace(':departmentId', dept.id.toString())}>
                    <Button priority="tertiary" size="small">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.contentSection}>
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            Recent Allocation Activity
          </h2>
          <div className={styles.activityList}>
            {mockDashboardData.recentAllocations.map((allocation, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={styles.activityDate}>{allocation.date}</div>
                <div className={styles.activityType}>{allocation.type}</div>
                <div className={`${styles.activityStatus} ${styles.statusComplete}`}>
                  {allocation.status}
                </div>
                <div className={styles.activityDuration}>{allocation.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Component.displayName = 'DepartmentReportingDashboard';