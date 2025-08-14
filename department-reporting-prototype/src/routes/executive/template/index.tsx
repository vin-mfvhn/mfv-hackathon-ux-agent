import { Typography, VStack, HStack } from '@moneyforward/mfui-components';
import { type FC } from 'react';
import styles from './styles.module.css';

type Props = {
  kpiMetrics: any;
  departmentBreakdown: any[];
  trendData: any[];
  alerts: any[];
};

/**
 * Simplified Executive Dashboard Template for demo purposes
 */
export const Template: FC<Props> = ({ kpiMetrics, departmentBreakdown }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <Typography as="h1" variant="pageHeading1">
          Executive Dashboard
        </Typography>
      </div>

      <VStack gap={24}>
        {/* KPI Summary */}
        <div className={styles.kpiRow}>
          <div className={styles.kpiCard}>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.kpiValue}>
                $2.4M
              </Typography>
              <Typography variant="body">Total Lease Costs</Typography>
              <Typography variant="controlLabel" style={{ color: '#ff4d4f' }}>
                5.2% Over Budget
              </Typography>
            </VStack>
          </div>

          <div className={styles.kpiCard}>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.kpiValue}>
                -3.1%
              </Typography>
              <Typography variant="body">YoY Change</Typography>
            </VStack>
          </div>

          <div className={styles.kpiCard}>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.kpiValue}>
                $42.50
              </Typography>
              <Typography variant="body">Cost per Sq Ft</Typography>
            </VStack>
          </div>

          <div className={styles.kpiCard}>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.kpiValue}>
                {departmentBreakdown?.length || 5}
              </Typography>
              <Typography variant="body">Departments</Typography>
            </VStack>
          </div>
        </div>

        {/* Department List */}
        <div>
          <Typography as="h2" variant="sectionHeading1">
            Department Breakdown
          </Typography>
          
          <div className={styles.departmentList}>
            {departmentBreakdown?.map((dept: any, index: number) => (
              <div key={dept.id || index} className={styles.departmentItem}>
                <HStack gap={16}>
                  <Typography variant="contentHeading">{dept.name}</Typography>
                  <Typography variant="body">
                    ${dept.monthlyCost?.toLocaleString()} / month
                  </Typography>
                  <Typography 
                    variant="controlLabel"
                    style={{ 
                      color: dept.variance > 5 ? '#ff4d4f' : 
                            dept.variance < -5 ? '#52c41a' : '#faad14' 
                    }}
                  >
                    {dept.variance > 0 ? '+' : ''}{dept.variance?.toFixed(1)}%
                  </Typography>
                </HStack>
              </div>
            ))}
          </div>
        </div>
      </VStack>
    </div>
  );
};