import { useState } from 'react';
import {
  Button,
  Checkbox,
} from '@moneyforward/mfui-components';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import { Paths } from '../../../../routes';
import styles from './styles.module.css';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'Day 1' | 'First 5 Days' | '2 Weeks' | '1-2 Months';
  dueDate: string;
  responsibleParty: string;
  status: 'pending' | 'completed';
  isRoleSpecific: boolean;
  completedAt?: string;
  priority: 'high' | 'medium' | 'low';
}

const EMPLOYEE_DATA = {
  name: 'Sarah Johnson',
  role: 'Engineer Grade 4',
  department: 'Tech Director Office',
  manager: 'James',
  startDate: '2025-09-01',
};

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Day 1 Items (some completed)
  { id: '1', title: 'Complete IT setup', description: 'Set up company laptop, email, and basic software access', category: 'Day 1', dueDate: '2025-09-01', responsibleParty: 'IT Team', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-01 09:30', priority: 'high' },
  { id: '2', title: 'Office badge and access card', description: 'Receive security badge and building access permissions', category: 'Day 1', dueDate: '2025-09-01', responsibleParty: 'Security', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-01 10:15', priority: 'high' },
  { id: '3', title: 'HR orientation session', description: 'Complete mandatory HR orientation and policy review', category: 'Day 1', dueDate: '2025-09-01', responsibleParty: 'HR', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-01 14:00', priority: 'high' },
  { id: '4', title: 'Manager introduction', description: 'Initial meeting with direct manager for role expectations', category: 'Day 1', dueDate: '2025-09-01', responsibleParty: 'James', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-01 16:00', priority: 'high' },
  { id: '5', title: 'Development environment setup', description: 'Configure development tools and access to repositories', category: 'Day 1', dueDate: '2025-09-01', responsibleParty: 'Tech Lead', status: 'completed', isRoleSpecific: true, completedAt: '2025-09-01 17:30', priority: 'high' },
  
  // First 5 Days Items (mostly completed)
  { id: '6', title: 'Team introduction meetings', description: 'Meet with immediate team members and key collaborators', category: 'First 5 Days', dueDate: '2025-09-05', responsibleParty: 'James', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-03 11:00', priority: 'medium' },
  { id: '7', title: 'Department overview session', description: 'Learn about department goals, processes, and structure', category: 'First 5 Days', dueDate: '2025-09-05', responsibleParty: 'James', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-04 14:30', priority: 'medium' },
  { id: '8', title: 'Company handbook review', description: 'Read and acknowledge company policies and procedures', category: 'First 5 Days', dueDate: '2025-09-05', responsibleParty: 'Sarah Johnson', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-05 16:00', priority: 'medium' },
  { id: '9', title: 'Code review process training', description: 'Learn code review standards and Git workflow', category: 'First 5 Days', dueDate: '2025-09-05', responsibleParty: 'Senior Engineer', status: 'completed', isRoleSpecific: true, completedAt: '2025-09-05 10:30', priority: 'high' },
  { id: '10', title: 'Architecture overview session', description: 'Understand system architecture and technical stack', category: 'First 5 Days', dueDate: '2025-09-05', responsibleParty: 'Architect', status: 'completed', isRoleSpecific: true, completedAt: '2025-09-05 15:00', priority: 'high' },
  
  // 2 Weeks Items (in progress)
  { id: '11', title: 'MFJ program enrollment', description: 'Complete MoneyForward Japan program registration', category: '2 Weeks', dueDate: '2025-09-15', responsibleParty: 'HR', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-12 13:00', priority: 'medium' },
  { id: '12', title: 'BO Director meeting', description: 'Introductory meeting with Business Operations Director', category: '2 Weeks', dueDate: '2025-09-15', responsibleParty: 'BO Director', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-14 09:00', priority: 'medium' },
  
  // 1-2 Months Items (current focus)
  { id: '13', title: 'Culture integration session', description: 'Deep dive into company culture and values alignment', category: '1-2 Months', dueDate: '2025-10-01', responsibleParty: 'HR', status: 'pending', isRoleSpecific: false, priority: 'medium' },
  { id: '14', title: 'Probation goal setting', description: 'Establish clear probation period objectives and metrics', category: '1-2 Months', dueDate: '2025-10-01', responsibleParty: 'James', status: 'completed', isRoleSpecific: false, completedAt: '2025-09-28 10:30', priority: 'high' },
  { id: '15', title: 'First project assignment', description: 'Begin working on initial development project', category: '1-2 Months', dueDate: '2025-10-15', responsibleParty: 'Tech Lead', status: 'pending', isRoleSpecific: true, priority: 'high' },
];

export function EmployeeDashboardTemplate() {
  const [items, setItems] = useState(CHECKLIST_ITEMS);
  
  const toggleItemCompletion = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            status: item.status === 'completed' ? 'pending' : 'completed',
            completedAt: item.status === 'completed' ? undefined : new Date().toISOString()
          }
        : item
    ));
  };

  const completedItems = items.filter(item => item.status === 'completed').length;
  const totalItems = items.length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  const getItemsByCategory = (category: string) => {
    return items.filter(item => item.category === category);
  };

  const getNextPriorityItems = () => {
    return items
      .filter(item => item.status === 'pending')
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, 3);
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return styles.priorityHigh;
      case 'medium': return styles.priorityMedium;
      case 'low': return styles.priorityLow;
      default: return styles.priorityLow;
    }
  };

  const getProgressClass = (percentage: number) => {
    if (percentage >= 80) return styles.progressHigh;
    if (percentage >= 50) return styles.progressMedium;
    return styles.progressLow;
  };

  return (
    <>
      <DocumentTitle title="My Onboarding Progress - Smart Onboarding Assistant" />
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1>Welcome to MoneyForward, {EMPLOYEE_DATA.name}!</h1>
            <p>Track your onboarding progress and stay on top of your tasks</p>
          </div>
        </header>
        
        <main className={styles.pageBody}>
          <div className={styles.contentContainer}>
            {/* Progress Overview */}
            <div className={styles.progressOverview}>
              <div className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <h2>Your Progress</h2>
                  <span className={getProgressClass(progressPercentage)}>
                    {progressPercentage}% Complete
                  </span>
                </div>
                <div className={styles.progressDetails}>
                  <span>{completedItems} of {totalItems} tasks completed</span>
                </div>
                <div className={styles.employeeInfo}>
                  <div>Role: <strong>{EMPLOYEE_DATA.role}</strong></div>
                  <div>Department: <strong>{EMPLOYEE_DATA.department}</strong></div>
                  <div>Manager: <strong>{EMPLOYEE_DATA.manager}</strong></div>
                  <div>Start Date: <strong>{new Date(EMPLOYEE_DATA.startDate).toLocaleDateString()}</strong></div>
                </div>
              </div>
            </div>

            {/* Next Priority Items */}
            <div className={styles.nextItems}>
              <h3>Next Priority Items</h3>
              <div className={styles.priorityItemsList}>
                {getNextPriorityItems().map(item => (
                  <div key={item.id} className={styles.priorityItem}>
                    <div className={styles.itemHeader}>
                      <Checkbox
                        checked={item.status === 'completed'}
                        onChange={() => toggleItemCompletion(item.id)}
                      />
                      <div className={styles.itemContent}>
                        <div className={styles.itemTitleRow}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          <span className={getPriorityClass(item.priority)}>
                            {item.priority}
                          </span>
                        </div>
                        <p className={styles.itemDescription}>{item.description}</p>
                        <div className={styles.itemFooter}>
                          <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                          <span>Responsible: {item.responsibleParty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <Button priority="primary">
                <a href={Paths.Onboarding.KeyPeople} className={styles.buttonLink}>
                  View Key People to Meet
                </a>
              </Button>
              <Button priority="secondary">
                <a href={Paths.Onboarding.Documents} className={styles.buttonLink}>
                  Access Documents
                </a>
              </Button>
              <Button priority="secondary">
                Schedule Manager Check-in
              </Button>
            </div>

            {/* Detailed Checklist by Category */}
            <div className={styles.checklistSections}>
              {/* 1-2 Months (Current Phase) */}
              <div className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <h3>1-2 Months Phase ({getItemsByCategory('1-2 Months').filter(i => i.status === 'completed').length}/{getItemsByCategory('1-2 Months').length} completed)</h3>
                  <span className={styles.currentPhaseLabel}>Current Phase</span>
                </div>
                <div className={styles.categoryItems}>
                  {getItemsByCategory('1-2 Months').map(item => (
                    <div key={item.id} className={`${styles.checklistItem} ${item.status === 'completed' ? styles.completed : ''}`}>
                      <div className={styles.itemHeader}>
                        <Checkbox
                          checked={item.status === 'completed'}
                          onChange={() => toggleItemCompletion(item.id)}
                        />
                        <div className={styles.itemContent}>
                          <div className={styles.itemTitleRow}>
                            <span className={styles.itemTitle}>{item.title}</span>
                            {item.isRoleSpecific && (
                              <span className={styles.roleSpecificLabel}>Role-specific</span>
                            )}
                          </div>
                          <p className={styles.itemDescription}>{item.description}</p>
                          <div className={styles.itemFooter}>
                            <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                            <span>Responsible: {item.responsibleParty}</span>
                            {item.completedAt && (
                              <span className={styles.completedAt}>
                                ✓ Completed: {new Date(item.completedAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Previous Phases (Collapsed) */}
              {['2 Weeks', 'First 5 Days', 'Day 1'].map(phase => (
                <details key={phase} className={styles.categorySection}>
                  <summary className={styles.categorySummary}>
                    <h3>{phase} Phase ({getItemsByCategory(phase as any).filter(i => i.status === 'completed').length}/{getItemsByCategory(phase as any).length} completed)</h3>
                    {getItemsByCategory(phase as any).every(i => i.status === 'completed') && (
                      <span className={styles.completeLabel}>✓ Complete</span>
                    )}
                  </summary>
                  <div className={styles.categoryItems}>
                    {getItemsByCategory(phase as any).map(item => (
                      <div key={item.id} className={`${styles.checklistItem} ${item.status === 'completed' ? styles.completed : ''}`}>
                        <div className={styles.itemHeader}>
                          <Checkbox
                            checked={item.status === 'completed'}
                            onChange={() => toggleItemCompletion(item.id)}
                          />
                          <div className={styles.itemContent}>
                            <div className={styles.itemTitleRow}>
                              <span className={styles.itemTitle}>{item.title}</span>
                              {item.isRoleSpecific && (
                                <span className={styles.roleSpecificLabel}>Role-specific</span>
                              )}
                            </div>
                            <p className={styles.itemDescription}>{item.description}</p>
                            <div className={styles.itemFooter}>
                              <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                              <span>Responsible: {item.responsibleParty}</span>
                              {item.completedAt && (
                                <span className={styles.completedAt}>
                                  ✓ Completed: {new Date(item.completedAt).toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}