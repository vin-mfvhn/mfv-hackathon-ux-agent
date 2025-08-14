import {
  Button,
  Checkbox,
  Dialog,
  DropdownMenu,
  LoadingSpinner,
  ProgressBar,
  Select,
  Toast,
  Typography,
} from '@moneyforward/mfui-components';
import { type FC, useState } from 'react';
import { ExportService, type ExportOptions, type ExportProgress } from '../../utils/exportService';
import styles from './styles.module.css';

interface Props {
  isOpen: boolean;
  title: string;
  data: any;
  exportType: 'executive-dashboard' | 'department-detail' | 'department-portal' | 'custom';
  onClose: () => void;
  onExportComplete?: (filename: string) => void;
}

/**
 * Reusable Export Dialog Component - Story 2.5 Implementation
 * Provides Excel and PDF export functionality with progress tracking and formatting options
 */
export const ExportDialog: FC<Props> = ({
  isOpen,
  title,
  data,
  exportType,
  onClose,
  onExportComplete,
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'excel',
    includeCharts: true,
    includeMetadata: true,
    brandingEnabled: true,
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  const exportService = new ExportService((progress) => {
    setExportProgress(progress);
  });

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(null);
    
    try {
      let filename: string;

      switch (exportType) {
        case 'executive-dashboard':
          filename = await exportService.exportExecutiveDashboard(data, exportOptions);
          break;
        case 'department-detail':
          filename = await exportService.exportDepartmentDetail(data, exportOptions);
          break;
        case 'department-portal':
          filename = await exportService.exportDepartmentPortal(data, exportOptions);
          break;
        default:
          throw new Error('Unsupported export type');
      }

      // Show success toast
      setToastMessage(`Export completed successfully! File: ${filename}`);
      setToastType('success');
      setShowToast(true);

      // Trigger callback
      if (onExportComplete) {
        onExportComplete(filename);
      }

      // Auto-close dialog after successful export
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Export failed:', error);
      setToastMessage(`Export failed: ${error}`);
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsExporting(false);
      setExportProgress(null);
    }
  };

  const getEstimatedTime = () => {
    const dataSize = JSON.stringify(data).length;
    return exportService.getEstimatedExportTime(dataSize, exportOptions.format);
  };

  const formatOptions = [
    { value: 'excel', label: 'Excel (.xlsx)', description: 'Multiple worksheets with detailed data' },
    { value: 'pdf', label: 'PDF (.pdf)', description: 'Professional report with MoneyForward branding' },
  ];

  return (
    <>
      <Dialog
        title={`Export ${title}`}
        onClose={onClose}
        open={isOpen}
        width="500px"
      >
        <div className={styles.exportDialog}>
          {!isExporting ? (
            <>
              {/* Format Selection */}
              <div className={styles.section}>
                <Typography variant="sectionHeading">Export Format</Typography>
                <div className={styles.formatOptions}>
                  {formatOptions.map((format) => (
                    <div
                      key={format.value}
                      className={`${styles.formatOption} ${
                        exportOptions.format === format.value ? styles.selected : ''
                      }`}
                      onClick={() =>
                        setExportOptions({ ...exportOptions, format: format.value as 'excel' | 'pdf' })
                      }
                    >
                      <Typography variant="contentHeading">{format.label}</Typography>
                      <Typography variant="body" className={styles.formatDescription}>
                        {format.description}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export Options */}
              <div className={styles.section}>
                <Typography variant="sectionHeading">Export Options</Typography>
                <div className={styles.checkboxGroup}>
                  <Checkbox
                    label="Include charts and visualizations"
                    checked={exportOptions.includeCharts}
                    onChange={(checked) =>
                      setExportOptions({ ...exportOptions, includeCharts: checked })
                    }
                  />
                  <Checkbox
                    label="Include metadata and timestamps"
                    checked={exportOptions.includeMetadata}
                    onChange={(checked) =>
                      setExportOptions({ ...exportOptions, includeMetadata: checked })
                    }
                  />
                  <Checkbox
                    label="Apply MoneyForward branding"
                    checked={exportOptions.brandingEnabled}
                    onChange={(checked) =>
                      setExportOptions({ ...exportOptions, brandingEnabled: checked })
                    }
                  />
                </div>
              </div>

              {/* Export Info */}
              <div className={styles.section}>
                <div className={styles.exportInfo}>
                  <div className={styles.infoItem}>
                    <Typography variant="controlLabel">Estimated Time:</Typography>
                    <Typography>{getEstimatedTime()} seconds</Typography>
                  </div>
                  <div className={styles.infoItem}>
                    <Typography variant="controlLabel">Format:</Typography>
                    <Typography>{exportOptions.format.toUpperCase()}</Typography>
                  </div>
                  <div className={styles.infoItem}>
                    <Typography variant="controlLabel">File Retention:</Typography>
                    <Typography>30 days</Typography>
                  </div>
                </div>
              </div>

              <div className={styles.dialogActions}>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleExport}>
                  Export Data
                </Button>
              </div>
            </>
          ) : (
            /* Export Progress */
            <div className={styles.exportProgress}>
              <div className={styles.progressHeader}>
                <LoadingSpinner size="large" />
                <Typography variant="contentHeading">
                  Exporting {exportOptions.format.toUpperCase()} file...
                </Typography>
              </div>

              {exportProgress && (
                <div className={styles.progressDetails}>
                  <ProgressBar
                    value={exportProgress.progress}
                    max={100}
                    label={`${exportProgress.progress}%`}
                  />
                  <Typography variant="body" className={styles.progressMessage}>
                    {exportProgress.message}
                  </Typography>
                  {exportProgress.estimatedTime && (
                    <Typography variant="body" className={styles.estimatedTime}>
                      Estimated time remaining: {exportProgress.estimatedTime} seconds
                    </Typography>
                  )}
                </div>
              )}

              <div className={styles.progressInfo}>
                <Typography variant="body">
                  Your export is being generated in the background. This process typically takes 15-30 seconds
                  for standard reports (Story 2.5 performance target).
                </Typography>
              </div>
            </div>
          )}
        </div>
      </Dialog>

      {/* Success/Error Toast */}
      {showToast && (
        <Toast
          color={toastType === 'success' ? 'success' : toastType === 'error' ? 'error' : 'info'}
          message={toastMessage}
          onClose={() => setShowToast(false)}
          persistent={toastType === 'error'}
        />
      )}
    </>
  );
};