import { useState } from 'react';
import { DocumentTitle } from '../../components/DocumentTitle';
import { Button } from '@moneyforward/mfui-components';
import { Link } from 'react-router';
import { Paths } from '../../routes';
import styles from './template/styles.module.css';

// Types for allocation configuration
interface AllocationMethod {
  id: string;
  name: string;
  description: string;
}

interface DepartmentAllocation {
  id: string;
  name: string;
  sqftPercentage: number;
  headcountPercentage: number;
  revenuePercentage: number;
  customPercentage: number;
}

const allocationMethods: AllocationMethod[] = [
  { id: 'square_footage', name: 'Square Footage', description: 'Allocate based on occupied space' },
  { id: 'headcount', name: 'Headcount', description: 'Allocate based on number of employees' },
  { id: 'revenue', name: 'Revenue', description: 'Allocate based on department revenue' },
  { id: 'custom', name: 'Custom Formula', description: 'Combine multiple methods with weights' },
];

const mockDepartments: DepartmentAllocation[] = [
  { id: '1', name: 'Sales', sqftPercentage: 28, headcountPercentage: 25, revenuePercentage: 35, customPercentage: 29 },
  { id: '2', name: 'Engineering', sqftPercentage: 24, headcountPercentage: 30, revenuePercentage: 20, customPercentage: 25 },
  { id: '3', name: 'Marketing', sqftPercentage: 18, headcountPercentage: 15, revenuePercentage: 25, customPercentage: 19 },
  { id: '4', name: 'Operations', sqftPercentage: 15, headcountPercentage: 20, revenuePercentage: 10, customPercentage: 15 },
  { id: '5', name: 'HR', sqftPercentage: 15, headcountPercentage: 10, revenuePercentage: 10, customPercentage: 12 },
];

export function Component() {
  const [selectedMethod, setSelectedMethod] = useState('square_footage');
  const [departments, setDepartments] = useState(mockDepartments);
  const [customWeights, setCustomWeights] = useState({
    sqft: 60,
    headcount: 30,
    revenue: 10,
  });
  // Preview functionality removed for now

  const calculateTotalPercentage = (method: string) => {
    const key = `${method}Percentage` as keyof DepartmentAllocation;
    return departments.reduce((sum, dept) => sum + (dept[key] as number), 0);
  };

  const updateDepartmentPercentage = (deptId: string, method: string, value: number) => {
    setDepartments(prev => 
      prev.map(dept => 
        dept.id === deptId 
          ? { ...dept, [`${method}Percentage`]: Math.max(0, Math.min(100, value)) }
          : dept
      )
    );
  };

  const handleSaveConfiguration = () => {
    // In a real app, this would save to the backend
    alert('Configuration saved successfully!');
  };

  const getCurrentPercentages = () => {
    const methodKey = `${selectedMethod.replace('_', '')}Percentage` as keyof DepartmentAllocation;
    return departments.map(dept => ({
      name: dept.name,
      percentage: dept[methodKey] as number,
    }));
  };

  const totalPercentage = calculateTotalPercentage(selectedMethod.replace('_', ''));
  const isValidConfiguration = Math.abs(totalPercentage - 100) < 0.01;

  return (
    <div className={styles.allocationConfig}>
      <DocumentTitle title="Cost Allocation Configuration" baseTitle="Money Forward" />
      
      <div className={styles.header}>
        <h1 className={styles.title}>
          Cost Allocation Configuration
        </h1>
        <div className={styles.headerActions}>
          <Link to={Paths.DepartmentReporting.Dashboard}>
            <Button priority="secondary">Back to Dashboard</Button>
          </Link>
          <Button 
            priority="primary" 
            onClick={handleSaveConfiguration}
            disabled={!isValidConfiguration}
          >
            Save Configuration
          </Button>
        </div>
      </div>

      <div className={styles.configLayout}>
        {/* Method Selection */}
        <div className={styles.methodCard}>
          <h2 className={styles.sectionTitle}>
            Select Allocation Method
          </h2>
          <div className={styles.methodSelection}>
            {allocationMethods.map((method) => (
              <div key={method.id} className={styles.methodOption}>
                <label className={styles.methodLabel}>
                  <input
                    type="radio"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className={styles.methodRadio}
                  />
                  <div className={styles.methodContent}>
                    <div className={styles.methodName}>{method.name}</div>
                    <div className={styles.methodDescription}>{method.description}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {selectedMethod === 'custom' && (
            <div className={styles.customWeights}>
              <h3 className={styles.subsectionTitle}>Custom Formula Weights</h3>
              <div className={styles.weightInputs}>
                <div className={styles.weightInput}>
                  <label>Square Footage Weight</label>
                  <div className={styles.inputWithPercent}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customWeights.sqft}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomWeights(prev => ({ ...prev, sqft: parseInt(e.target.value) || 0 }))}
                      className={styles.numberInput}
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className={styles.weightInput}>
                  <label>Headcount Weight</label>
                  <div className={styles.inputWithPercent}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customWeights.headcount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomWeights(prev => ({ ...prev, headcount: parseInt(e.target.value) || 0 }))}
                      className={styles.numberInput}
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className={styles.weightInput}>
                  <label>Revenue Weight</label>
                  <div className={styles.inputWithPercent}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customWeights.revenue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomWeights(prev => ({ ...prev, revenue: parseInt(e.target.value) || 0 }))}
                      className={styles.numberInput}
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className={styles.weightTotal}>
                Total: {customWeights.sqft + customWeights.headcount + customWeights.revenue}%
                {customWeights.sqft + customWeights.headcount + customWeights.revenue !== 100 && (
                  <span className={styles.warning}> (Should equal 100%)</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Department Allocation Table */}
        <div className={styles.allocationTable}>
          <div className={styles.tableHeader}>
            <h2 className={styles.sectionTitle}>
              Department Allocation Percentages
            </h2>
            <div className={`${styles.totalIndicator} ${isValidConfiguration ? styles.valid : styles.invalid}`}>
              Total: {totalPercentage.toFixed(1)}%
              {!isValidConfiguration && <span className={styles.error}> (Must equal 100%)</span>}
            </div>
          </div>

          <div className={styles.allocationGrid}>
            <div className={styles.gridHeader}>
              <div>Department</div>
              <div>Allocation %</div>
              <div>Estimated Cost</div>
            </div>
            {departments.map((dept) => {
              const methodKey = `${selectedMethod.replace('_', '')}Percentage` as keyof DepartmentAllocation;
              const percentage = dept[methodKey] as number;
              const estimatedCost = (percentage / 100) * 2400000; // Mock total cost

              return (
                <div key={dept.id} className={styles.gridRow}>
                  <div className={styles.deptName}>{dept.name}</div>
                  <div className={styles.percentageInput}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={percentage}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        updateDepartmentPercentage(
                          dept.id, 
                          selectedMethod.replace('_', ''), 
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className={styles.numberInput}
                    />
                    <span>%</span>
                  </div>
                  <div className={styles.estimatedCost}>
                    ${estimatedCost.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview Section */}
        <div className={styles.previewCard}>
          <h2 className={styles.sectionTitle}>
            Allocation Preview
          </h2>
          <div className={styles.previewChart}>
            {getCurrentPercentages().map((item, index) => (
              <div key={index} className={styles.previewBar}>
                <div className={styles.previewLabel}>
                  {item.name}: {item.percentage.toFixed(1)}%
                </div>
                <div className={styles.previewBarContainer}>
                  <div 
                    className={styles.previewBarFill}
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: `hsl(${(index * 60) % 360}, 70%, 60%)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Component.displayName = 'AllocationConfiguration';