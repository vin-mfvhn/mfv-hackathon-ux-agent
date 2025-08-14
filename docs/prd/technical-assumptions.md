# Technical Assumptions

## Repository Structure: Monorepo
Leverage existing BMAD system monorepo structure for consistency and simplified dependency management across agents.

## Service Architecture
Agent-based microservices architecture within BMAD framework. Each agent (MFUI UX Expert, Product Builder) operates as independent service with shared knowledge base and template engine components.

## Testing Requirements
Unit testing for component recommendation logic, integration testing for template generation, manual testing convenience methods for PdM/PO workflow validation. Focus on accuracy of generated outputs and compliance validation.

## Additional Technical Assumptions and Requests
- Access to MFUI repository for real-time component data synchronization
- Integration with LA Frontend codebase for pattern extraction and validation
- Structured storage system for template versioning and customization
- API compatibility with existing BMAD agent orchestration system
- Performance monitoring for recommendation accuracy and generation speed
- Knowledge base update automation to maintain currency with MFUI evolution
