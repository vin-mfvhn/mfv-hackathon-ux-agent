import {
  Typography,
  VStack,
  HStack,
  Button,
} from '@moneyforward/mfui-components';
import { type FC, useState } from 'react';
import styles from './styles.module.css';

type Props = {
  userProfile: any;
  departmentSummary: any;
  locationBreakdown: any[];
  upcomingRenewals: any[];
  budgetTracking: any[];
  spaceUtilization: any;
  actionItems: any[];
};

/**
 * Simplified Department Manager Portal Template
 */
export const Template: FC<Props> = ({
  userProfile,
  departmentSummary,
  locationBreakdown,
  upcomingRenewals,
  actionItems,
}) => {
  const [activeTab, setActiveTab] = useState('costs');

  const formatCurrency = (amount: number): string => {
    return `$${amount?.toLocaleString()}`;
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <Typography as="h1" variant="pageHeading1">
            My Department Portal
          </Typography>
          <Typography variant="body" className={styles.userInfo}>
            {userProfile?.name} • {userProfile?.role} • {userProfile?.department}
          </Typography>
        </div>
        <HStack gap={12}>
          <Button priority="secondary">Export Report</Button>
          <Button priority="primary">Request Space Change</Button>
        </HStack>
      </div>

      <VStack gap={24}>
        {/* Summary Cards */}
        <HStack gap={16} className={styles.summaryRow}>
          <div className={styles.summaryCard}>
            <Typography variant="contentHeading">Monthly Cost</Typography>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.costValue}>
                {formatCurrency(departmentSummary?.monthlyCost)}
              </Typography>
              <Typography 
                variant="controlLabel"
                style={{ 
                  color: departmentSummary?.variance > 5 ? '#ff4d4f' : 
                        departmentSummary?.variance < -5 ? '#52c41a' : '#faad14'
                }}
              >
                {departmentSummary?.variance > 0 ? '+' : ''}
                {departmentSummary?.variance?.toFixed(1)}% vs Budget
              </Typography>
            </VStack>
          </div>

          <div className={styles.summaryCard}>
            <Typography variant="contentHeading">YTD Budget</Typography>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.costValue}>
                {((departmentSummary?.yearToDateSpend / departmentSummary?.yearToDateBudget) * 100)?.toFixed(1)}%
              </Typography>
              <Typography variant="controlLabel">
                {formatCurrency(departmentSummary?.yearToDateSpend)} / {formatCurrency(departmentSummary?.yearToDateBudget)}
              </Typography>
            </VStack>
          </div>

          <div className={styles.summaryCard}>
            <Typography variant="contentHeading">Space Utilization</Typography>
            <VStack gap={8}>
              <Typography variant="amount" className={styles.utilizationValue}>
                {departmentSummary?.utilizationRate}%
              </Typography>
              <Typography variant="controlLabel">
                {departmentSummary?.headcount} people
              </Typography>
            </VStack>
          </div>
        </HStack>

        {/* Tab Navigation */}
        <div>
          <div className={styles.tabHeaders}>
            {['costs', 'budget', 'utilization', 'renewals'].map((tab) => (
              <button 
                key={tab}
                className={`${styles.tabButton} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'costs' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading1">Location Breakdown</Typography>
                <div className={styles.locationList}>
                  {locationBreakdown?.map((location: any, index: number) => (
                    <div key={location.id || index} className={styles.locationItem}>
                      <HStack gap={16}>
                        <Typography variant="contentHeading">{location.name}</Typography>
                        <Typography variant="body">
                          {formatCurrency(location.monthlyCost)} / month
                        </Typography>
                        <Typography variant="controlLabel">
                          {location.sqFootage?.toLocaleString()} sq ft • {location.headcount} people
                        </Typography>
                        <Typography variant="controlLabel">
                          {location.utilizationRate}% utilization
                        </Typography>
                      </HStack>
                    </div>
                  ))}
                </div>
              </VStack>
            )}

            {activeTab === 'renewals' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading1">Upcoming Renewals</Typography>
                <div className={styles.renewalsList}>
                  {upcomingRenewals?.map((renewal: any, index: number) => (
                    <div key={renewal.id || index} className={styles.renewalItem}>
                      <HStack gap={16}>
                        <Typography variant="contentHeading">{renewal.location}</Typography>
                        <Typography variant="body">
                          Expires: {new Date(renewal.expirationDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body">
                          {renewal.monthsUntilExpiration} months remaining
                        </Typography>
                        <Typography variant="controlLabel">
                          Current: {formatCurrency(renewal.currentRate)} • Market: {formatCurrency(renewal.marketRate)}
                        </Typography>
                      </HStack>
                    </div>
                  ))}
                </div>
              </VStack>
            )}

            {activeTab === 'budget' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading1">Budget Performance</Typography>
                <Typography variant="body">
                  YTD Spend: {formatCurrency(departmentSummary?.yearToDateSpend)} of {formatCurrency(departmentSummary?.yearToDateBudget)} budgeted
                </Typography>
              </VStack>
            )}

            {activeTab === 'utilization' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading1">Space Usage</Typography>
                <Typography variant="body">
                  Average occupancy: {departmentSummary?.utilizationRate}% across {departmentSummary?.headcount} employees
                </Typography>
              </VStack>
            )}
          </div>
        </div>

        {/* Action Items */}
        {actionItems?.length > 0 && (
          <div>
            <Typography variant="sectionHeading1">Action Items</Typography>
            <VStack gap={12}>
              {actionItems.map((item: any, index: number) => (
                <div key={index} className={styles.actionItem}>
                  <HStack gap={12}>
                    <div className={`${styles.priorityBadge} ${styles[`priority${item.priority}`]}`}>
                      {item.priority}
                    </div>
                    <VStack gap={4}>
                      <Typography variant="contentHeading">{item.title}</Typography>
                      <Typography variant="body">{item.description}</Typography>
                      <Typography variant="controlLabel">Due: {new Date(item.dueDate).toLocaleDateString()}</Typography>
                    </VStack>
                  </HStack>
                </div>
              ))}
            </VStack>
          </div>
        )}
      </VStack>
    </div>
  );
};