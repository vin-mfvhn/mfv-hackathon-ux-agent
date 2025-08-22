# Epic 1: Foundation - Cost Allocation Engine & Configuration
## User Stories

### Story 1.1: Core Cost Allocation Algorithm Implementation

**User Story:**
As a Finance Director,
I want the system to automatically calculate department-level lease costs using configurable allocation methods,
So that I can distribute lease expenses accurately across organizational units without manual Excel calculations.

**Story Context:**

**Existing System Integration:**
- Integrates with: Contract, Department, and Office entities in `app/domain/entity/`
- Technology: Go backend, GORM ORM, MySQL database
- Follows pattern: Existing calculation services in `app/domain/service/contract/`
- Touch points: Contract repository, Department repository, Payment calculations

**Acceptance Criteria:**

**Functional Requirements:**
1. System calculates department lease costs using square footage allocation method with configurable percentages
2. System calculates department lease costs using headcount allocation method with configurable ratios
3. System calculates department lease costs using revenue-based allocation with configurable percentages
4. System supports custom allocation formulas combining multiple methods (e.g., 60% sqft + 30% headcount + 10% revenue)
5. All allocation calculations maintain precision to 2 decimal places for currency values
6. System validates that allocation percentages sum to 100% across all departments per location

**Integration Requirements:**
7. Existing Contract and Department entities continue to work unchanged
8. New allocation calculations integrate with existing payment schedule services
9. Integration with existing office-based multi-tenancy maintains data isolation

**Quality Requirements:**
10. All allocation calculations are covered by unit tests with edge cases
11. Calculation performance completes within 30 seconds for up to 100 leases per allocation run
12. No regression in existing lease management functionality verified through integration tests

**Technical Notes:**
- **Integration Approach:** Create new `AllocationService` in `app/domain/service/allocation/` following existing service patterns
- **Database Schema:** Add `allocation_settings` and `department_allocations` tables with existing schema patterns
- **Existing Pattern Reference:** Follow calculation patterns from `app/domain/service/contract/calculation.go`
- **Key Constraints:** Must respect existing office-based tenant isolation and audit trail requirements

**Definition of Done:**
- [ ] Core allocation algorithms implemented for all 4 methods (sqft, headcount, revenue, custom)
- [ ] Database schema supports allocation settings with proper indexing
- [ ] Service layer integrates seamlessly with existing contract services  
- [ ] Unit tests achieve >95% coverage for allocation logic
- [ ] Performance benchmarks meet 30-second SLA for 100 leases
- [ ] Integration tests verify existing functionality remains intact

---

### Story 1.2: Allocation Configuration API and Data Layer

**User Story:**
As a System Administrator,
I want secure APIs to manage cost allocation configurations and persist allocation settings,
So that finance teams can configure allocation rules through the application interface.

**Story Context:**

**Existing System Integration:**
- Integrates with: Existing API handler patterns in `app/interface/api/handler/`
- Technology: Go Gin framework, JWT authentication, MySQL with GORM
- Follows pattern: Existing CRUD handlers like `contract_handler.go`
- Touch points: Authentication middleware, database repositories, API routing

**Acceptance Criteria:**

**Functional Requirements:**
1. Create allocation configuration API endpoints (GET, POST, PUT, DELETE) with proper HTTP status codes
2. Validate allocation configuration data with comprehensive error messages for invalid input
3. Persist allocation settings with office-level isolation and audit trail logging
4. Support retrieving active allocation configurations filtered by office and date ranges
5. Implement soft delete for allocation configurations to maintain historical audit trail
6. Support versioning of allocation configurations to track changes over time

**Integration Requirements:**
7. API endpoints follow existing authentication and authorization patterns
8. Database operations use existing GORM patterns and transaction management
9. Integration with existing audit trail system in `app/utils/gormutil/callbacks.go`

**Quality Requirements:**
10. API endpoints include comprehensive input validation and error handling
11. Database queries are optimized with appropriate indexing strategy
12. All API operations covered by integration tests with authentication scenarios

**Technical Notes:**
- **Integration Approach:** Create `AllocationConfigHandler` following existing handler patterns
- **Database Schema:** Extend existing audit patterns with `created_by`, `updated_by`, `deleted_at` fields
- **Existing Pattern Reference:** Mirror structure of `app/interface/api/handler/contract/contract_handler.go`
- **Key Constraints:** Must implement office-based tenant isolation and maintain audit compliance

**Definition of Done:**
- [ ] RESTful API endpoints implemented with proper HTTP methods and status codes
- [ ] Allocation configuration repository with CRUD operations and soft delete
- [ ] Database migrations create allocation tables with proper constraints and indexes
- [ ] JWT authentication integrated with existing middleware patterns
- [ ] Comprehensive API tests cover all endpoints including error scenarios
- [ ] API documentation updated in existing OpenAPI specification

---

### Story 1.3: Interactive Allocation Configuration User Interface

**User Story:**
As a Finance Director,
I want an interactive web interface to configure cost allocation rules with real-time preview,
So that I can easily set up and modify department cost allocations without technical assistance.

**Story Context:**

**Existing System Integration:**
- Integrates with: Existing frontend framework and UI components
- Technology: Frontend framework (matching existing), API client patterns
- Follows pattern: Existing form interfaces and configuration screens
- Touch points: API client layer, existing UI component library, routing

**Acceptance Criteria:**

**Functional Requirements:**
1. Configuration form allows users to select allocation methods (sqft, headcount, revenue, custom)
2. Real-time percentage sliders update allocation preview as users adjust values
3. Department assignment interface maps departments to allocation percentages with validation
4. Preview calculation shows expected cost distribution before saving configuration
5. Form validation prevents saving configurations where percentages don't sum to 100%
6. Success/error feedback confirms configuration saves or displays detailed error messages

**Integration Requirements:**
7. UI follows existing Money Forward design system and component patterns
8. Form submission integrates with allocation configuration APIs
9. Real-time preview calculations use existing API patterns for data fetching

**Quality Requirements:**
10. Interface is fully responsive and functional on mobile devices
11. Form state management prevents data loss during session interruption
12. UI components are accessible following WCAG 2.1 AA standards

**Technical Notes:**
- **Integration Approach:** Create new configuration component using existing form patterns
- **Component Structure:** Follow existing form components in frontend framework
- **Existing Pattern Reference:** Mirror existing settings/configuration UI patterns
- **Key Constraints:** Must maintain existing design consistency and mobile responsiveness

**Definition of Done:**
- [ ] Interactive allocation configuration form implemented with real-time preview
- [ ] Percentage sliders and input fields with proper validation and error messaging
- [ ] Department mapping interface with drag-and-drop or selection UI
- [ ] Real-time preview calculations display accurate cost distribution
- [ ] Form submission handling with loading states and success/error feedback
- [ ] Mobile-responsive design tested across major device sizes

---

### Story 1.4: Basic Executive Dashboard with Cost Overview

**User Story:**
As a Finance Director,
I want a dashboard showing high-level department cost summaries and key performance indicators,
So that I can quickly assess lease cost distribution and identify areas needing attention.

**Story Context:**

**Existing System Integration:**
- Integrates with: Existing dashboard components and data visualization patterns
- Technology: Frontend framework with charting library, existing API client patterns
- Follows pattern: Existing dashboard layouts and KPI card designs
- Touch points: Allocation APIs, existing chart components, dashboard routing

**Acceptance Criteria:**

**Functional Requirements:**
1. Dashboard displays total lease costs across all departments with period-over-period comparison
2. KPI cards show key metrics: total cost, cost per square foot, largest cost center, budget variance
3. Department summary table lists top 10 cost centers with current spend and percentage of total
4. Visual indicators (red/yellow/green) highlight departments exceeding budget thresholds
5. Time period selector allows viewing monthly, quarterly, or yearly cost summaries
6. Dashboard data refreshes automatically every 30 seconds for real-time monitoring

**Integration Requirements:**
7. Dashboard integrates with allocation calculation APIs for real-time data
8. Follows existing dashboard component patterns and layout structure
9. Chart components use existing visualization library and styling

**Quality Requirements:**
10. Dashboard loads initial data within 3 seconds for responsive user experience
11. All data visualizations are accessible with proper ARIA labels and keyboard navigation
12. Dashboard layout adapts gracefully to different screen sizes and orientations

**Technical Notes:**
- **Integration Approach:** Create new dashboard component using existing dashboard framework
- **Data Management:** Use existing API client patterns for data fetching and caching
- **Existing Pattern Reference:** Follow existing dashboard layouts and KPI card designs
- **Key Constraints:** Must maintain existing performance standards and accessibility requirements

**Definition of Done:**
- [ ] Executive dashboard displays comprehensive cost overview with KPI cards
- [ ] Department summary table shows top cost centers with visual indicators
- [ ] Time period selector enables historical cost analysis
- [ ] Real-time data refresh maintains current cost information
- [ ] Dashboard performance meets 3-second load time requirement
- [ ] Responsive design works across desktop, tablet, and mobile devices

---

### Story 1.5: Audit Trail System for Allocation Changes

**User Story:**
As a Compliance Manager,
I want complete audit trails of all cost allocation changes with user attribution and timestamps,
So that I can maintain compliance with financial reporting requirements and track allocation decisions.

**Story Context:**

**Existing System Integration:**
- Integrates with: Existing audit trail system in `app/utils/gormutil/callbacks.go`
- Technology: GORM callbacks, MySQL audit tables, existing logging infrastructure
- Follows pattern: Existing audit patterns for contract and payment changes
- Touch points: Allocation services, database callbacks, audit reporting

**Acceptance Criteria:**

**Functional Requirements:**
1. System logs all allocation configuration changes with user ID, timestamp, and change details
2. Audit trail captures before/after values for allocation percentage changes
3. System logs allocation calculation runs with input parameters and results
4. Audit history supports querying by date range, user, and change type
5. Audit trail includes business reason field for major allocation changes
6. System maintains audit data for minimum 7 years for compliance requirements

**Integration Requirements:**
7. Audit logging integrates with existing GORM callback patterns
8. Uses existing user authentication context for user attribution
9. Follows existing audit table naming and structure conventions

**Quality Requirements:**
10. Audit logging doesn't impact allocation calculation performance
11. Audit data integrity maintained through database constraints and validation
12. Audit queries support efficient reporting with proper indexing

**Technical Notes:**
- **Integration Approach:** Extend existing audit callback system for allocation entities
- **Database Schema:** Create audit tables following existing `*_audit` table patterns
- **Existing Pattern Reference:** Mirror audit patterns from contract and payment entities
- **Key Constraints:** Must maintain audit data integrity and query performance

**Definition of Done:**
- [ ] Audit logging captures all allocation configuration and calculation changes
- [ ] Audit trail includes comprehensive change details with before/after values
- [ ] Database audit tables created with proper constraints and retention policies
- [ ] Audit queries support compliance reporting with efficient performance
- [ ] Integration with existing audit callback system maintains consistency
- [ ] Audit data retention and archival processes defined and implemented

---

### Story 1.6: Performance Optimization and Caching Layer

**User Story:**
As a System Administrator,
I want allocation calculations to complete within performance SLAs with caching for frequently accessed data,
So that the system can handle production workloads without impacting user experience.

**Story Context:**

**Existing System Integration:**
- Integrates with: Existing Redis caching layer and performance monitoring
- Technology: Redis caching, Go concurrency patterns, database query optimization
- Follows pattern: Existing caching strategies for contract and payment data
- Touch points: Allocation services, Redis client, database queries, monitoring

**Acceptance Criteria:**

**Functional Requirements:**
1. Allocation calculations complete within 30 seconds for up to 100 leases per run
2. Dashboard data loads within 3 seconds using cached allocation results
3. System caches allocation results with 15-minute TTL for frequently accessed data
4. Cache invalidation occurs immediately when allocation configurations change
5. Concurrent allocation requests are queued and processed efficiently without conflicts
6. System provides progress indicators for long-running allocation calculations

**Integration Requirements:**
7. Caching integrates with existing Redis infrastructure and patterns
8. Performance monitoring uses existing metrics and alerting systems
9. Database queries optimized with appropriate indexes and query patterns

**Quality Requirements:**
10. System maintains sub-second response times for cached data requests
11. Memory usage remains stable under sustained high allocation calculation loads
12. Error handling prevents cache corruption and provides graceful degradation

**Technical Notes:**
- **Integration Approach:** Extend existing Redis caching patterns for allocation data
- **Performance Strategy:** Implement background job processing for expensive calculations
- **Existing Pattern Reference:** Follow caching patterns from existing payment calculation services
- **Key Constraints:** Must maintain existing system stability and resource usage patterns

**Definition of Done:**
- [ ] Allocation calculations meet 30-second SLA for 100-lease workloads
- [ ] Dashboard data loading achieves 3-second target through effective caching
- [ ] Redis caching implemented with proper TTL and invalidation strategies
- [ ] Database queries optimized with performance benchmarking
- [ ] Concurrent request handling prevents system overload and conflicts
- [ ] Performance monitoring and alerting integrated with existing systems

---

## Epic 1 Summary

**Total Stories:** 6
**Estimated Timeline:** 2 months
**Dependencies:** None (Foundation Epic)
**Critical Path:** Story 1.1 → 1.2 → 1.3, with 1.4, 1.5, 1.6 in parallel

**Epic 1 enables:**
- Epic 2 (Core Reporting) - requires allocation data and configuration
- All subsequent epics - foundational requirement