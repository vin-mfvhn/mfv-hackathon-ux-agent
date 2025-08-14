import {
  Button,
  Card,
  Checkbox,
  DataGrid,
  DatePicker,
  Dialog,
  PageHeader,
  Select,
  Table,
  Tabs,
  Typography,
} from '@moneyforward/mfui-components';
import { type FC, useState } from 'react';
import styles from './report-management-system.module.css';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  format: string[];
  estimatedSize: string;
  lastUsed: string;
}

interface ScheduledReport {
  id: string;
  templateId: string;
  name: string;
  schedule: string;
  nextRun: string;
  format: string;
  distributionList: string[];
  status: 'active' | 'paused';
  lastRun: string;
  lastRunStatus: 'success' | 'failed';
}

interface ReportHistory {
  id: string;
  templateName: string;
  generatedDate: string;
  format: string;
  size: string;
  status: 'completed' | 'failed' | 'processing';
  downloadUrl: string | null;
  expiryDate: string | null;
  generatedBy: string;
  errorMessage?: string;
}

interface DistributionGroup {
  id: string;
  name: string;
  members: string[];
}

interface Props {
  templates: ReportTemplate[];
  scheduledReports: ScheduledReport[];
  reportHistory: ReportHistory[];
  distributionGroups: DistributionGroup[];
  activeTab: 'builder' | 'scheduled' | 'history';
  reportBuilderOpen: boolean;
  selectedTemplate: string | null;
  schedulingDialogOpen: boolean;
  onTabChange: (tab: 'builder' | 'scheduled' | 'history') => void;
  onOpenReportBuilder: (templateId: string) => void;
  onCloseReportBuilder: () => void;
  onGenerateReport: (templateId: string, config: any) => void;
  onOpenScheduling: () => void;
  onCloseScheduling: () => void;
  onScheduleReport: (config: any) => void;
  onEditSchedule: (scheduleId: string) => void;
  onToggleSchedule: (scheduleId: string, active: boolean) => void;
  onDownloadReport: (reportId: string) => void;
  onDeleteReport: (reportId: string) => void;
  onManageDistribution: (groupId: string) => void;
}

/**
 * Advanced Report Generation and Scheduling System - Story 2.4 Implementation
 * Multi-step report configuration with templates, scheduling, and distribution management
 */
export const ReportManagementSystem: FC<Props> = ({
  templates,
  scheduledReports,
  reportHistory,
  distributionGroups,
  activeTab,
  reportBuilderOpen,
  selectedTemplate,
  schedulingDialogOpen,
  onTabChange,
  onOpenReportBuilder,
  onCloseReportBuilder,
  onGenerateReport,
  onOpenScheduling,
  onCloseScheduling,
  onScheduleReport,
  onEditSchedule,
  onToggleSchedule,
  onDownloadReport,
  onDeleteReport,
  onManageDistribution,
}) => {
  const [reportConfig, setReportConfig] = useState({
    departments: [] as string[],
    locations: [] as string[],
    dateRange: 'last-month',
    format: 'PDF',
    customStartDate: '',
    customEndDate: '',
  });

  const [scheduleConfig, setScheduleConfig] = useState({
    templateId: '',
    frequency: 'monthly',
    dayOfMonth: 1,
    dayOfWeek: 'monday',
    time: '09:00',
    distributionGroups: [] as string[],
    format: 'PDF',
  });

  const templateColumns = [
    {
      key: 'name',
      label: 'Template Name',
      render: (row: ReportTemplate) => (
        <div className={styles.templateName}>
          <Typography variant="contentHeading">{row.name}</Typography>
          <Typography variant="body" className={styles.templateDescription}>
            {row.description}
          </Typography>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (row: ReportTemplate) => (
        <span className={styles[row.category]}>{row.category}</span>
      ),
    },
    {
      key: 'format',
      label: 'Available Formats',
      render: (row: ReportTemplate) => row.format.join(', '),
    },
    {
      key: 'lastUsed',
      label: 'Last Used',
      render: (row: ReportTemplate) => new Date(row.lastUsed).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: ReportTemplate) => (
        <div className={styles.actionButtons}>
          <Button
            variant="primary"
            size="small"
            onClick={() => onOpenReportBuilder(row.id)}
          >
            Generate
          </Button>
        </div>
      ),
    },
  ];

  const scheduledColumns = [
    {
      key: 'name',
      label: 'Report Name',
      render: (row: ScheduledReport) => row.name,
    },
    {
      key: 'schedule',
      label: 'Schedule',
      render: (row: ScheduledReport) => row.schedule,
    },
    {
      key: 'nextRun',
      label: 'Next Run',
      render: (row: ScheduledReport) => new Date(row.nextRun).toLocaleString(),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: ScheduledReport) => (
        <span className={styles[row.status]}>{row.status}</span>
      ),
    },
    {
      key: 'lastRunStatus',
      label: 'Last Run',
      render: (row: ScheduledReport) => (
        <span className={styles[row.lastRunStatus]}>{row.lastRunStatus}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: ScheduledReport) => (
        <div className={styles.actionButtons}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onEditSchedule(row.id)}
          >
            Edit
          </Button>
          <Button
            variant={row.status === 'active' ? 'secondary' : 'primary'}
            size="small"
            onClick={() => onToggleSchedule(row.id, row.status !== 'active')}
          >
            {row.status === 'active' ? 'Pause' : 'Resume'}
          </Button>
        </div>
      ),
    },
  ];

  const historyColumns = [
    {
      key: 'templateName',
      label: 'Report',
      render: (row: ReportHistory) => row.templateName,
    },
    {
      key: 'generatedDate',
      label: 'Generated',
      render: (row: ReportHistory) => new Date(row.generatedDate).toLocaleString(),
    },
    {
      key: 'format',
      label: 'Format',
      render: (row: ReportHistory) => row.format,
    },
    {
      key: 'size',
      label: 'Size',
      render: (row: ReportHistory) => row.size,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: ReportHistory) => (
        <span className={styles[row.status]}>{row.status}</span>
      ),
    },
    {
      key: 'expiryDate',
      label: 'Expires',
      render: (row: ReportHistory) => 
        row.expiryDate ? new Date(row.expiryDate).toLocaleDateString() : 'N/A',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: ReportHistory) => (
        <div className={styles.actionButtons}>
          {row.status === 'completed' && row.downloadUrl && (
            <Button
              variant="primary"
              size="small"
              onClick={() => onDownloadReport(row.id)}
            >
              Download
            </Button>
          )}
          <Button
            variant="secondary"
            size="small"
            onClick={() => onDeleteReport(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  const handleGenerateReport = () => {
    if (!selectedTemplate) return;
    onGenerateReport(selectedTemplate, reportConfig);
  };

  const handleScheduleReport = () => {
    onScheduleReport(scheduleConfig);
  };

  return (
    <div className={styles.reportSystem}>
      <PageHeader
        title="Report Management System"
        subtitle="Generate, schedule, and manage lease cost reports"
        actions={[
          <Button key="schedule" variant="secondary" onClick={onOpenScheduling}>
            Schedule Report
          </Button>,
        ]}
      />

      {/* Main Navigation Tabs */}
      <div className={styles.tabsSection}>
        <Tabs value={activeTab} onChange={(value) => onTabChange(value as typeof activeTab)}>
          <Tabs.Item value="builder">Report Builder</Tabs.Item>
          <Tabs.Item value="scheduled">Scheduled Reports</Tabs.Item>
          <Tabs.Item value="history">Report History</Tabs.Item>
        </Tabs>
      </div>

      {/* Template Library - Report Builder Tab */}
      {activeTab === 'builder' && (
        <div className={styles.templateLibrary}>
          <Card>
            <Card.Header>
              <Typography variant="contentHeading">Available Report Templates</Typography>
            </Card.Header>
            <Card.Body>
              <DataGrid
                data={templates}
                columns={templateColumns}
                pagination={{ pageSize: 10 }}
                sortable
              />
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Scheduled Reports Tab */}
      {activeTab === 'scheduled' && (
        <div className={styles.scheduledSection}>
          <Card>
            <Card.Header>
              <div className={styles.sectionHeader}>
                <Typography variant="contentHeading">Scheduled Reports</Typography>
                <Button variant="primary" onClick={onOpenScheduling}>
                  Create Schedule
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <DataGrid
                data={scheduledReports}
                columns={scheduledColumns}
                pagination={{ pageSize: 10 }}
                sortable
              />
            </Card.Body>
          </Card>

          {/* Distribution Groups Management */}
          <Card>
            <Card.Header>
              <Typography variant="contentHeading">Distribution Groups</Typography>
            </Card.Header>
            <Card.Body>
              <div className={styles.distributionGroups}>
                {distributionGroups.map((group) => (
                  <div key={group.id} className={styles.distributionGroup}>
                    <div className={styles.groupInfo}>
                      <Typography variant="contentHeading">{group.name}</Typography>
                      <Typography variant="body">
                        {group.members.length} member(s)
                      </Typography>
                    </div>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onManageDistribution(group.id)}
                    >
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Report History Tab */}
      {activeTab === 'history' && (
        <div className={styles.historySection}>
          <Card>
            <Card.Header>
              <Typography variant="contentHeading">Report Archive (30-day retention)</Typography>
            </Card.Header>
            <Card.Body>
              <DataGrid
                data={reportHistory}
                columns={historyColumns}
                pagination={{ pageSize: 15 }}
                sortable
              />
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Report Builder Dialog */}
      {reportBuilderOpen && currentTemplate && (
        <Dialog
          title={`Generate Report: ${currentTemplate.name}`}
          onClose={onCloseReportBuilder}
          width="600px"
        >
          <div className={styles.reportBuilder}>
            <div className={styles.builderSection}>
              <Typography variant="sectionHeading">Report Configuration</Typography>
              
              <div className={styles.configGrid}>
                <div className={styles.configItem}>
                  <Typography variant="controlLabel">Report Format</Typography>
                  <Select
                    value={reportConfig.format}
                    onChange={(value) => setReportConfig({ ...reportConfig, format: value })}
                  >
                    {currentTemplate.format.map((fmt) => (
                      <Select.Option key={fmt} value={fmt}>
                        {fmt}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                <div className={styles.configItem}>
                  <Typography variant="controlLabel">Date Range</Typography>
                  <Select
                    value={reportConfig.dateRange}
                    onChange={(value) => setReportConfig({ ...reportConfig, dateRange: value })}
                  >
                    <Select.Option value="last-month">Last Month</Select.Option>
                    <Select.Option value="last-quarter">Last Quarter</Select.Option>
                    <Select.Option value="last-year">Last Year</Select.Option>
                    <Select.Option value="custom">Custom Range</Select.Option>
                  </Select>
                </div>
              </div>

              {reportConfig.dateRange === 'custom' && (
                <div className={styles.customDateRange}>
                  <DatePicker
                    label="Start Date"
                    value={reportConfig.customStartDate}
                    onChange={(date) => setReportConfig({ ...reportConfig, customStartDate: date })}
                  />
                  <DatePicker
                    label="End Date"
                    value={reportConfig.customEndDate}
                    onChange={(date) => setReportConfig({ ...reportConfig, customEndDate: date })}
                  />
                </div>
              )}

              <div className={styles.filterSection}>
                <Typography variant="controlLabel">Department Filters</Typography>
                <div className={styles.checkboxGroup}>
                  {['Marketing', 'Engineering', 'Sales', 'Operations', 'IT'].map((dept) => (
                    <Checkbox
                      key={dept}
                      label={dept}
                      checked={reportConfig.departments.includes(dept)}
                      onChange={(checked) => {
                        const newDepts = checked
                          ? [...reportConfig.departments, dept]
                          : reportConfig.departments.filter(d => d !== dept);
                        setReportConfig({ ...reportConfig, departments: newDepts });
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.dialogActions}>
              <Button variant="outlined" onClick={onCloseReportBuilder}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleGenerateReport}>
                Generate Report
              </Button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Scheduling Dialog */}
      {schedulingDialogOpen && (
        <Dialog
          title="Schedule Report Generation"
          onClose={onCloseScheduling}
          width="700px"
        >
          <div className={styles.schedulingDialog}>
            <div className={styles.builderSection}>
              <Typography variant="sectionHeading">Schedule Configuration</Typography>
              
              <div className={styles.configGrid}>
                <div className={styles.configItem}>
                  <Typography variant="controlLabel">Report Template</Typography>
                  <Select
                    value={scheduleConfig.templateId}
                    onChange={(value) => setScheduleConfig({ ...scheduleConfig, templateId: value })}
                  >
                    {templates.map((template) => (
                      <Select.Option key={template.id} value={template.id}>
                        {template.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                <div className={styles.configItem}>
                  <Typography variant="controlLabel">Frequency</Typography>
                  <Select
                    value={scheduleConfig.frequency}
                    onChange={(value) => setScheduleConfig({ ...scheduleConfig, frequency: value })}
                  >
                    <Select.Option value="daily">Daily</Select.Option>
                    <Select.Option value="weekly">Weekly</Select.Option>
                    <Select.Option value="monthly">Monthly</Select.Option>
                  </Select>
                </div>

                <div className={styles.configItem}>
                  <Typography variant="controlLabel">Distribution Groups</Typography>
                  <div className={styles.checkboxGroup}>
                    {distributionGroups.map((group) => (
                      <Checkbox
                        key={group.id}
                        label={group.name}
                        checked={scheduleConfig.distributionGroups.includes(group.id)}
                        onChange={(checked) => {
                          const newGroups = checked
                            ? [...scheduleConfig.distributionGroups, group.id]
                            : scheduleConfig.distributionGroups.filter(g => g !== group.id);
                          setScheduleConfig({ ...scheduleConfig, distributionGroups: newGroups });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.dialogActions}>
              <Button variant="outlined" onClick={onCloseScheduling}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleScheduleReport}>
                Schedule Report
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};