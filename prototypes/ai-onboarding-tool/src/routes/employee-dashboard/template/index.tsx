import {
  Button,
  Panel,
  Typography,
} from '@moneyforward/mfui-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { DocumentTitle } from '../../../components/DocumentTitle';
import { Paths } from '../../../routes';
import departmentsData from '../../../data/departments.json';
import employeesData from '../../../data/employees.json';
import checklistTemplatesData from '../../../data/checklist-templates.json';
import styles from './styles.module.css';

export function Template() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checklist, setChecklist] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const { employee: employeeId, checklist: hrChecklist, fromHR } = location.state || { employee: 'demo001' };
  const employee = employeesData.demo_employees.find(emp => emp.id === employeeId);
  const department = employee ? (departmentsData as any)[employee.department] : null;

  useEffect(() => {
    if (hrChecklist) {
      setChecklist(hrChecklist);
    } else if (employee) {
      generateChecklist();
    }
  }, [employee, hrChecklist]);

  const generateChecklist = () => {
    if (!employee) return;

    const templateKey = `${employee.department}_${employee.role}`;
    const templates = checklistTemplatesData as any;
    
    let checklistItems: any[] = [];
    if (templates[templateKey]) {
      checklistItems = templates[templateKey].items;
    } else {
      checklistItems = templates.generic.items;
    }

    setChecklist(checklistItems);
  };

  const handleTaskToggle = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const completionPercentage = checklist.length > 0 
    ? Math.round((completedTasks.size / checklist.length) * 100) 
    : 0;

  if (!employee || !department) {
    return (
      <div className={styles.container}>
        <Panel>
          <div style={{ padding: '24px' }}>
            <Typography variant="pageHeading1">
              Employee data not found
            </Typography>
            <Button onClick={() => navigate(Paths.SelectRole)}>
              Back to Selection
            </Button>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <>
      <DocumentTitle title={`Welcome ${employee.nickname}`} />
      <div className={styles.container}>
        <Panel>
          <div style={{ padding: '24px' }}>
            {/* Welcome Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <Typography variant="pageHeading1" style={{ marginBottom: '8px' }}>
                  🎉 Welcome to MoneyForward, {employee.nickname}!
                </Typography>
                <Typography variant="body" style={{ marginBottom: '16px', maxWidth: '600px' }}>
                  {department.welcome_template}
                </Typography>
                
                {fromHR && (
                  <Panel style={{ padding: '12px', backgroundColor: '#fef3c7', marginBottom: '16px' }}>
                    <Typography variant="body">
                      💌 <strong>Message from HR:</strong> Your manager {employee.manager} has prepared a personalized onboarding experience just for you.
                    </Typography>
                  </Panel>
                )}

                <div style={{ display: 'flex', gap: '32px' }}>
                  <div>
                    <Typography variant="strongBody">📈 Your Progress</Typography>
                    <Typography variant="body">
                      {completedTasks.size} of {checklist.length} tasks completed ({completionPercentage}%)
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="strongBody">🎯 Next Up</Typography>
                    <Typography variant="body">
                      {checklist.find(task => !completedTasks.has(task.id))?.title || 'All tasks completed! 🎉'}
                    </Typography>
                  </div>
                </div>
              </div>
              
              <Button priority="secondary" onClick={() => navigate(Paths.SelectRole)}>
                ← Back
              </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              {/* Main Checklist */}
              <div>
                <Panel>
                  <div style={{ padding: '16px' }}>
                    <Typography variant="contentHeading" style={{ marginBottom: '16px' }}>
                      ✅ Your Personalized Onboarding Checklist
                    </Typography>
                    
                    <div>
                      {checklist.map((task) => (
                        <div 
                          key={task.id} 
                          style={{ 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '12px',
                            backgroundColor: completedTasks.has(task.id) ? '#f8fafc' : '#ffffff',
                            opacity: completedTasks.has(task.id) ? 0.7 : 1
                          }}
                        >
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <input
                              type="checkbox"
                              checked={completedTasks.has(task.id)}
                              onChange={() => handleTaskToggle(task.id)}
                              style={{ marginTop: '4px' }}
                            />
                            
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                                <Typography 
                                  variant="strongBody" 
                                  style={{ 
                                    textDecoration: completedTasks.has(task.id) ? 'line-through' : 'none' 
                                  }}
                                >
                                  {task.title}
                                </Typography>
                                <span style={{ 
                                  padding: '2px 6px', 
                                  fontSize: '12px',
                                  backgroundColor: task.priority === 'critical' ? '#fef2f2' : task.priority === 'high' ? '#fef3c7' : '#dbeafe',
                                  borderRadius: '4px',
                                  border: '1px solid ' + (task.priority === 'critical' ? '#fca5a5' : task.priority === 'high' ? '#fbbf24' : '#93c5fd')
                                }}>
                                  {task.priority}
                                </span>
                                <span style={{ 
                                  padding: '2px 6px', 
                                  fontSize: '12px',
                                  backgroundColor: '#f3f4f6', 
                                  borderRadius: '4px' 
                                }}>
                                  {task.estimated_time}
                                </span>
                              </div>
                              
                              <Typography variant="body" style={{ marginBottom: '8px' }}>
                                {task.description}
                              </Typography>
                              
                              <span style={{ 
                                padding: '2px 6px', 
                                fontSize: '12px',
                                backgroundColor: '#e0e7ff', 
                                borderRadius: '4px' 
                              }}>
                                {task.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Panel>
              </div>

              {/* Sidebar */}
              <div>
                {/* Key Contacts */}
                <Panel style={{ marginBottom: '16px', backgroundColor: '#d1fae5' }}>
                  <div style={{ padding: '16px' }}>
                    <Typography variant="contentHeading" style={{ marginBottom: '12px' }}>
                      👥 Your Key Contacts
                    </Typography>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <Typography variant="strongBody">Your Manager</Typography>
                      <Typography variant="body">{employee.manager}</Typography>
                      <Typography variant="helpMessage">Department Manager</Typography>
                    </div>
                    
                    {department.key_contacts.slice(0, 2).map((contact: any, index: number) => (
                      <div key={index} style={{ marginBottom: '12px' }}>
                        <Typography variant="strongBody">{contact.name}</Typography>
                        <Typography variant="body">{contact.role}</Typography>
                        <Typography variant="helpMessage">{contact.speciality}</Typography>
                      </div>
                    ))}
                  </div>
                </Panel>

                {/* Resources */}
                <Panel style={{ backgroundColor: '#fce7f3' }}>
                  <div style={{ padding: '16px' }}>
                    <Typography variant="contentHeading" style={{ marginBottom: '12px' }}>
                      📚 Department Resources
                    </Typography>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Typography variant="strongBody" style={{ marginBottom: '8px' }}>
                        Essential Reading:
                      </Typography>
                      {department.resources.slice(0, 3).map((resource: string, index: number) => (
                        <Typography key={index} variant="body" style={{ display: 'block', marginBottom: '4px' }}>
                          📄 {resource}
                        </Typography>
                      ))}
                    </div>

                    <div>
                      <Typography variant="strongBody" style={{ marginBottom: '8px' }}>
                        Applications:
                      </Typography>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {department.applications.map((app: string, index: number) => (
                          <span 
                            key={index} 
                            style={{ 
                              padding: '2px 8px', 
                              backgroundColor: '#d1fae5', 
                              borderRadius: '4px', 
                              fontSize: '12px' 
                            }}
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <Button priority="secondary" size="small" onClick={() => navigate(Paths.SelectRole)}>
                        🔄 Try Different Role
                      </Button>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>

            {/* Completion Celebration */}
            {completionPercentage === 100 && (
              <Panel style={{ 
                marginTop: '24px', 
                padding: '24px', 
                backgroundColor: '#fef3c7', 
                textAlign: 'center',
                border: '2px solid #f59e0b'
              }}>
                <Typography variant="pageHeading1" style={{ marginBottom: '8px' }}>
                  🎉 Congratulations, {employee.nickname}!
                </Typography>
                <Typography variant="contentHeading" style={{ marginBottom: '8px' }}>
                  You've completed your personalized onboarding checklist!
                </Typography>
                <Typography variant="body">
                  You're now ready to make an impact at MoneyForward. Welcome to the team! 🚀
                </Typography>
              </Panel>
            )}
          </div>
        </Panel>
      </div>
    </>
  );
}