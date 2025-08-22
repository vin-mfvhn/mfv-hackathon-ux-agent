import { useCallback, useState } from 'react';
import {
  Button,
  StatusLabel,
  TextBox,
} from '@moneyforward/mfui-components';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import styles from './styles.module.css';

interface OnboardingChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'Day 1' | 'First 5 Days' | '2 Weeks' | '1-2 Months';
  dueDate: string;
  responsibleParty: string;
  status: 'pending' | 'completed';
  isRoleSpecific: boolean;
}

const DEPARTMENTS = [
  { value: 'HRS', label: 'HRS (Human Resources Solutions)' },
  { value: 'AA', label: 'AA (Administrative Affairs)' },
  { value: 'Tech Director Office', label: 'Tech Director Office' },
  { value: 'QA', label: 'QA (Quality Assurance)' },
  { value: 'Corp IT', label: 'Corp IT (Corporate Information Technology)' },
  { value: 'Product', label: 'Product Development' },
];

const ROLES = [
  { value: 'Engineer Grade 3', label: 'Engineer Grade 3' },
  { value: 'Engineer Grade 4', label: 'Engineer Grade 4' },
  { value: 'Engineer Grade 5', label: 'Engineer Grade 5' },
  { value: 'Information Security Manager', label: 'Information Security Manager' },
  { value: 'Senior Accelerator', label: 'Senior Accelerator' },
  { value: 'Product Manager', label: 'Product Manager' },
];

const DEPARTMENT_MANAGERS = {
  'HRS': 'Charlie',
  'AA': 'Dave', 
  'Tech Director Office': 'James',
  'QA': 'Cherry',
  'Corp IT': 'Naomi',
  'Product': 'Ness',
} as const;

const STANDARD_CHECKLIST: Omit<OnboardingChecklistItem, 'id'>[] = [
  // Day 1 Items
  { title: 'Complete IT setup', description: 'Set up company laptop, email, and basic software access', category: 'Day 1', dueDate: 'Day 1', responsibleParty: 'IT Team', status: 'pending', isRoleSpecific: false },
  { title: 'Office badge and access card', description: 'Receive security badge and building access permissions', category: 'Day 1', dueDate: 'Day 1', responsibleParty: 'Security', status: 'pending', isRoleSpecific: false },
  { title: 'HR orientation session', description: 'Complete mandatory HR orientation and policy review', category: 'Day 1', dueDate: 'Day 1', responsibleParty: 'HR', status: 'pending', isRoleSpecific: false },
  { title: 'Manager introduction', description: 'Initial meeting with direct manager for role expectations', category: 'Day 1', dueDate: 'Day 1', responsibleParty: 'Manager', status: 'pending', isRoleSpecific: false },
  
  // First 5 Days Items
  { title: 'Team introduction meetings', description: 'Meet with immediate team members and key collaborators', category: 'First 5 Days', dueDate: 'Day 5', responsibleParty: 'Manager', status: 'pending', isRoleSpecific: false },
  { title: 'Department overview session', description: 'Learn about department goals, processes, and structure', category: 'First 5 Days', dueDate: 'Day 5', responsibleParty: 'Department Head', status: 'pending', isRoleSpecific: false },
  { title: 'Company handbook review', description: 'Read and acknowledge company policies and procedures', category: 'First 5 Days', dueDate: 'Day 5', responsibleParty: 'New Hire', status: 'pending', isRoleSpecific: false },
  
  // 2 Weeks Items  
  { title: 'MFJ program enrollment', description: 'Complete MoneyForward Japan program registration', category: '2 Weeks', dueDate: 'Week 2', responsibleParty: 'HR', status: 'pending', isRoleSpecific: false },
  { title: 'BO Director meeting', description: 'Introductory meeting with Business Operations Director', category: '2 Weeks', dueDate: 'Week 2', responsibleParty: 'BO Director', status: 'pending', isRoleSpecific: false },
  
  // 1-2 Months Items
  { title: 'Culture integration session', description: 'Deep dive into company culture and values alignment', category: '1-2 Months', dueDate: 'Month 1', responsibleParty: 'HR', status: 'pending', isRoleSpecific: false },
  { title: 'Probation goal setting', description: 'Establish clear probation period objectives and metrics', category: '1-2 Months', dueDate: 'Month 1', responsibleParty: 'Manager', status: 'pending', isRoleSpecific: false },
];

const ROLE_SPECIFIC_ITEMS: Record<string, Omit<OnboardingChecklistItem, 'id'>[]> = {
  'Engineer Grade 3': [
    { title: 'Development environment setup', description: 'Configure development tools and access to repositories', category: 'Day 1', dueDate: 'Day 1', responsibleParty: 'Tech Lead', status: 'pending', isRoleSpecific: true },
    { title: 'Code review process training', description: 'Learn code review standards and Git workflow', category: 'First 5 Days', dueDate: 'Day 5', responsibleParty: 'Senior Engineer', status: 'pending', isRoleSpecific: true },
    { title: 'Architecture overview session', description: 'Understand system architecture and technical stack', category: 'First 5 Days', dueDate: 'Day 5', responsibleParty: 'Architect', status: 'pending', isRoleSpecific: true },
  ],
  'Information Security Manager': [
    { title: 'Security tools access setup', description: 'Configure access to security monitoring and incident response tools', category: 'Day 1', dueDate: 'Day 1', responsibleParty: 'Security Admin', status: 'pending', isRoleSpecific: true },
    { title: 'Compliance framework review', description: 'Review current security policies and compliance requirements', category: 'First 5 Days', dueDate: 'Day 5', responsibleParty: 'Compliance Officer', status: 'pending', isRoleSpecific: true },
    { title: 'Security incident protocols', description: 'Learn incident response procedures and escalation paths', category: '2 Weeks', dueDate: 'Week 2', responsibleParty: 'Security Lead', status: 'pending', isRoleSpecific: true },
  ],
};

export function OnboardingGeneratorTemplate() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [checklist, setChecklist] = useState<OnboardingChecklistItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationTime, setGenerationTime] = useState<number | null>(null);

  const generateChecklist = useCallback(async () => {
    if (!selectedDepartment || !selectedRole || !employeeName) return;
    
    setIsGenerating(true);
    const startTime = Date.now();
    
    // Simulate AI generation delay (under 5 seconds as per requirements)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const standardItems = STANDARD_CHECKLIST.map((item, index) => ({
      ...item,
      id: `standard-${index}`,
      responsibleParty: item.responsibleParty === 'Manager' 
        ? DEPARTMENT_MANAGERS[selectedDepartment as keyof typeof DEPARTMENT_MANAGERS] || item.responsibleParty 
        : item.responsibleParty,
    }));
    
    const roleSpecificItems = (ROLE_SPECIFIC_ITEMS[selectedRole] || []).map((item, index) => ({
      ...item,
      id: `role-${index}`,
    }));
    
    const allItems = [...standardItems, ...roleSpecificItems];
    setChecklist(allItems);
    
    const endTime = Date.now();
    setGenerationTime((endTime - startTime) / 1000);
    setIsGenerating(false);
  }, [selectedDepartment, selectedRole, employeeName]);

  const getItemsByCategory = (category: string) => {
    return checklist.filter(item => item.category === category);
  };

  return (
    <>
      <DocumentTitle title="Onboarding Checklist Generator - Smart Onboarding Assistant" />
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1>Smart Onboarding Checklist Generator</h1>
            <p>Generate personalized onboarding checklists based on role and department</p>
          </div>
        </header>
        
        <main className={styles.pageBody}>
          <div className={styles.contentContainer}>
            {/* Input Form */}
            <div className={styles.generatorForm}>
              <div className={styles.formFields}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Employee Name *</label>
                  <TextBox
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Enter new hire's name"
                  />
                </div>
                
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Department *</label>
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className={styles.selectField}
                  >
                    <option value="">Select department</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Role *</label>
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className={styles.selectField}
                  >
                    <option value="">Select role</option>
                    {ROLES.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className={styles.actions}>
                <Button
                  priority="primary"
                  onClick={generateChecklist}
                  disabled={!selectedDepartment || !selectedRole || !employeeName || isGenerating}
                  loading={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Checklist'}
                </Button>
                
                {generationTime && (
                  <div className={styles.generationTime}>
                    ✓ Generated in {generationTime.toFixed(2)}s
                  </div>
                )}
              </div>
            </div>

            {/* Generated Checklist */}
            {checklist.length > 0 && (
              <div className={styles.checklistContainer}>
                <div className={styles.checklistHeader}>
                  <h2>Personalized Onboarding Checklist</h2>
                  <p>
                    For: <strong>{employeeName}</strong> | 
                    Department: <strong>{selectedDepartment}</strong> | 
                    Role: <strong>{selectedRole}</strong> |
                    Manager: <strong>{DEPARTMENT_MANAGERS[selectedDepartment as keyof typeof DEPARTMENT_MANAGERS]}</strong>
                  </p>
                </div>

                {/* Day 1 Items */}
                <div className={styles.categorySection}>
                  <h3>Day 1 ({getItemsByCategory('Day 1').length} items)</h3>
                  <div className={styles.itemsList}>
                    {getItemsByCategory('Day 1').map(item => (
                      <div key={item.id} className={styles.checklistItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          {item.isRoleSpecific && (
                            <span className={styles.roleSpecificLabel}>Role-specific</span>
                          )}
                        </div>
                        <p className={styles.itemDescription}>{item.description}</p>
                        <div className={styles.itemFooter}>
                          <span>Due: {item.dueDate}</span>
                          <span>Responsible: {item.responsibleParty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* First 5 Days Items */}
                <div className={styles.categorySection}>
                  <h3>First 5 Days ({getItemsByCategory('First 5 Days').length} items)</h3>
                  <div className={styles.itemsList}>
                    {getItemsByCategory('First 5 Days').map(item => (
                      <div key={item.id} className={styles.checklistItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          {item.isRoleSpecific && (
                            <span className={styles.roleSpecificLabel}>Role-specific</span>
                          )}
                        </div>
                        <p className={styles.itemDescription}>{item.description}</p>
                        <div className={styles.itemFooter}>
                          <span>Due: {item.dueDate}</span>
                          <span>Responsible: {item.responsibleParty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2 Weeks Items */}
                <div className={styles.categorySection}>
                  <h3>2 Weeks ({getItemsByCategory('2 Weeks').length} items)</h3>
                  <div className={styles.itemsList}>
                    {getItemsByCategory('2 Weeks').map(item => (
                      <div key={item.id} className={styles.checklistItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          {item.isRoleSpecific && (
                            <span className={styles.roleSpecificLabel}>Role-specific</span>
                          )}
                        </div>
                        <p className={styles.itemDescription}>{item.description}</p>
                        <div className={styles.itemFooter}>
                          <span>Due: {item.dueDate}</span>
                          <span>Responsible: {item.responsibleParty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1-2 Months Items */}
                <div className={styles.categorySection}>
                  <h3>1-2 Months ({getItemsByCategory('1-2 Months').length} items)</h3>
                  <div className={styles.itemsList}>
                    {getItemsByCategory('1-2 Months').map(item => (
                      <div key={item.id} className={styles.checklistItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          {item.isRoleSpecific && (
                            <span className={styles.roleSpecificLabel}>Role-specific</span>
                          )}
                        </div>
                        <p className={styles.itemDescription}>{item.description}</p>
                        <div className={styles.itemFooter}>
                          <span>Due: {item.dueDate}</span>
                          <span>Responsible: {item.responsibleParty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.checklistActions}>
                  <Button priority="primary">
                    Create Onboarding Plan
                  </Button>
                  <Button priority="secondary">
                    Export Checklist
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}