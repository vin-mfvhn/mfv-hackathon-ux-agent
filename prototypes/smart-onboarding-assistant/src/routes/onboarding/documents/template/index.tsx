import { useState } from 'react';
import {
  Button,
  TextBox,
  TextLink,
} from '@moneyforward/mfui-components';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import styles from './styles.module.css';

interface Document {
  id: string;
  title: string;
  description: string;
  category: 'Policy' | 'Training' | 'Technical' | 'Compliance' | 'Culture';
  assignedDate: string;
  dueDate: string;
  status: 'assigned' | 'reading' | 'completed' | 'overdue';
  readingProgress: number;
  estimatedReadTime: string;
  pdfUrl: string;
  assignedBy: string;
  completedAt?: string;
  isRequired: boolean;
  roleSpecific: boolean;
  priority: 'high' | 'medium' | 'low';
}

const EMPLOYEE_DATA = {
  name: 'Sarah Johnson',
  role: 'Engineer Grade 4',
  department: 'Tech Director Office',
};

const DOCUMENTS: Document[] = [
  // High Priority Required Documents
  {
    id: '1',
    title: 'Employee Handbook 2025',
    description: 'Complete guide to MoneyForward policies, procedures, and workplace guidelines',
    category: 'Policy',
    assignedDate: '2025-09-01',
    dueDate: '2025-09-05',
    status: 'completed',
    readingProgress: 100,
    estimatedReadTime: '45 minutes',
    pdfUrl: '/docs/employee-handbook-2025.pdf',
    assignedBy: 'HR Team',
    completedAt: '2025-09-03 14:30',
    isRequired: true,
    roleSpecific: false,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Information Security Policy',
    description: 'Comprehensive security guidelines and data protection requirements',
    category: 'Compliance',
    assignedDate: '2025-09-01',
    dueDate: '2025-09-05',
    status: 'completed',
    readingProgress: 100,
    estimatedReadTime: '30 minutes',
    pdfUrl: '/docs/information-security-policy.pdf',
    assignedBy: 'Security Team',
    completedAt: '2025-09-02 16:45',
    isRequired: true,
    roleSpecific: false,
    priority: 'high',
  },
  {
    id: '3',
    title: 'Engineering Best Practices Guide',
    description: 'Code standards, review processes, and development methodologies at MoneyForward',
    category: 'Technical',
    assignedDate: '2025-09-01',
    dueDate: '2025-09-10',
    status: 'reading',
    readingProgress: 65,
    estimatedReadTime: '60 minutes',
    pdfUrl: '/docs/engineering-best-practices.pdf',
    assignedBy: 'Tech Lead',
    isRequired: true,
    roleSpecific: true,
    priority: 'high',
  },
  
  // Medium Priority Documents
  {
    id: '4',
    title: 'MoneyForward Architecture Overview',
    description: 'System architecture, microservices design, and technical infrastructure overview',
    category: 'Technical',
    assignedDate: '2025-09-05',
    dueDate: '2025-09-20',
    status: 'assigned',
    readingProgress: 0,
    estimatedReadTime: '90 minutes',
    pdfUrl: '/docs/architecture-overview.pdf',
    assignedBy: 'Principal Architect',
    isRequired: true,
    roleSpecific: true,
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Company Culture & Values',
    description: 'Deep dive into MoneyForward mission, values, and cultural principles',
    category: 'Culture',
    assignedDate: '2025-09-10',
    dueDate: '2025-10-01',
    status: 'assigned',
    readingProgress: 0,
    estimatedReadTime: '25 minutes',
    pdfUrl: '/docs/company-culture-values.pdf',
    assignedBy: 'HR Team',
    isRequired: false,
    roleSpecific: false,
    priority: 'medium',
  },
  {
    id: '6',
    title: 'API Design Guidelines',
    description: 'Standards for REST API design, documentation, and versioning practices',
    category: 'Technical',
    assignedDate: '2025-09-15',
    dueDate: '2025-10-05',
    status: 'overdue',
    readingProgress: 20,
    estimatedReadTime: '40 minutes',
    pdfUrl: '/docs/api-design-guidelines.pdf',
    assignedBy: 'API Team Lead',
    isRequired: true,
    roleSpecific: true,
    priority: 'medium',
  },

  // Training Documents
  {
    id: '7',
    title: 'Compliance Training Module',
    description: 'Financial services compliance and regulatory requirements training',
    category: 'Training',
    assignedDate: '2025-09-20',
    dueDate: '2025-10-15',
    status: 'assigned',
    readingProgress: 0,
    estimatedReadTime: '120 minutes',
    pdfUrl: '/docs/compliance-training.pdf',
    assignedBy: 'Compliance Officer',
    isRequired: true,
    roleSpecific: false,
    priority: 'low',
  },
];

function getStatusClass(status: string) {
  switch (status) {
    case 'completed': return styles.statusCompleted;
    case 'reading': return styles.statusReading;
    case 'overdue': return styles.statusOverdue;
    case 'assigned': return styles.statusAssigned;
    default: return styles.statusAssigned;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'completed': return '✓ Completed';
    case 'reading': return '📖 In Progress';
    case 'overdue': return '⚠️ Overdue';
    case 'assigned': return '📄 Assigned';
    default: return status;
  }
}

function getPriorityClass(priority: string) {
  switch (priority) {
    case 'high': return styles.priorityHigh;
    case 'medium': return styles.priorityMedium;
    case 'low': return styles.priorityLow;
    default: return styles.priorityLow;
  }
}

export function DocumentsTemplate() {
  const [documents, setDocuments] = useState(DOCUMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleMarkAsReading = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, status: 'reading' as const } : doc
    ));
  };

  const handleMarkAsCompleted = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { 
        ...doc, 
        status: 'completed' as const,
        readingProgress: 100,
        completedAt: new Date().toISOString()
      } : doc
    ));
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const completedDocs = documents.filter(d => d.status === 'completed').length;
  const readingDocs = documents.filter(d => d.status === 'reading').length;
  const overdueDocs = documents.filter(d => d.status === 'overdue').length;
  const totalDocs = documents.length;
  const completionPercentage = Math.round((completedDocs / totalDocs) * 100);

  const renderDocumentRow = (doc: Document) => (
    <tr key={doc.id} className={styles.documentRow}>
      <td className={styles.documentCell}>
        <div className={styles.documentInfo}>
          <div className={styles.documentHeader}>
            <TextLink href={doc.pdfUrl} target="_blank" rel="noopener noreferrer">
              {doc.title}
            </TextLink>
            {doc.isRequired && (
              <span className={styles.requiredLabel}>Required</span>
            )}
            {doc.roleSpecific && (
              <span className={styles.roleSpecificLabel}>Role-specific</span>
            )}
          </div>
          <p className={styles.docDescription}>{doc.description}</p>
          <span className={styles.docMeta}>
            Assigned by: {doc.assignedBy} • Est. {doc.estimatedReadTime}
          </span>
        </div>
      </td>
      <td>{doc.category}</td>
      <td>
        <span className={getPriorityClass(doc.priority)}>
          {doc.priority}
        </span>
      </td>
      <td>
        <div className={styles.progressCell}>
          <span className={getStatusClass(doc.status)}>
            {getStatusLabel(doc.status)}
          </span>
          {doc.status !== 'assigned' && (
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${doc.readingProgress}%` }}
              />
              <span className={styles.progressText}>{doc.readingProgress}%</span>
            </div>
          )}
          {doc.completedAt && (
            <span className={styles.completedAt}>
              ✓ {new Date(doc.completedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </td>
      <td>
        <div className={styles.dueDateCell}>
          <span className={doc.status === 'overdue' ? styles.overdue : ''}>
            {new Date(doc.dueDate).toLocaleDateString()}
          </span>
          {doc.status === 'overdue' && (
            <span className={styles.overdueLabel}>Overdue</span>
          )}
        </div>
      </td>
      <td>
        <div className={styles.actionsCell}>
          {doc.status === 'assigned' && (
            <Button 
              priority="primary" 
              size="small"
              onClick={() => handleMarkAsReading(doc.id)}
            >
              Start Reading
            </Button>
          )}
          {doc.status === 'reading' && (
            <Button 
              priority="primary" 
              size="small"
              onClick={() => handleMarkAsCompleted(doc.id)}
            >
              Mark Complete
            </Button>
          )}
          {doc.status === 'overdue' && (
            <Button 
              priority="primary" 
              size="small"
              onClick={() => handleMarkAsReading(doc.id)}
            >
              Resume Reading
            </Button>
          )}
          <Button priority="tertiary" size="small">
            Download
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <DocumentTitle title="Document Library - Smart Onboarding Assistant" />
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1>Required Reading & Documents</h1>
            <p>Track your progress through essential onboarding materials for {EMPLOYEE_DATA.name}</p>
          </div>
        </header>
        
        <main className={styles.pageBody}>
          <div className={styles.contentContainer}>
            {/* Progress Overview */}
            <div className={styles.progressOverview}>
              <h2>Reading Progress</h2>
              <div className={styles.progressStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{completionPercentage}%</div>
                  <div className={styles.statLabel}>Overall Progress</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{completedDocs}</div>
                  <div className={styles.statLabel}>Completed</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{readingDocs}</div>
                  <div className={styles.statLabel}>In Progress</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{overdueDocs}</div>
                  <div className={styles.statLabel}>Overdue</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{totalDocs}</div>
                  <div className={styles.statLabel}>Total</div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
              <div className={styles.filtersContainer}>
                <TextBox
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search documents..."
                />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.categoryFilter}
                >
                  <option value="all">All Categories</option>
                  <option value="Policy">Policy</option>
                  <option value="Technical">Technical</option>
                  <option value="Training">Training</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Culture">Culture</option>
                </select>
              </div>
            </div>

            {/* Priority Actions */}
            {overdueDocs > 0 && (
              <div className={styles.urgentSection}>
                <h3>⚠️ Attention Required</h3>
                <p>You have {overdueDocs} overdue document(s). Please prioritize these readings:</p>
                <div className={styles.urgentActions}>
                  <Button priority="primary">
                    View Overdue Items ({overdueDocs})
                  </Button>
                  <Button priority="secondary">
                    Request Extension
                  </Button>
                </div>
              </div>
            )}

            {/* Documents Table */}
            <div className={styles.documentsTable}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Progress</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map(renderDocumentRow)}
                </tbody>
              </table>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <h3>Quick Actions</h3>
              <div className={styles.quickActionsContainer}>
                <Button priority="primary">
                  Download All PDFs
                </Button>
                <Button priority="secondary">
                  Generate Reading Report
                </Button>
                <Button priority="secondary">
                  Request Additional Resources
                </Button>
                <Button priority="tertiary">
                  View Reading History
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}