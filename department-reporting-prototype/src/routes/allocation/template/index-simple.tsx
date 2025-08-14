import {
  Typography,
  VStack,
  HStack,
  Button,
} from '@moneyforward/mfui-components';
import { type FC, useState } from 'react';
import styles from './styles.module.css';

type Props = {
  currentConfig: any;
  availableMethods: any[];
  departments: any[];
  previewData: any;
  auditTrail: any[];
};

/**
 * Simplified Allocation Configuration Template
 */
export const Template: FC<Props> = ({
  currentConfig,
  availableMethods,
  departments,
  previewData,
  auditTrail,
}) => {
  const [selectedMethod, setSelectedMethod] = useState(currentConfig.allocationMethod);
  const [showPreview, setShowPreview] = useState(false);

  const formatCurrency = (amount: number): string => {
    return `$${amount?.toLocaleString()}`;
  };

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  const currentMethodData = availableMethods?.find(m => m.id === selectedMethod);

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <Typography as="h1" variant="pageHeading1">
            Allocation Configuration
          </Typography>
          <Typography variant="body" className={styles.subtitle}>
            Configure automated cost allocation rules with real-time preview
          </Typography>
        </div>
        <HStack gap={12}>
          <Button 
            priority="secondary" 
            onClick={() => setShowPreview(true)}
          >
            Preview Changes
          </Button>
          <Button priority="primary">
            Save Configuration
          </Button>
        </HStack>
      </div>

      <VStack gap={24}>
        {/* Current Status */}
        <div className={styles.statusCard}>
          <Typography variant="contentHeading">Current Configuration</Typography>
          <Typography variant="body">
            Active method: <strong>{currentMethodData?.name}</strong>
          </Typography>
          <Typography variant="controlLabel">
            Last updated: {formatDateTime(currentConfig.lastUpdated)} by {currentConfig.updatedBy}
          </Typography>
        </div>

        {/* Method Selection */}
        <div className={styles.methodSection}>
          <Typography variant="sectionHeading1">Allocation Method</Typography>
          
          <div className={styles.methodGrid}>
            {availableMethods?.map((method: any) => (
              <div 
                key={method.id}
                className={`${styles.methodCard} ${selectedMethod === method.id ? styles.methodActive : ''}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <VStack gap={8}>
                  <Typography variant="contentHeading">{method.name}</Typography>
                  <Typography variant="body">{method.description}</Typography>
                  <div className={styles.formula}>
                    <Typography variant="controlLabel">Formula:</Typography>
                    <Typography variant="controlLabel" className={styles.formulaText}>
                      {method.formula}
                    </Typography>
                  </div>
                </VStack>
              </div>
            ))}
          </div>
        </div>

        {/* Department Data */}
        <div>
          <Typography variant="sectionHeading1">Department Data</Typography>
          <div className={styles.departmentGrid}>
            {departments?.map((dept: any) => (
              <div key={dept.id} className={styles.departmentCard}>
                <VStack gap={8}>
                  <Typography variant="contentHeading">{dept.name}</Typography>
                  <HStack gap={16}>
                    <Typography variant="controlLabel">
                      Headcount: {dept.headcount}
                    </Typography>
                    <Typography variant="controlLabel">
                      Space: {dept.squareFootage?.toLocaleString()} sq ft
                    </Typography>
                  </HStack>
                  <Typography variant="controlLabel">
                    Current allocation: {dept.currentAllocation?.toFixed(1)}%
                  </Typography>
                  {dept.revenue > 0 && (
                    <Typography variant="controlLabel">
                      Revenue: {formatCurrency(dept.revenue)}
                    </Typography>
                  )}
                </VStack>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Trail */}
        <div>
          <Typography variant="sectionHeading1">Recent Changes</Typography>
          <div className={styles.auditList}>
            {auditTrail?.slice(0, 5).map((entry: any, index: number) => (
              <div key={index} className={styles.auditItem}>
                <HStack gap={16}>
                  <Typography variant="contentHeading">{entry.action}</Typography>
                  <Typography variant="body">{entry.details}</Typography>
                  <Typography variant="controlLabel">
                    {formatDateTime(entry.date)} by {entry.user}
                  </Typography>
                </HStack>
              </div>
            ))}
          </div>
        </div>
      </VStack>

      {/* Preview Modal (simplified) */}
      {showPreview && (
        <div className={styles.previewOverlay} onClick={() => setShowPreview(false)}>
          <div className={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <VStack gap={16}>
              <Typography variant="sectionHeading1">Allocation Preview</Typography>
              
              <div>
                <Typography variant="contentHeading">Total Monthly Cost</Typography>
                <Typography variant="amount">{formatCurrency(previewData?.totalMonthlyCost)}</Typography>
              </div>

              <div>
                <Typography variant="contentHeading">Allocation Breakdown</Typography>
                <div className={styles.previewList}>
                  {previewData?.allocationBreakdown?.map((item: any) => (
                    <div key={item.departmentId} className={styles.previewItem}>
                      <HStack gap={16}>
                        <Typography variant="body">{item.departmentName}</Typography>
                        <Typography variant="body">{formatCurrency(item.allocatedCost)}</Typography>
                        <Typography variant="controlLabel">
                          {((item.allocatedCost / previewData.totalMonthlyCost) * 100).toFixed(1)}%
                        </Typography>
                      </HStack>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.previewActions}>
                <Button priority="secondary" onClick={() => setShowPreview(false)}>
                  Close
                </Button>
                <Button priority="primary">
                  Apply Configuration
                </Button>
              </div>
            </VStack>
          </div>
        </div>
      )}
    </div>
  );
};