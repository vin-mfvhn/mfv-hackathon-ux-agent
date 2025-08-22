import { useState } from 'react';
import {
  Button,
  HStack,
  PageLayout,
  StatusLabel,
  TextBox,
  TextLink,
  VStack,
} from '@moneyforward/mfui-components';
import { DocumentTitle } from '../../../../components/DocumentTitle';
import styles from './styles.module.css';

interface KeyPerson {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  slackHandle?: string;
  meetingPurpose: string;
  priority: 'high' | 'medium' | 'low';
  suggestedMeetingDuration: string;
  availableTimeSlots: string[];
  meetingStatus: 'pending' | 'scheduled' | 'completed';
  aiReasoning: string;
}

const EMPLOYEE_DATA = {
  name: 'Sarah Johnson',
  role: 'Engineer Grade 4',
  department: 'Tech Director Office',
};

const KEY_PEOPLE_SUGGESTIONS: KeyPerson[] = [
  {
    id: '1',
    name: 'James Wilson',
    role: 'Tech Director',
    department: 'Tech Director Office',
    email: 'james.wilson@moneyforward.co.jp',
    slackHandle: '@james.wilson',
    meetingPurpose: 'Initial manager introduction and role expectations setting. Discuss probation goals and team integration strategy.',
    priority: 'high',
    suggestedMeetingDuration: '60 minutes',
    availableTimeSlots: ['Today 3:00 PM', 'Tomorrow 10:00 AM', 'Tomorrow 2:00 PM'],
    meetingStatus: 'completed',
    aiReasoning: 'Direct manager relationship - essential for role clarity and immediate support structure.',
  },
  {
    id: '2',
    name: 'Dr. Sarah Chen',
    role: 'Principal Architect',
    department: 'Tech Director Office',
    email: 'sarah.chen@moneyforward.co.jp',
    slackHandle: '@sarah.chen',
    meetingPurpose: 'System architecture deep dive and understanding of technical stack. Code review standards and development practices.',
    priority: 'high',
    suggestedMeetingDuration: '90 minutes',
    availableTimeSlots: ['Tomorrow 9:00 AM', 'Friday 11:00 AM', 'Friday 3:00 PM'],
    meetingStatus: 'scheduled',
    aiReasoning: 'Technical leadership and architecture knowledge transfer - critical for Grade 4 Engineer success.',
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'Senior Engineer',
    department: 'Tech Director Office',
    email: 'michael.rodriguez@moneyforward.co.jp',
    slackHandle: '@michael.rodriguez',
    meetingPurpose: 'Code buddy system setup and daily development workflow guidance. Git practices and deployment procedures.',
    priority: 'high',
    suggestedMeetingDuration: '45 minutes',
    availableTimeSlots: ['Today 4:00 PM', 'Tomorrow 1:00 PM', 'Wednesday 10:00 AM'],
    meetingStatus: 'pending',
    aiReasoning: 'Peer mentor for day-to-day technical questions and code collaboration - essential for immediate productivity.',
  },
  {
    id: '4',
    name: 'Lisa Park',
    role: 'Product Manager',
    department: 'Product',
    email: 'lisa.park@moneyforward.co.jp',
    slackHandle: '@lisa.park',
    meetingPurpose: 'Product requirements understanding and stakeholder communication processes. User story interpretation and feature prioritization.',
    priority: 'medium',
    suggestedMeetingDuration: '30 minutes',
    availableTimeSlots: ['Wednesday 2:00 PM', 'Thursday 11:00 AM', 'Thursday 4:00 PM'],
    meetingStatus: 'pending',
    aiReasoning: 'Cross-functional collaboration essential for understanding business requirements and product context.',
  },
  {
    id: '5',
    name: 'David Kumar',
    role: 'Information Security Manager',
    department: 'Corp IT',
    email: 'david.kumar@moneyforward.co.jp',
    slackHandle: '@david.kumar',
    meetingPurpose: 'Security protocols briefing and compliance requirements overview. Access management and security best practices.',
    priority: 'medium',
    suggestedMeetingDuration: '45 minutes',
    availableTimeSlots: ['Friday 9:00 AM', 'Monday 10:00 AM', 'Monday 2:00 PM'],
    meetingStatus: 'pending',
    aiReasoning: 'Security awareness critical for all engineering roles - MoneyForward handles sensitive financial data.',
  },
];

function getPriorityVariant(priority: string) {
  switch (priority) {
    case 'high': return 'error';
    case 'medium': return 'warning';
    case 'low': return 'info';
    default: return 'info';
  }
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'completed': return 'success';
    case 'scheduled': return 'warning';
    case 'pending': return 'info';
    default: return 'info';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'completed': return '✓ Completed';
    case 'scheduled': return '📅 Scheduled';
    case 'pending': return '⏳ Pending';
    default: return status;
  }
}

export function KeyPeopleTemplate() {
  const [people, setPeople] = useState(KEY_PEOPLE_SUGGESTIONS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleScheduleMeeting = (personId: string) => {
    setPeople(prev => prev.map(person => 
      person.id === personId 
        ? { ...person, meetingStatus: 'scheduled' as const }
        : person
    ));
  };

  const handleMarkCompleted = (personId: string) => {
    setPeople(prev => prev.map(person => 
      person.id === personId 
        ? { ...person, meetingStatus: 'completed' as const }
        : person
    ));
  };

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedMeetings = people.filter(p => p.meetingStatus === 'completed').length;
  const scheduledMeetings = people.filter(p => p.meetingStatus === 'scheduled').length;
  const pendingMeetings = people.filter(p => p.meetingStatus === 'pending').length;

  return (
    <>
      <DocumentTitle title="Key People to Meet - Smart Onboarding Assistant" />
      <PageLayout>
        <PageLayout.Header>
          <VStack spacing={0}>
            <h1>Key People to Meet</h1>
            <p>AI-curated introductions for {EMPLOYEE_DATA.name} ({EMPLOYEE_DATA.role})</p>
          </VStack>
        </PageLayout.Header>
        
        <PageLayout.Body>
          <VStack spacing="container">
            {/* Progress Summary */}
            <div className={styles.summaryCard}>
              <h2>Meeting Progress</h2>
              <div className={styles.summaryStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{completedMeetings}</div>
                  <div className={styles.statLabel}>Completed</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{scheduledMeetings}</div>
                  <div className={styles.statLabel}>Scheduled</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{pendingMeetings}</div>
                  <div className={styles.statLabel}>Pending</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>{people.length}</div>
                  <div className={styles.statLabel}>Total</div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className={styles.searchSection}>
              <TextBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, role, or department..."
              />
            </div>

            {/* Key People List */}
            <VStack spacing="paragraph">
              <h3>AI-Recommended Introductions</h3>
              
              {filteredPeople.map(person => (
                <div key={person.id} className={styles.personCard}>
                  <div className={styles.personHeader}>
                    <VStack spacing={0}>
                      <h4>{person.name}</h4>
                      <span className={styles.personRole}>
                        {person.role} • {person.department}
                      </span>
                    </VStack>
                    <HStack spacing="horizontal.1">
                      <StatusLabel 
                        variant={getPriorityVariant(person.priority)} 
                        size="small"
                      >
                        {person.priority} priority
                      </StatusLabel>
                      <StatusLabel 
                        variant={getStatusVariant(person.meetingStatus)} 
                        size="small"
                      >
                        {getStatusLabel(person.meetingStatus)}
                      </StatusLabel>
                    </HStack>
                  </div>

                  <div className={styles.personContent}>
                    <div className={styles.meetingPurpose}>
                      <h5>Meeting Purpose</h5>
                      <p>{person.meetingPurpose}</p>
                    </div>

                    <div className={styles.aiInsight}>
                      <h5>AI Reasoning</h5>
                      <p className={styles.aiReasoning}>{person.aiReasoning}</p>
                    </div>

                    <div className={styles.meetingDetails}>
                      <div className={styles.detailItem}>
                        <strong>Suggested Duration:</strong> {person.suggestedMeetingDuration}
                      </div>
                      <div className={styles.detailItem}>
                        <strong>Contact:</strong> 
                        <TextLink href={`mailto:${person.email}`}>{person.email}</TextLink>
                        {person.slackHandle && (
                          <span> • Slack: {person.slackHandle}</span>
                        )}
                      </div>
                    </div>

                    {person.meetingStatus === 'pending' && (
                      <div className={styles.availableSlots}>
                        <h5>Available Time Slots</h5>
                        <HStack spacing="horizontal.1" className={styles.timeSlots}>
                          {person.availableTimeSlots.map((slot, index) => (
                            <Button 
                              key={index}
                              priority="tertiary" 
                              size="small"
                              onClick={() => handleScheduleMeeting(person.id)}
                            >
                              {slot}
                            </Button>
                          ))}
                        </HStack>
                      </div>
                    )}

                    <HStack spacing="horizontal.2" className={styles.personActions}>
                      {person.meetingStatus === 'pending' && (
                        <>
                          <Button 
                            priority="primary" 
                            size="small"
                            onClick={() => handleScheduleMeeting(person.id)}
                          >
                            Schedule Meeting
                          </Button>
                          <Button priority="secondary" size="small">
                            Send Introduction Email
                          </Button>
                        </>
                      )}
                      
                      {person.meetingStatus === 'scheduled' && (
                        <>
                          <Button 
                            priority="primary" 
                            size="small"
                            onClick={() => handleMarkCompleted(person.id)}
                          >
                            Mark as Completed
                          </Button>
                          <Button priority="secondary" size="small">
                            Reschedule
                          </Button>
                        </>
                      )}

                      {person.meetingStatus === 'completed' && (
                        <Button priority="tertiary" size="small">
                          View Meeting Notes
                        </Button>
                      )}
                    </HStack>
                  </div>
                </div>
              ))}
            </VStack>

            {/* Additional Actions */}
            <div className={styles.additionalActions}>
              <h3>Need More Connections?</h3>
              <HStack spacing="horizontal.2">
                <Button priority="secondary">
                  Request Additional Suggestions
                </Button>
                <Button priority="secondary">
                  Browse Company Directory
                </Button>
                <Button priority="secondary">
                  Schedule Team Coffee Chat
                </Button>
              </HStack>
            </div>
          </VStack>
        </PageLayout.Body>
      </PageLayout>
    </>
  );
}