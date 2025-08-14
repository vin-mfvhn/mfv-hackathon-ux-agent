import {
  Button,
  Card,
  DataGrid,
  PageHeader,
  ProgressBar,
  Switch,
  Toast,
  Typography,
} from '@moneyforward/mfui-components';
import { type FC, useState } from 'react';
import type { SystemHealth, PerformanceTarget } from '../../../utils/performanceMonitor';
import styles from './system-health-dashboard.module.css';

interface Props {
  systemHealth: SystemHealth;
  performanceTargets: PerformanceTarget[];
  recommendations: string[];
  lastUpdated: Date;
  isAutoRefresh: boolean;
  onRefresh: () => void;
  onToggleAutoRefresh: () => void;
  onExportMetrics: () => void;
  onOptimizeSystem: () => void;
}

/**
 * System Health Dashboard - Story 2.7 Implementation
 * Performance monitoring interface for 500+ concurrent user support
 */
export const SystemHealthDashboard: FC<Props> = ({
  systemHealth,
  performanceTargets,
  recommendations,
  lastUpdated,
  isAutoRefresh,
  onRefresh,
  onToggleAutoRefresh,
  onExportMetrics,
  onOptimizeSystem,
}) => {
  const [showAllTargets, setShowAllTargets] = useState(false);
  const [alertsVisible, setAlertsVisible] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'met':
        return 'success';
      case 'warning':
        return 'warning';
      case 'critical':
      case 'exceeded':
        return 'error';
      default:
        return 'info';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'met':
        return '✓';
      case 'warning':
        return '⚠';
      case 'critical':
      case 'exceeded':
        return '✗';
      default:
        return '•';
    }
  };

  const targetColumns = [
    {
      key: 'name',
      label: 'Performance Target',
      render: (row: PerformanceTarget) => row.name,
    },
    {
      key: 'current',
      label: 'Current',
      render: (row: PerformanceTarget) => `${row.current.toLocaleString()} ${row.unit}`,
    },
    {
      key: 'target',
      label: 'Target',
      render: (row: PerformanceTarget) => `${row.target.toLocaleString()} ${row.unit}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: PerformanceTarget) => (
        <div className={`${styles.statusBadge} ${styles[getStatusColor(row.status)]}`}>
          <span className={styles.statusIcon}>{getStatusIcon(row.status)}</span>
          <span className={styles.statusText}>{row.status}</span>
        </div>
      ),
    },
    {
      key: 'variance',
      label: 'Variance',
      render: (row: PerformanceTarget) => {
        const variance = ((row.current - row.target) / row.target) * 100;
        const isPositiveGood = row.name === 'System Uptime';
        const color = variance === 0 ? 'neutral' : 
                     (variance > 0 && !isPositiveGood) || (variance < 0 && isPositiveGood) ? 'error' : 'success';
        return (
          <span className={styles[color]}>
            {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
          </span>
        );
      },
    },
  ];

  const criticalTargets = performanceTargets.filter(t => t.status === 'exceeded');
  const warningTargets = performanceTargets.filter(t => t.status === 'warning');

  return (
    <div className={styles.healthDashboard}>
      <PageHeader
        title="System Health Dashboard"
        subtitle="Performance monitoring for 500+ concurrent users (Story 2.7)"
        actions={[
          <div key="auto-refresh" className={styles.autoRefreshControl}>
            <Typography variant="controlLabel">Auto Refresh</Typography>
            <Switch
              checked={isAutoRefresh}
              onChange={onToggleAutoRefresh}
            />
          </div>,
          <Button key="export" variant="secondary" onClick={onExportMetrics}>
            Export Metrics
          </Button>,
          <Button key="refresh" variant="outlined" onClick={onRefresh}>
            Refresh Now
          </Button>,
          <Button 
            key="optimize" 
            variant="primary"
            onClick={onOptimizeSystem}
            disabled={systemHealth.status === 'healthy'}
          >
            Optimize System
          </Button>,
        ]}
      />

      {/* System Status Overview */}
      <div className={styles.statusOverview}>
        <Card>
          <Card.Header>
            <div className={styles.statusHeader}>
              <Typography variant="contentHeading">System Status</Typography>
              <div className={`${styles.statusIndicator} ${styles[getStatusColor(systemHealth.status)]}`}>
                {systemHealth.status.toUpperCase()}
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <Typography variant="controlLabel">Active Users</Typography>
                <div className={styles.metricValue}>
                  <Typography variant="displayLarge" as="div">
                    {systemHealth.activeUsers}
                  </Typography>
                  <Typography variant="body" className={styles.metricTarget}>
                    Target: ≤ 500 users
                  </Typography>
                </div>
                <ProgressBar
                  value={systemHealth.activeUsers}
                  max={500}
                  color={systemHealth.activeUsers > 500 ? 'error' : 'success'}
                />
              </div>

              <div className={styles.metricCard}>
                <Typography variant="controlLabel">Error Rate</Typography>
                <div className={styles.metricValue}>
                  <Typography 
                    variant="displayLarge" 
                    as="div"
                    className={styles[systemHealth.errorRate > 0.1 ? 'error' : 'success']}
                  >
                    {systemHealth.errorRate.toFixed(2)}%
                  </Typography>
                  <Typography variant="body" className={styles.metricTarget}>
                    Target: ≤ 0.1%
                  </Typography>
                </div>
                <ProgressBar
                  value={systemHealth.errorRate}
                  max={1}
                  color={systemHealth.errorRate > 0.1 ? 'error' : 'success'}
                />
              </div>

              <div className={styles.metricCard}>
                <Typography variant="controlLabel">Memory Usage</Typography>
                <div className={styles.metricValue}>
                  <Typography variant="displayLarge" as="div">
                    {systemHealth.memoryUsage.toFixed(1)} MB
                  </Typography>
                  <Typography variant="body" className={styles.metricTarget}>
                    Monitoring for optimization
                  </Typography>
                </div>
                <ProgressBar
                  value={systemHealth.memoryUsage}
                  max={1000}
                  color={systemHealth.memoryUsage > 800 ? 'warning' : 'success'}
                />
              </div>

              <div className={styles.metricCard}>
                <Typography variant="controlLabel">Network Latency</Typography>
                <div className={styles.metricValue}>
                  <Typography variant="displayLarge" as="div">
                    {systemHealth.networkLatency.toFixed(0)} ms
                  </Typography>
                  <Typography variant="body" className={styles.metricTarget}>
                    Monitoring for performance
                  </Typography>
                </div>
                <ProgressBar
                  value={systemHealth.networkLatency}
                  max={1000}
                  color={systemHealth.networkLatency > 500 ? 'warning' : 'success'}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Critical Alerts */}
      {(criticalTargets.length > 0 || warningTargets.length > 0) && alertsVisible && (
        <div className={styles.alertsSection}>
          <Card>
            <Card.Header>
              <div className={styles.alertsHeader}>
                <Typography variant="contentHeading">Performance Alerts</Typography>
                <Button 
                  variant="text" 
                  onClick={() => setAlertsVisible(false)}
                  size="small"
                >
                  Dismiss
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className={styles.alerts}>
                {criticalTargets.map((target) => (
                  <Toast
                    key={target.name}
                    color="error"
                    message={`CRITICAL: ${target.name} is ${target.current} ${target.unit} (target: ${target.target} ${target.unit})`}
                    persistent
                    onClose={() => {}}
                  />
                ))}
                {warningTargets.map((target) => (
                  <Toast
                    key={target.name}
                    color="warning"
                    message={`WARNING: ${target.name} is ${target.current} ${target.unit} (target: ${target.target} ${target.unit})`}
                    persistent
                    onClose={() => {}}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Performance Targets */}
      <div className={styles.targetsSection}>
        <Card>
          <Card.Header>
            <div className={styles.targetsHeader}>
              <Typography variant="contentHeading">Performance Targets</Typography>
              <Button 
                variant="text"
                onClick={() => setShowAllTargets(!showAllTargets)}
              >
                {showAllTargets ? 'Show Key Metrics' : 'Show All Targets'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <DataGrid
              data={showAllTargets ? performanceTargets : performanceTargets.slice(0, 5)}
              columns={targetColumns}
              pagination={false}
              sortable
            />
          </Card.Body>
        </Card>
      </div>

      {/* Optimization Recommendations */}
      {recommendations.length > 0 && (
        <div className={styles.recommendationsSection}>
          <Card>
            <Card.Header>
              <Typography variant="contentHeading">Optimization Recommendations</Typography>
            </Card.Header>
            <Card.Body>
              <div className={styles.recommendations}>
                {recommendations.map((recommendation, index) => (
                  <div key={index} className={styles.recommendation}>
                    <div className={styles.recommendationIcon}>💡</div>
                    <Typography variant="body">{recommendation}</Typography>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Last Updated Info */}
      <div className={styles.updateInfo}>
        <Typography variant="body" className={styles.updateText}>
          Last updated: {lastUpdated.toLocaleString()}
          {isAutoRefresh && (
            <span className={styles.autoRefreshIndicator}> • Auto-refresh enabled</span>
          )}
        </Typography>
      </div>
    </div>
  );
};