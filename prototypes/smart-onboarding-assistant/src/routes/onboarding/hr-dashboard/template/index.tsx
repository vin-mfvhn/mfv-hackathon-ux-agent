import { useState } from 'react';
import {
  Button,
  TextLink,
} from '@moneyforward/mfui-components';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import { Paths } from '../../../../routes';
import styles from './styles.module.css';

interface NewHire {
  id: string;
  name: string;
  department: string;
  role: string;
  manager: string;
  startDate: string;
  progress: {
    completed: number;
    total: number;
    percentage: number;
    status: 'on-track' | 'at-risk' | 'overdue';
  };
  currentPhase: 'Day 1' | 'First 5 Days' | '2 Weeks' | '1-2 Months' | 'Complete';
  overdueItems: number;
}

// Mock data for Sept-Oct 2025 cohort
const NEW_HIRES: NewHire[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    department: 'Tech Director Office',
    role: 'Engineer Grade 4',
    manager: 'James',
    startDate: '2025-09-01',
    progress: { completed: 15, total: 18, percentage: 83, status: 'on-track' },
    currentPhase: '1-2 Months',
    overdueItems: 0,
  },
  {
    id: '2',
    name: 'Michael Chen',
    department: 'HRS',
    role: 'Information Security Manager',
    manager: 'Charlie',
    startDate: '2025-09-15',
    progress: { completed: 8, total: 16, percentage: 50, status: 'at-risk' },
    currentPhase: '2 Weeks',
    overdueItems: 2,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    department: 'Product',
    role: 'Product Manager',
    manager: 'Ness',
    startDate: '2025-10-01',
    progress: { completed: 12, total: 15, percentage: 80, status: 'on-track' },
    currentPhase: 'First 5 Days',
    overdueItems: 0,
  },
  {
    id: '4',
    name: 'David Kim',
    department: 'QA',
    role: 'Engineer Grade 3',
    manager: 'Cherry',
    startDate: '2025-10-15',
    progress: { completed: 4, total: 14, percentage: 29, status: 'overdue' },
    currentPhase: 'Day 1',
    overdueItems: 3,
  },
  {
    id: '5',
    name: 'Lisa Wang',
    department: 'Corp IT',
    role: 'Senior Accelerator',
    manager: 'Naomi',
    startDate: '2025-09-08',
    progress: { completed: 17, total: 17, percentage: 100, status: 'on-track' },
    currentPhase: 'Complete',
    overdueItems: 0,
  },
];

const SUMMARY_STATS = {
  totalNewHires: NEW_HIRES.length,
  onTrack: NEW_HIRES.filter(h => h.progress.status === 'on-track').length,
  atRisk: NEW_HIRES.filter(h => h.progress.status === 'at-risk').length,
  overdue: NEW_HIRES.filter(h => h.progress.status === 'overdue').length,
  completed: NEW_HIRES.filter(h => h.currentPhase === 'Complete').length,
  averageProgress: Math.round(NEW_HIRES.reduce((sum, h) => sum + h.progress.percentage, 0) / NEW_HIRES.length),
};

function getStatusClass(status: string): string {
  switch (status) {
    case 'on-track': return styles.statusOnTrack;
    case 'at-risk': return styles.statusAtRisk;
    case 'overdue': return styles.statusOverdue;
    default: return styles.statusOnTrack;
  }
}

function getPhaseClass(phase: string): string {
  return phase === 'Complete' ? styles.phaseComplete : styles.phaseInProgress;
}

export function HRDashboardTemplate() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const renderNewHireRow = (newHire: NewHire) => (
    <tr key={newHire.id} className={styles.newHireRow}>
      <td className={styles.employeeCell}>
        <div className={styles.employeeInfo}>
          <TextLink to={`/onboarding/employee-dashboard?employee=${newHire.id}`}>
            {newHire.name}
          </TextLink>
          <span className={styles.subtext}>{newHire.role}</span>
        </div>
      </td>
      <td className={styles.departmentCell}>
        <div className={styles.departmentInfo}>
          <span>{newHire.department}</span>
          <span className={styles.subtext}>Manager: {newHire.manager}</span>
        </div>
      </td>
      <td>{new Date(newHire.startDate).toLocaleDateString()}</td>
      <td>
        <span className={getPhaseClass(newHire.currentPhase)}>
          {newHire.currentPhase}
        </span>
      </td>
      <td className={styles.progressCell}>
        <div className={styles.progressInfo}>
          <div className={styles.progressRow}>
            <span className={getStatusClass(newHire.progress.status)}>
              {newHire.progress.percentage}%
            </span>
            <span className={styles.progressDetails}>
              ({newHire.progress.completed}/{newHire.progress.total})
            </span>
          </div>
          {newHire.overdueItems > 0 && (
            <span className={styles.overdueText}>
              {newHire.overdueItems} overdue items
            </span>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <DocumentTitle title="HR Dashboard - Smart Onboarding Assistant" />
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1>HR Onboarding Dashboard</h1>
            <p>Monitor onboarding progress across all new hires (Sept-Oct 2025 Cohort)</p>
          </div>
        </header>
        
        <main className={styles.pageBody}>
          <div className={styles.contentContainer}>
            {/* Summary Statistics */}
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <div className={styles.summaryNumber}>{SUMMARY_STATS.totalNewHires}</div>
                <div className={styles.summaryLabel}>Total New Hires</div>
              </div>
              
              <div className={styles.summaryCard}>
                <div className={styles.summaryNumber}>{SUMMARY_STATS.completed}</div>
                <div className={styles.summaryLabel}>Completed</div>
                <div className={styles.summaryPercentage}>
                  {Math.round((SUMMARY_STATS.completed / SUMMARY_STATS.totalNewHires) * 100)}%
                </div>
              </div>
              
              <div className={styles.summaryCard}>
                <div className={styles.summaryNumber}>{SUMMARY_STATS.onTrack}</div>
                <div className={styles.summaryLabel}>On Track</div>
                <div className={styles.summaryPercentage}>
                  {Math.round((SUMMARY_STATS.onTrack / SUMMARY_STATS.totalNewHires) * 100)}%
                </div>
              </div>
              
              <div className={styles.summaryCard}>
                <div className={styles.summaryNumber}>{SUMMARY_STATS.atRisk}</div>
                <div className={styles.summaryLabel}>At Risk</div>
                {SUMMARY_STATS.atRisk > 0 && (
                  <div className={styles.summaryPercentage}>
                    {Math.round((SUMMARY_STATS.atRisk / SUMMARY_STATS.totalNewHires) * 100)}%
                  </div>
                )}
              </div>
              
              <div className={styles.summaryCard}>
                <div className={styles.summaryNumber}>{SUMMARY_STATS.overdue}</div>
                <div className={styles.summaryLabel}>Overdue</div>
                {SUMMARY_STATS.overdue > 0 && (
                  <div className={styles.summaryPercentage}>
                    {Math.round((SUMMARY_STATS.overdue / SUMMARY_STATS.totalNewHires) * 100)}%
                  </div>
                )}
              </div>
              
              <div className={styles.summaryCard}>
                <div className={styles.summaryNumber}>{SUMMARY_STATS.averageProgress}%</div>
                <div className={styles.summaryLabel}>Average Progress</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <Button priority="primary" to={Paths.Onboarding.Generator}>
                Generate New Checklist
              </Button>
              <Button priority="secondary">
                Export Report
              </Button>
              <Button priority="secondary">
                Send Reminders
              </Button>
            </div>

            {/* New Hires Table */}
            <div className={styles.tableContainer}>
              <h2>New Hire Progress Overview</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Start Date</th>
                    <th>Current Phase</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {NEW_HIRES.map(renderNewHireRow)}
                </tbody>
              </table>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <h3>Quick Actions</h3>
              <div className={styles.quickActionsContainer}>
                <Button priority="secondary" size="small">
                  View Overdue Items ({NEW_HIRES.reduce((sum, h) => sum + h.overdueItems, 0)})
                </Button>
                <Button priority="secondary" size="small">
                  Schedule Check-ins
                </Button>
                <Button priority="secondary" size="small">
                  Manager Reports
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}