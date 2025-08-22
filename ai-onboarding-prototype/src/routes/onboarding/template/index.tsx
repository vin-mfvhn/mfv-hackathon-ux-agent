import {
  Button,
  Panel,
  Typography,
} from '@moneyforward/mfui-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DocumentTitle } from '../../../components/DocumentTitle';
import { Paths } from '../../../routes';
import styles from './styles.module.css';

export function Template() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'hr' | 'employee' | ''>('');

  const handleRoleSelection = (role: 'hr' | 'employee') => {
    setSelectedRole(role);
    
    // Auto-navigate with demo data
    if (role === 'hr') {
      navigate(Paths.HRDashboard, {
        state: { 
          employee: 'demo001',
          department: 'QA'
        }
      });
    } else {
      navigate(Paths.EmployeeDashboard, {
        state: { 
          employee: 'demo001',
          department: 'QA'
        }
      });
    }
  };

  return (
    <>
      <DocumentTitle title="AI Onboarding Tool" />
      <div className={styles.container}>
        <Panel>
          <div style={{ padding: '24px' }}>
            <Typography variant="pageHeading1">
              🤖 AI Onboarding Tool
            </Typography>
            <Typography variant="body" style={{ margin: '16px 0' }}>
              Transform onboarding from generic checklists to intelligent, personalized experiences
            </Typography>

            <div style={{ display: 'flex', gap: '16px', margin: '32px 0' }}>
              <Button
                priority={selectedRole === 'hr' ? 'primary' : 'secondary'}
                size="large"
                onClick={() => handleRoleSelection('hr')}
                style={{ flex: 1, minHeight: '120px' }}
              >
                👥 HR Manager
              </Button>
              
              <Button
                priority={selectedRole === 'employee' ? 'primary' : 'secondary'}
                size="large"
                onClick={() => handleRoleSelection('employee')}
                style={{ flex: 1, minHeight: '120px' }}
              >
                🎯 New Employee
              </Button>
            </div>

            <Panel style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f0f9ff' }}>
              <Typography variant="contentHeading">
                💡 Demo Features
              </Typography>
              <div style={{ marginTop: '8px' }}>
                <Typography variant="body">
                  ✅ Smart role-based checklist generation
                </Typography>
                <Typography variant="body">
                  ✅ Department-specific resource recommendations  
                </Typography>
                <Typography variant="body">
                  ✅ Intelligent buddy matching and stakeholder identification
                </Typography>
                <Typography variant="body">
                  ✅ Personalized welcome messages and priorities
                </Typography>
              </div>
            </Panel>
          </div>
        </Panel>
      </div>
    </>
  );
}