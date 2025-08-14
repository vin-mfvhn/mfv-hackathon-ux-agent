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
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedChecklist, setGeneratedChecklist] = useState<any[]>([]);

  const { employee: employeeId } = location.state || { employee: 'demo001' };
  const employee = employeesData.demo_employees.find(emp => emp.id === employeeId);
  const department = employee ? (departmentsData as any)[employee.department] : null;

  useEffect(() => {
    if (employee) {
      generatePersonalizedChecklist();
    }
  }, [employee]);

  const generatePersonalizedChecklist = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const templateKey = `${employee?.department}_${employee?.role}`;
    const templates = checklistTemplatesData as any;
    
    let checklist: any[] = [];
    if (templates[templateKey]) {
      checklist = templates[templateKey].items;
    } else {
      checklist = templates.generic.items;
    }

    setGeneratedChecklist(checklist);
    setIsGenerating(false);
  };

  const handleSendToEmployee = () => {
    navigate(Paths.EmployeeDashboard, {
      state: { 
        employee: employeeId,
        checklist: generatedChecklist,
        fromHR: true
      }
    });
  };

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
      <DocumentTitle title="HR Dashboard" />
      <div className={styles.container}>
        <Panel>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Typography variant="pageHeading1">
                👥 HR Manager Dashboard
              </Typography>
              <Button priority="secondary" onClick={() => navigate(Paths.SelectRole)}>
                ← Back
              </Button>
            </div>

            <Typography variant="body" style={{ marginBottom: '24px' }}>
              Generate personalized onboarding experience for {employee.fullname}
            </Typography>

            {/* Employee Info */}
            <Panel style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#dbeafe' }}>
              <Typography variant="contentHeading" style={{ marginBottom: '16px' }}>
                📋 New Hire Information
              </Typography>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <Typography variant="strongBody">
                    {employee.fullname} ({employee.nickname})
                  </Typography>
                  <Typography variant="body">
                    Position: {employee.position}
                  </Typography>
                  <Typography variant="body">
                    Department: {employee.department} - {department.name}
                  </Typography>
                  <Typography variant="body">
                    Manager: {employee.manager}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body">
                    Experience: {employee.previous_experience}
                  </Typography>
                  <Typography variant="body">
                    Traits: {employee.personality_traits.join(', ')}
                  </Typography>
                </div>
              </div>
            </Panel>

            {/* AI Generation Status */}
            {isGenerating && (
              <Panel style={{ marginBottom: '24px', padding: '24px', backgroundColor: '#fef3c7', textAlign: 'center' }}>
                <Typography variant="contentHeading">
                  🤖 AI is generating personalized onboarding...
                </Typography>
                <div style={{ marginTop: '16px' }}>
                  <Typography variant="body">
                    ✨ Analyzing role requirements and department context
                  </Typography>
                  <Typography variant="body">
                    🎯 Customizing checklist based on experience level
                  </Typography>
                  <Typography variant="body">
                    🔗 Matching with relevant contacts and resources
                  </Typography>
                </div>
              </Panel>
            )}

            {/* Generated Checklist */}
            {generatedChecklist.length > 0 && (
              <Panel style={{ marginBottom: '24px' }}>
                <div style={{ padding: '16px' }}>
                  <Typography variant="contentHeading" style={{ marginBottom: '16px' }}>
                    ✨ AI-Generated Personalized Onboarding Checklist
                  </Typography>
                  
                  <Typography variant="body" style={{ marginBottom: '16px' }}>
                    {generatedChecklist.length} personalized tasks generated for {employee.position} in {department.name}
                  </Typography>

                  <div style={{ marginBottom: '16px' }}>
                    {generatedChecklist.slice(0, 5).map((item) => (
                      <div key={item.id} style={{ 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px', 
                        padding: '16px', 
                        marginBottom: '8px',
                        backgroundColor: '#f9fafb'
                      }}>
                        <Typography variant="strongBody" style={{ display: 'block', marginBottom: '4px' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body" style={{ marginBottom: '8px' }}>
                          {item.description}
                        </Typography>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '14px' }}>
                          <span style={{ 
                            padding: '2px 8px', 
                            backgroundColor: item.priority === 'critical' ? '#fef2f2' : item.priority === 'high' ? '#fef3c7' : '#dbeafe',
                            borderRadius: '4px',
                            border: '1px solid ' + (item.priority === 'critical' ? '#fca5a5' : item.priority === 'high' ? '#fbbf24' : '#93c5fd')
                          }}>
                            {item.priority.toUpperCase()}
                          </span>
                          <span style={{ padding: '2px 8px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                            {item.estimated_time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    gap: '16px', 
                    justifyContent: 'center',
                    paddingTop: '24px',
                    borderTop: '1px solid #e5e7eb'
                  }}>
                    <Button priority="primary" size="large" onClick={handleSendToEmployee}>
                      📤 Send to {employee.nickname}
                    </Button>
                    <Button priority="secondary" onClick={generatePersonalizedChecklist}>
                      🔄 Regenerate
                    </Button>
                  </div>
                </div>
              </Panel>
            )}
          </div>
        </Panel>
      </div>
    </>
  );
}