import {
  Typography,
  VStack,
  HStack,
  Button,
} from '@moneyforward/mfui-components';
import { type FC, useState } from 'react';
import styles from './styles.module.css';

type Props = {
  reportTemplates: any[];
  scheduledReports: any[];
  recentExports: any[];
  dataFilters: any;
};

/**
 * Simplified Reports Center Template
 */
export const Template: FC<Props> = ({
  reportTemplates,
  scheduledReports,
  recentExports,
  dataFilters,
}) => {
  const [activeTab, setActiveTab] = useState('templates');

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <Typography as="h1" variant="pageHeading1">
            Reports Center
          </Typography>
          <Typography variant="body" className={styles.subtitle}>
            Generate, schedule, and manage department cost reports
          </Typography>
        </div>
        <HStack gap={12}>
          <Button priority="secondary">
            Export All Data
          </Button>
          <Button priority="primary">
            Create New Report
          </Button>
        </HStack>
      </div>

      <VStack gap={24}>
        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <Typography variant="sectionHeading1">Quick Actions</Typography>
          <HStack gap={12}>
            <Button priority="secondary" size="small">
              📊 Monthly Summary
            </Button>
            <Button priority="secondary" size="small">
              📈 Budget Variance
            </Button>
            <Button priority="secondary" size="small">
              🏢 Department Breakdown
            </Button>
            <Button priority="secondary" size="small">
              📅 Renewal Schedule
            </Button>
          </HStack>
        </div>

        {/* Tab Navigation */}
        <div>
          <div className={styles.tabHeaders}>
            {['templates', 'scheduled', 'history'].map((tab) => (
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
            {activeTab === 'templates' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading1">Report Templates</Typography>
                <div className={styles.templateGrid}>
                  {reportTemplates?.map((template: any, index: number) => (
                    <div key={template.id || index} className={styles.templateCard}>
                      <VStack gap={12}>
                        <Typography variant="contentHeading">{template.name}</Typography>
                        <Typography variant="body">{template.description}</Typography>
                        <div className={styles.templateMeta}>
                          <Typography variant="controlLabel">
                            Format: {template.format?.toUpperCase()}
                          </Typography>
                          <Typography variant="controlLabel">
                            Frequency: {template.frequency}
                          </Typography>
                        </div>
                        <HStack gap={8}>
                          <Button priority="primary" size="small">
                            Generate
                          </Button>
                          <Button priority="secondary" size="small">
                            Schedule
                          </Button>
                          <Button priority="tertiary" size="small">
                            Edit
                          </Button>
                        </HStack>
                      </VStack>
                    </div>
                  ))}
                </div>
              </VStack>
            )}

            {activeTab === 'scheduled' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading1">Scheduled Reports</Typography>
                <div className={styles.scheduledList}>
                  {scheduledReports?.map((report: any, index: number) => (
                    <div key={report.id || index} className={styles.scheduledItem}>
                      <HStack gap={16}>
                        <VStack gap={4}>
                          <Typography variant="contentHeading">{report.reportName}</Typography>
                          <Typography variant="body">
                            Recipients: {report.recipients?.join(', ')}
                          </Typography>
                          <Typography variant="controlLabel">
                            Next run: {formatDateTime(report.nextRun)}
                          </Typography>
                        </VStack>
                        <div className={`${styles.statusBadge} ${styles[`status${report.status?.toLowerCase()}`]}`}>
                          {report.status}
                        </div>
                        <HStack gap={8}>
                          <Button priority="secondary" size="small">
                            Pause
                          </Button>
                          <Button priority="tertiary" size="small">
                            Edit
                          </Button>
                        </HStack>
                      </HStack>
                    </div>
                  ))}
                </div>
              </VStack>
            )}

            {activeTab === 'history' && (
              <VStack gap={16}>
                <Typography variant="sectionHeading1">Export History</Typography>
                <div className={styles.historyList}>
                  {recentExports?.map((export_: any, index: number) => (
                    <div key={export_.id || index} className={styles.historyItem}>
                      <HStack gap={16}>
                        <VStack gap={4}>
                          <Typography variant="contentHeading">{export_.reportName}</Typography>
                          <Typography variant="body">
                            Generated: {formatDateTime(export_.generatedAt)}
                          </Typography>
                          <Typography variant="controlLabel">
                            Size: {formatFileSize(export_.fileSize)} • Format: {export_.format?.toUpperCase()}
                          </Typography>
                        </VStack>
                        <div className={`${styles.statusBadge} ${styles[`status${export_.status?.toLowerCase()}`]}`}>
                          {export_.status}
                        </div>
                        <HStack gap={8}>
                          <Button priority="primary" size="small">
                            Download
                          </Button>
                          <Button priority="tertiary" size="small">
                            Share
                          </Button>
                        </HStack>
                      </HStack>
                    </div>
                  ))}
                </div>
              </VStack>
            )}
          </div>
        </div>

        {/* Data Filters Summary */}
        <div className={styles.filtersSummary}>
          <Typography variant="sectionHeading1">Current Data Scope</Typography>
          <div className={styles.filtersGrid}>
            <div className={styles.filterItem}>
              <Typography variant="controlLabel">Date Range</Typography>
              <Typography variant="body">
                {dataFilters?.dateRange || 'Last 12 months'}
              </Typography>
            </div>
            <div className={styles.filterItem}>
              <Typography variant="controlLabel">Departments</Typography>
              <Typography variant="body">
                {dataFilters?.departments?.length || 'All'} departments
              </Typography>
            </div>
            <div className={styles.filterItem}>
              <Typography variant="controlLabel">Cost Types</Typography>
              <Typography variant="body">
                {dataFilters?.costTypes?.join(', ') || 'All types'}
              </Typography>
            </div>
            <div className={styles.filterItem}>
              <Typography variant="controlLabel">Locations</Typography>
              <Typography variant="body">
                {dataFilters?.locations?.length || 'All'} locations
              </Typography>
            </div>
          </div>
        </div>
      </VStack>
    </div>
  );
};