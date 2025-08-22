# Smart Onboarding Assistant Brownfield Enhancement PRD

## Intro Project Analysis and Context

### Existing Project Overview

**Analysis Source**: IDE-based fresh analysis combined with comprehensive brainstorming session results

**Current Project State**: MoneyForward hackathon project developing a Smart Onboarding Assistant - an AI-powered tool for creating personalized onboarding checklists, tracking probation goals, managing tasks and readings, facilitating access provisioning, and connecting new hires with key people. **Analysis of existing onboarding data reveals a structured 18-checkpoint process across 4 timeframes (Day 1, First 5 Days, 2 Weeks, 1-2 Months) currently managed manually for 25+ employees in the Sept-Oct 2025 cohort.** The project aims to solve visibility gaps between new hires, HR, and managers during onboarding.

### Available Documentation Analysis

**Available Documentation**:

- ✓ Comprehensive brainstorming session results with demo scenarios
- ✓ Core problem analysis and root cause identification  
- ✓ Demo-ready feature set definition
- ✓ Technical implementation approach
- ✓ Success metrics and demo flow
- ✓ **Real onboarding data analysis from MoneyForward's existing 18-step process**
- ✓ **Department structure and manager assignments (Charlie, Dave, James, Ness, Bamboo, Harry)**
- ✓ **Role hierarchy and grade mappings (Engineer Grade 3-5, Information Security Manager)**
- ◯ Tech Stack Documentation (to be determined)
- ◯ API Documentation (to be created)
- ◯ UX/UI Guidelines (to be developed)

### Enhancement Scope Definition

**Enhancement Type**:
- ✓ New Feature Addition
- ✓ Integration with New Systems (HR systems)

**Enhancement Description**: Building a comprehensive Smart Onboarding Assistant that generates role-based personalized onboarding checklists, provides real-time progress tracking across multiple stakeholder views (HR, Manager, New Hire), and automates key people introductions and document assignments.

**Impact Assessment**:
- ✓ Major Impact (architectural changes required for multi-stakeholder system)

### Goals and Background Context

**Goals**:

- Eliminate visibility gaps between new hires and HR/managers on onboarding completion status
- Generate personalized onboarding checklists in <5 seconds based on MoneyForward's existing 18-step framework plus role-specific additions
- Provide real-time completion tracking with color-coded status across stakeholder views for the 4-tier timeline (Day 1, First 5 Days, 2 Weeks, 1-2 Months)
- Automate department manager assignments (Charlie→HRS, Dave→AA, James→Tech Director Office, etc.) and key people matching
- Streamline document assignment with read-confirmation and progress tracking integrated with MFJ program workflows
- **Support existing MoneyForward role structure (Engineers Grade 3-5, Information Security Managers, Senior Accelerators) across 12+ departments**

**Background Context**: Current onboarding processes suffer from scattered information across multiple systems, manual tracking processes, lack of centralized progress dashboards, and unclear completion criteria. This creates frustration for new hires, inefficiencies for HR, and blind spots for managers. The Smart Onboarding Assistant addresses these pain points through AI-driven personalization and real-time visibility.

### Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|--------|
| Initial PRD Creation | 2025-08-14 | 1.0 | Created comprehensive PRD from brainstorming session results | John (PM) |
| Real Data Integration | 2025-08-14 | 1.1 | Updated PRD with insights from existing 18-step onboarding process CSV analysis | Mary (BA) |

## Requirements

### Functional

**FR1**: The system shall generate personalized onboarding checklists in under 5 seconds based on department and role input  
**FR2**: The system shall provide separate dashboard views for HR, Manager, and New Hire stakeholders with role-appropriate information  
**FR3**: The system shall track completion status in real-time with color-coded indicators (Red/Yellow/Green)  
**FR4**: The system shall suggest 3-5 key people to meet based on role with contact information and meeting purpose  
**FR5**: The system shall automatically assign role-based required reading lists with PDF links and read-confirmation tracking  
**FR6**: The system shall send notifications via email/Slack for incomplete onboarding items  
**FR7**: The system shall support calendar integration for easy meeting scheduling with suggested contacts  
**FR8**: The system shall maintain audit trail of all onboarding activities and completions
**FR9**: The system shall support MoneyForward's existing 18-step onboarding framework while allowing role-based customization and additions
**FR10**: The system shall integrate with existing MFJ program workflows and BO Director meeting scheduling processes
**FR11**: The system shall accommodate MoneyForward's 4-tier timeline structure (Day 1: 10 items, First 5 Days: 8 items, 2 Weeks: MFJ/BO meetings, 1-2 Months: Culture/Probation)
**FR12**: The system shall automatically assign appropriate department managers (Charlie, Dave, James, Ness, Bamboo, Harry) based on new hire's department assignment

### Non Functional

**NFR1**: System shall maintain 99.5% uptime during business hours to ensure reliable onboarding support  
**NFR2**: Checklist generation must complete within 5 seconds to provide immediate value  
**NFR3**: Dashboard views must load within 2 seconds to ensure responsive user experience  
**NFR4**: System must support concurrent access by up to 100 users without performance degradation  
**NFR5**: All data must be encrypted in transit and at rest following MoneyForward security standards  
**NFR6**: System must integrate with existing MoneyForward authentication and authorization systems

### Compatibility Requirements

**CR1**: Must maintain compatibility with existing MoneyForward HR systems and user directories  
**CR2**: Must integrate with existing calendar systems (Outlook/Google Calendar) without breaking current workflows  
**CR3**: Must follow MoneyForward UI/UX design system for consistent user experience  
**CR4**: Must support existing notification channels (email/Slack) already in use by organization

## User Interface Enhancement Goals

### Integration with Existing UI

New UI components will leverage MoneyForward's existing design system, utilizing established patterns for dashboards, forms, and notification systems. The interface will maintain consistency with current MoneyForward applications through shared component libraries and styling frameworks.

### Modified/New Screens and Views

**New Screens**:
- Onboarding Checklist Generator (role/department input form)
- HR Dashboard (aggregate view of all new hires and their progress)
- Manager Dashboard (team-specific onboarding progress view)
- Employee Dashboard (personal onboarding checklist and progress)
- Key People Directory (suggested contacts with meeting scheduling)

### UI Consistency Requirements

- All dashboards must use MoneyForward's standard color scheme and typography
- Form inputs must follow established validation and error messaging patterns
- Progress indicators must align with existing status display conventions
- Navigation must integrate seamlessly with MoneyForward's application structure

## Technical Constraints and Integration Requirements

### Existing Technology Stack

**Languages**: TypeScript, JavaScript  
**Frameworks**: React (frontend), Node.js (backend)  
**Database**: PostgreSQL (primary), Redis (caching)  
**Infrastructure**: AWS/Cloud hosting with Docker containers  
**External Dependencies**: MoneyForward authentication services, calendar APIs, notification services

### Integration Approach

**Database Integration Strategy**: Extend existing HR database schema with new onboarding tables while maintaining referential integrity with employee records  
**API Integration Strategy**: Create RESTful APIs that integrate with existing MoneyForward microservices architecture  
**Frontend Integration Strategy**: Develop React components using MoneyForward's component library and state management patterns  
**Testing Integration Strategy**: Implement comprehensive unit and integration tests following existing MoneyForward testing frameworks

### Code Organization and Standards

**File Structure Approach**: Follow MoneyForward's established microservices architecture with separate services for checklist generation, progress tracking, and notifications  
**Naming Conventions**: Adhere to MoneyForward's camelCase JavaScript conventions and kebab-case for component files  
**Coding Standards**: Follow existing ESLint and Prettier configurations with TypeScript strict mode  
**Documentation Standards**: Use JSDoc for code documentation and maintain API documentation using OpenAPI specifications

### Deployment and Operations

**Build Process Integration**: Integrate with existing CI/CD pipeline using GitHub Actions and MoneyForward's deployment tools  
**Deployment Strategy**: Blue-green deployment approach aligned with MoneyForward's release management process  
**Monitoring and Logging**: Utilize existing monitoring stack (DataDog/New Relic) with structured logging for onboarding events  
**Configuration Management**: Use MoneyForward's existing configuration management system for environment-specific settings

### Risk Assessment and Mitigation

**Technical Risks**: Database performance impact from new tables, potential API rate limits from external calendar services  
**Integration Risks**: Dependency on multiple external systems (HR, calendar, notifications) creates failure points  
**Deployment Risks**: New microservices may impact existing MoneyForward infrastructure. **Business Continuity Risk**: Disrupting existing 18-step workflow could impact 25+ employees currently in pipeline (Sept-Oct 2025 cohort)  
**Mitigation Strategies**: Implement circuit breakers for external dependencies, use database connection pooling, establish rollback procedures for each deployment phase. **Phase rollout starting with new cohorts while maintaining parallel manual system for current pipeline**

## Epic and Story Structure

### Epic Approach

**Epic Structure Decision**: Single comprehensive epic approach with rationale: The Smart Onboarding Assistant represents a cohesive feature set where all components (checklist generation, progress tracking, key people matching) work together to deliver the core value proposition. Breaking this into multiple epics would create artificial boundaries and complicate the integrated user experience.

## Epic 1: Smart Onboarding Assistant Implementation

**Epic Goal**: Deliver a comprehensive Smart Onboarding Assistant that eliminates visibility gaps in the onboarding process through AI-driven personalization, real-time progress tracking, and automated stakeholder coordination.

**Integration Requirements**: Must integrate seamlessly with existing MoneyForward HR systems, authentication, and notification infrastructure while maintaining current system performance and security standards.

### Story 1.1: Role-Based Checklist Generation System

As an HR administrator,
I want to input a new hire's department and role and receive a personalized onboarding checklist in under 5 seconds,
so that I can immediately provide structured guidance without manual checklist creation.

**Acceptance Criteria**:

1. System accepts department and role inputs through intuitive interface
2. **AI generates MoneyForward's standard 18 checkpoints plus 2-7 role-specific additions within 5 seconds**
3. **Generated checklist follows 4-tier timeline: Day 1 (10 items), First 5 Days (8 items), 2 Weeks (MFJ/BO meetings), 1-2 Months (Culture/Probation)**
4. Items include clear descriptions, due dates, and responsible parties with automatic manager assignment
5. Checklist can be reviewed and modified before finalization
6. **System recognizes MoneyForward role hierarchy (Engineer Grades 3-5, Information Security Manager, Senior Accelerator) and department mappings**

**Integration Verification**:
**IV1**: Verify existing HR system user authentication continues to function normally
**IV2**: Confirm department/role data integration maintains data consistency with existing employee records
**IV3**: Validate system performance impact on existing HR operations remains within acceptable limits

### Story 1.2: Multi-Stakeholder Progress Dashboard

As a manager,
I want to view real-time onboarding progress for my new team members with color-coded status indicators,
so that I can proactively identify and address any onboarding delays or issues.

**Acceptance Criteria**:
1. Dashboard displays all direct reports currently in onboarding process
2. Color-coded indicators (Red/Yellow/Green) clearly show progress status
3. Clicking on any employee reveals detailed checklist progress
4. Dashboard updates in real-time as items are completed
5. Dashboard loads within 2 seconds with smooth user experience

**Integration Verification**:
**IV1**: Existing manager portal functionality remains unaffected by new dashboard integration
**IV2**: Real-time updates don't impact performance of other manager portal features
**IV3**: Dashboard permissions align with existing organizational hierarchy and access controls

### Story 1.3: Employee Self-Service Progress Tracking

As a new employee,
I want to view my personalized onboarding checklist and mark items as complete,
so that I can track my progress and ensure I'm meeting all requirements.

**Acceptance Criteria**:
1. Employee can access their personalized checklist through existing portal
2. Interface allows marking items complete with confirmation dialogs
3. Progress percentage updates automatically as items are completed
4. Completed items show timestamp and confirmation
5. Next priority items are clearly highlighted

**Integration Verification**:
**IV1**: Employee portal login and navigation patterns remain consistent
**IV2**: Existing employee portal features continue to function normally
**IV3**: Progress tracking data integrates properly with existing employee records

### Story 1.4: AI-Powered Key People Matching

As a new employee,
I want to receive AI-suggested introductions to 3-5 key people relevant to my role with their contact information and meeting purpose,
so that I can build essential relationships efficiently without guessing who to meet.

**Acceptance Criteria**:
1. System analyzes role requirements and suggests 3-5 key contacts
2. Each suggestion includes name, role, contact info, and meeting purpose
3. Suggestions are ranked by importance/relevance
4. Contact information integrates with existing company directory
5. Meeting scheduling links are provided for easy calendar integration

**Integration Verification**:
**IV1**: Company directory integration maintains data accuracy and security
**IV2**: Calendar system integration doesn't disrupt existing scheduling workflows
**IV3**: Suggested contacts receive appropriate notifications without overwhelming existing communication channels

### Story 1.5: Automated Document Assignment and Tracking

As an HR administrator,
I want new employees to automatically receive role-appropriate required reading materials with read-confirmation tracking,
so that I can ensure compliance training and knowledge transfer occurs systematically.

**Acceptance Criteria**:
1. System automatically assigns documents based on role and department
2. Documents are accessible through direct PDF links within the checklist
3. Read-confirmation is tracked when employees complete documents
4. Progress tracking shows which documents are pending/completed
5. Overdue documents trigger automated reminders

**Integration Verification**:
**IV1**: Document management system integration maintains existing access controls
**IV2**: PDF access doesn't interfere with existing document security protocols
**IV3**: Reminder notifications integrate with existing communication channels without duplication

### Story 1.6: Intelligent Notification and Alert System

As a manager,
I want to receive automated alerts when my new hires have overdue onboarding items or need assistance,
so that I can provide timely support and prevent onboarding delays.

**Acceptance Criteria**:
1. System sends alerts for items overdue by 24+ hours
2. Notifications are sent via existing channels (email/Slack)
3. Alert frequency is configurable to prevent notification fatigue
4. Alerts include specific details about overdue items and suggested actions
5. Escalation occurs if items remain overdue for extended periods

**Integration Verification**:
**IV1**: Notification integration doesn't duplicate existing alert systems
**IV2**: Email and Slack integrations maintain existing formatting and delivery reliability
**IV3**: Alert frequency settings don't interfere with other system notifications

### Story 1.7: Department Manager Assignment Integration

As an HR administrator,
I want the system to automatically assign appropriate department managers (Charlie, Dave, James, Ness, Bamboo, Harry) based on new hire's department,
so that proper oversight and buddy system assignments occur automatically without manual lookup.

**Acceptance Criteria**:

1. **System maintains mapping of departments to managers (HRS→Charlie, AA→Dave, Tech Director Office→James, QA→Cherry, Corp IT→Naomi, etc.)**
2. **New hire assignment automatically populates correct manager based on department selection**
3. Manager receives notification of new hire assignment with onboarding timeline
4. System supports manager hierarchy updates without code changes
5. **Integration with existing MFJ program and BO Director meeting workflows**

**Integration Verification**:

**IV1**: Manager assignment integration maintains existing HR hierarchy and reporting structures
**IV2**: Automated notifications don't duplicate existing manager communication channels  
**IV3**: Department-manager mappings align with current organizational structure from CSV data
