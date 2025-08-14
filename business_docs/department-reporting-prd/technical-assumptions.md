# Technical Assumptions

## Repository Structure
**Monorepo** - Extend existing Money Forward Lease Accounting system within current repository structure

## Service Architecture  
**Enhanced Monolith** - Add department reporting services to existing Go backend architecture, leveraging current MySQL database and domain entities (Contract, Department, Office)

## Testing Requirements
**Unit + Integration Testing** - Extend existing test coverage to include cost allocation algorithms, dashboard APIs, and ERP integration components

## Additional Technical Assumptions
- Leverage existing GORM ORM and MySQL database schema
- Extend current JWT authentication and authorization system
- Utilize existing Redis caching layer for report performance
- Build upon current Kafka messaging for workflow notifications
- Integrate with existing AWS S3 for report storage and export
- Support existing multi-tenant (office-based) architecture
- Maintain compatibility with current API versioning strategy
