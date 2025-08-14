import { type FC, useEffect, useState } from 'react';
import { DocumentTitle } from '../../components/DocumentTitle';
import { performanceUtils, type SystemHealth, type PerformanceTarget } from '../../utils/performanceMonitor';
import { SystemHealthDashboard } from './template/SystemHealthDashboard';

/**
 * System Health Route - Story 2.7 Implementation
 * Performance monitoring dashboard for system administrators
 */
export const Component: FC = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [performanceTargets, setPerformanceTargets] = useState<PerformanceTarget[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const updateMetrics = () => {
    const health = performanceUtils.getSystemHealth();
    const targets = performanceUtils.getPerformanceTargets();
    const recs = performanceUtils.getOptimizationRecommendations();
    
    setSystemHealth(health);
    setPerformanceTargets(targets);
    setRecommendations(recs);
    setLastUpdated(new Date());

    // Log system health for development
    console.log('📊 System Health Update:', health);
    
    // Check Story 2.7 compliance
    const compliance = performanceUtils.meetsStory27Requirements();
    if (!compliance.meetsRequirements) {
      console.warn('⚠️ System does not meet Story 2.7 requirements:', compliance);
    }
  };

  const handleRefreshMetrics = () => {
    updateMetrics();
  };

  const handleToggleAutoRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh);
  };

  const handleExportMetrics = () => {
    const data = {
      systemHealth,
      performanceTargets,
      recommendations,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Exporting system metrics:', data);
    alert('System metrics export - Integration point with Story 2.5 export service');
  };

  const handleOptimizeSystem = () => {
    console.log('System optimization triggered');
    alert('System optimization initiated - Would trigger performance tuning procedures');
  };

  // Initialize performance monitoring and set up refresh interval
  useEffect(() => {
    // Initialize performance monitoring
    performanceUtils.init();
    
    // Initial load
    updateMetrics();

    let interval: NodeJS.Timeout;
    if (isAutoRefresh) {
      // Update metrics every 30 seconds when auto-refresh is enabled
      interval = setInterval(updateMetrics, 30000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoRefresh]);

  if (!systemHealth) {
    return (
      <>
        <DocumentTitle title="System Health Dashboard - Loading" />
        <div>Loading system health metrics...</div>
      </>
    );
  }

  return (
    <>
      <DocumentTitle title="System Health Dashboard" />

      <SystemHealthDashboard
        systemHealth={systemHealth}
        performanceTargets={performanceTargets}
        recommendations={recommendations}
        lastUpdated={lastUpdated}
        isAutoRefresh={isAutoRefresh}
        onRefresh={handleRefreshMetrics}
        onToggleAutoRefresh={handleToggleAutoRefresh}
        onExportMetrics={handleExportMetrics}
        onOptimizeSystem={handleOptimizeSystem}
      />
    </>
  );
};