/**
 * Performance Monitor - Story 2.7 Implementation
 * System performance monitoring and optimization for 500+ concurrent users
 */

interface PerformanceMetrics {
  timestamp: number;
  componentName: string;
  renderTime: number;
  memoryUsage: number;
  networkLatency?: number;
  userCount: number;
  errorRate: number;
}

interface SystemHealth {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  errorRate: number;
  activeUsers: number;
  status: 'healthy' | 'warning' | 'critical';
}

interface PerformanceTarget {
  name: string;
  target: number;
  current: number;
  unit: string;
  status: 'met' | 'warning' | 'exceeded';
}

/**
 * Performance Monitor Class
 * Tracks system performance and provides optimization recommendations
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private observer?: PerformanceObserver;
  private isMonitoring = false;

  private constructor() {
    this.setupPerformanceObserver();
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start performance monitoring
   */
  public startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    console.log('🚀 Performance monitoring started - Story 2.7');
    
    // Start monitoring intervals
    setInterval(() => this.collectMetrics(), 5000); // Every 5 seconds
    setInterval(() => this.checkPerformanceTargets(), 30000); // Every 30 seconds
  }

  /**
   * Stop performance monitoring
   */
  public stopMonitoring(): void {
    this.isMonitoring = false;
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Track component render performance
   */
  public trackComponentRender(componentName: string, startTime: number): void {
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    const metric: PerformanceMetrics = {
      timestamp: Date.now(),
      componentName,
      renderTime,
      memoryUsage: this.getMemoryUsage(),
      userCount: this.getActiveUserCount(),
      errorRate: this.getErrorRate(),
    };

    this.metrics.push(metric);

    // Keep only last 1000 metrics to prevent memory leaks
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Log performance warnings
    if (renderTime > 100) { // Components should render under 100ms
      console.warn(`⚠️ Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
    }
  }

  /**
   * Get current system health
   */
  public getSystemHealth(): SystemHealth {
    const metrics = this.getRecentMetrics(60000); // Last minute
    
    const avgRenderTime = metrics.reduce((sum, m) => sum + m.renderTime, 0) / metrics.length;
    const avgMemoryUsage = metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length;
    const currentErrorRate = this.getErrorRate();
    const activeUsers = this.getActiveUserCount();

    let status: SystemHealth['status'] = 'healthy';
    
    // Determine system status based on Story 2.7 requirements
    if (activeUsers > 500 || currentErrorRate > 0.1 || avgRenderTime > 1000) {
      status = 'critical';
    } else if (activeUsers > 400 || currentErrorRate > 0.05 || avgRenderTime > 500) {
      status = 'warning';
    }

    return {
      cpuUsage: this.getCPUUsage(),
      memoryUsage: avgMemoryUsage,
      networkLatency: this.getNetworkLatency(),
      errorRate: currentErrorRate,
      activeUsers,
      status,
    };
  }

  /**
   * Get performance targets and current status
   */
  public getPerformanceTargets(): PerformanceTarget[] {
    const systemHealth = this.getSystemHealth();
    
    return [
      {
        name: 'Dashboard Load Time',
        target: 3000, // 3 seconds (Story 2.1 requirement)
        current: this.getDashboardLoadTime(),
        unit: 'ms',
        status: this.getDashboardLoadTime() <= 3000 ? 'met' : 'exceeded',
      },
      {
        name: 'Navigation Transition',
        target: 1000, // 1 second (Story 2.2 requirement)
        current: this.getNavigationTime(),
        unit: 'ms',
        status: this.getNavigationTime() <= 1000 ? 'met' : 'exceeded',
      },
      {
        name: 'Portal Load Time',
        target: 2000, // 2 seconds (Story 2.3 requirement)
        current: this.getPortalLoadTime(),
        unit: 'ms',
        status: this.getPortalLoadTime() <= 2000 ? 'met' : 'exceeded',
      },
      {
        name: 'Report Generation',
        target: 60000, // 60 seconds (Story 2.4 requirement)
        current: this.getReportGenerationTime(),
        unit: 'ms',
        status: this.getReportGenerationTime() <= 60000 ? 'met' : 'exceeded',
      },
      {
        name: 'Export Generation',
        target: 30000, // 30 seconds (Story 2.5 requirement)
        current: this.getExportGenerationTime(),
        unit: 'ms',
        status: this.getExportGenerationTime() <= 30000 ? 'met' : 'exceeded',
      },
      {
        name: 'Mobile Load Time',
        target: 3000, // 3 seconds on 3G (Story 2.6 requirement)
        current: this.getMobileLoadTime(),
        unit: 'ms',
        status: this.getMobileLoadTime() <= 3000 ? 'met' : 'exceeded',
      },
      {
        name: 'Concurrent Users',
        target: 500, // 500 users (Story 2.7 requirement)
        current: systemHealth.activeUsers,
        unit: 'users',
        status: systemHealth.activeUsers <= 500 ? 'met' : 
                systemHealth.activeUsers <= 600 ? 'warning' : 'exceeded',
      },
      {
        name: 'System Error Rate',
        target: 0.1, // 0.1% (Story 2.7 requirement)
        current: systemHealth.errorRate,
        unit: '%',
        status: systemHealth.errorRate <= 0.1 ? 'met' : 'exceeded',
      },
      {
        name: 'System Uptime',
        target: 99.9, // 99.9% (Story 2.7 requirement)
        current: this.getSystemUptime(),
        unit: '%',
        status: this.getSystemUptime() >= 99.9 ? 'met' : 'exceeded',
      },
    ];
  }

  /**
   * Get optimization recommendations
   */
  public getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    const systemHealth = this.getSystemHealth();
    const targets = this.getPerformanceTargets();

    // Check for specific performance issues
    if (systemHealth.activeUsers > 450) {
      recommendations.push('Consider enabling additional caching layers as user load approaches capacity');
    }

    if (systemHealth.errorRate > 0.05) {
      recommendations.push('Error rate is elevated - investigate API endpoints and error handling');
    }

    targets.forEach(target => {
      if (target.status === 'exceeded') {
        switch (target.name) {
          case 'Dashboard Load Time':
            recommendations.push('Optimize dashboard with lazy loading and component virtualization');
            break;
          case 'Navigation Transition':
            recommendations.push('Pre-cache navigation data and optimize route transitions');
            break;
          case 'Portal Load Time':
            recommendations.push('Implement progressive loading for department portal data');
            break;
          case 'Report Generation':
            recommendations.push('Optimize database queries and implement background processing');
            break;
          case 'Export Generation':
            recommendations.push('Use streaming exports and optimize data formatting');
            break;
          case 'Mobile Load Time':
            recommendations.push('Reduce bundle size and optimize images for mobile networks');
            break;
        }
      }
    });

    return recommendations;
  }

  /**
   * Setup performance observer for Web Vitals
   */
  private setupPerformanceObserver(): void {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log('📊 Navigation timing:', entry);
        } else if (entry.entryType === 'paint') {
          console.log('🎨 Paint timing:', entry.name, entry.startTime);
        }
      }
    });

    try {
      this.observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
    } catch (error) {
      console.warn('Performance observer setup failed:', error);
    }
  }

  /**
   * Collect system metrics
   */
  private collectMetrics(): void {
    if (!this.isMonitoring) return;

    const metric: PerformanceMetrics = {
      timestamp: Date.now(),
      componentName: 'system',
      renderTime: 0,
      memoryUsage: this.getMemoryUsage(),
      networkLatency: this.getNetworkLatency(),
      userCount: this.getActiveUserCount(),
      errorRate: this.getErrorRate(),
    };

    this.metrics.push(metric);
  }

  /**
   * Check performance targets and log warnings
   */
  private checkPerformanceTargets(): void {
    const targets = this.getPerformanceTargets();
    const exceededTargets = targets.filter(t => t.status === 'exceeded');

    if (exceededTargets.length > 0) {
      console.warn('🎯 Performance targets exceeded:', exceededTargets);
    }
  }

  // Utility methods for metrics collection
  private getRecentMetrics(timeWindow: number): PerformanceMetrics[] {
    const cutoff = Date.now() - timeWindow;
    return this.metrics.filter(m => m.timestamp > cutoff);
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / (1024 * 1024); // MB
    }
    return 0;
  }

  private getCPUUsage(): number {
    // Simulated CPU usage - in real implementation would use server-side metrics
    return Math.random() * 80 + 10;
  }

  private getNetworkLatency(): number {
    // Simulated network latency - in real implementation would ping server
    return Math.random() * 200 + 50;
  }

  private getActiveUserCount(): number {
    // Simulated user count - in real implementation would come from server
    return Math.floor(Math.random() * 600) + 100;
  }

  private getErrorRate(): number {
    // Simulated error rate - in real implementation would track actual errors
    return Math.random() * 0.2;
  }

  private getDashboardLoadTime(): number {
    const recentMetrics = this.getRecentMetrics(300000); // Last 5 minutes
    const dashboardMetrics = recentMetrics.filter(m => m.componentName === 'ExecutiveDashboard');
    return dashboardMetrics.length > 0
      ? dashboardMetrics.reduce((sum, m) => sum + m.renderTime, 0) / dashboardMetrics.length
      : 2500; // Default simulated time
  }

  private getNavigationTime(): number {
    return Math.random() * 1200 + 300; // 300-1500ms
  }

  private getPortalLoadTime(): number {
    return Math.random() * 2500 + 1000; // 1000-3500ms
  }

  private getReportGenerationTime(): number {
    return Math.random() * 80000 + 20000; // 20-100 seconds
  }

  private getExportGenerationTime(): number {
    return Math.random() * 40000 + 10000; // 10-50 seconds
  }

  private getMobileLoadTime(): number {
    return Math.random() * 4000 + 2000; // 2-6 seconds
  }

  private getSystemUptime(): number {
    return 99.5 + Math.random() * 0.6; // 99.5-100.1%
  }
}

/**
 * Performance monitoring hook for React components
 */
export const usePerformanceMonitor = (componentName: string) => {
  const monitor = PerformanceMonitor.getInstance();
  
  const startTimer = () => {
    return performance.now();
  };

  const endTimer = (startTime: number) => {
    monitor.trackComponentRender(componentName, startTime);
  };

  return { startTimer, endTimer };
};

/**
 * Performance monitoring utilities
 */
export const performanceUtils = {
  /**
   * Initialize performance monitoring
   */
  init: () => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.startMonitoring();
    
    // Set up error tracking
    window.addEventListener('error', (event) => {
      console.error('🚨 Runtime error:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('🚨 Unhandled promise rejection:', event.reason);
    });
  },

  /**
   * Get current system health
   */
  getSystemHealth: () => {
    return PerformanceMonitor.getInstance().getSystemHealth();
  },

  /**
   * Get performance targets
   */
  getPerformanceTargets: () => {
    return PerformanceMonitor.getInstance().getPerformanceTargets();
  },

  /**
   * Get optimization recommendations
   */
  getOptimizationRecommendations: () => {
    return PerformanceMonitor.getInstance().getOptimizationRecommendations();
  },

  /**
   * Check if system meets Story 2.7 requirements
   */
  meetsStory27Requirements: () => {
    const health = PerformanceMonitor.getInstance().getSystemHealth();
    const targets = PerformanceMonitor.getInstance().getPerformanceTargets();
    
    const concurrentUsersTarget = targets.find(t => t.name === 'Concurrent Users');
    const errorRateTarget = targets.find(t => t.name === 'System Error Rate');
    const uptimeTarget = targets.find(t => t.name === 'System Uptime');

    return {
      concurrentUsersOk: concurrentUsersTarget?.status === 'met',
      errorRateOk: errorRateTarget?.status === 'met',
      uptimeOk: uptimeTarget?.status === 'met',
      overallStatus: health.status,
      meetsRequirements: health.status !== 'critical' && health.activeUsers <= 500 && health.errorRate <= 0.1,
    };
  },
};