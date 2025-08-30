# MFV Hackathon UX Agent

A collection of UX/UI prototypes and agent tools developed for Money Forward's hackathon, focusing on AI-powered personalization and department-level reporting solutions.

## Project Overview

This repository contains multiple interconnected prototypes and tools designed to showcase innovative UX approaches for enterprise software:

### AI Onboarding Tool
**Location:** `ai-onboarding-prototype/`  
**Tech Stack:** React 19, TypeScript, MFUI Components, Vite

An AI-powered onboarding personalization demo that transforms generic employee onboarding into intelligent, role-specific experiences. Features dual dashboards for HR managers and employees with mock AI-generated content showcasing personalized checklists, buddy assignments, and department-specific resources.

**Key Features:**
- Smart department template customization
- Dual-zone navigation (HR/Employee views)
- Mock AI-generated personalized content
- Interactive role/department scenario switching

### Department Reporting Prototype
**Location:** `department-reporting-prototype/`  
**Tech Stack:** React 19, TypeScript, MFUI Components, Vite

A sophisticated lease cost allocation and department-level reporting system prototype. Enables finance directors to track lease costs across departments with automated allocation methodologies and interactive dashboards for real-time analysis.

**Key Features:**
- Automated cost allocation (headcount, square footage, revenue-based)
- Interactive departmental dashboards with KPI cards
- Drill-down navigation from executive summary to contract details
- Space utilization analytics and scenario modeling

### UX Agent Tools
**Location:** `ux-agent-cli/`, `ux-agent-web/`, `ux-agent-result/`  

Supporting tools and utilities for UX agent development and testing, including CLI interfaces and web-based result visualization.

## Quick Start

### Prerequisites
- Node.js >= 18.0.0 (AI Onboarding) / >= 20.0.0 (Department Reporting)
- pnpm >= 9.0.0

### Running the AI Onboarding Prototype

```bash
cd ai-onboarding-prototype
pnpm install
pnpm start
```

The application will be available at `http://localhost:5173`

### Running the Department Reporting Prototype

```bash
cd department-reporting-prototype
pnpm install
pnpm start
```

The application will be available at `http://localhost:5173`

## Development

### Available Scripts

Each prototype includes the following npm scripts:

- `pnpm start` - Start development server with hot reload and type checking
- `pnpm build` - Build for production
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run linting (Prettier, ESLint, Stylelint)
- `pnpm format` - Format code with auto-fix
- `pnpm storybook` - Start Storybook component documentation
- `pnpm test` - Run Vitest unit tests

### Tech Stack Details

**Frontend Framework:** React 19 with TypeScript  
**Build Tool:** Vite 6  
**UI Components:** Money Forward UI (MFUI) Components  
**Styling:** CSS Modules with MFUI Design Tokens  
**State Management:** Constate  
**Routing:** React Router 7  
**Testing:** Vitest  
**Documentation:** Storybook 9  

## Documentation

### Product Requirements
- **AI Onboarding:** Complete PRD and technical specs in `ai-onboarding-docs/`
- **Department Reporting:** Comprehensive PRD with ROI analysis in `department-reporting-docs/`

### Architecture
Both prototypes follow modern React patterns with:
- Component-driven architecture
- TypeScript for type safety
- CSS Modules for styling isolation
- Storybook for component documentation
- Comprehensive testing setup

## Project Structure

```
mfv-hackathon-ux-agent/
ai-onboarding-docs/          # AI Onboarding documentation
ai-onboarding-prototype/     # React app for AI onboarding demo
department-reporting-docs/   # Department reporting documentation  
department-reporting-prototype/ # React app for reporting prototype
ux-agent-cli/               # CLI tools for UX agent
ux-agent-web/               # Web interface for UX agent
ux-agent-result/            # Result visualization tools
web-bundles/                # Web bundle utilities
```

## Contributing

This is a hackathon project focusing on rapid prototyping and demonstration of UX concepts. Both prototypes use static mock data and are designed for demo purposes rather than production deployment.

### Development Guidelines
- Follow existing code patterns and component structure
- Use MFUI components and design tokens consistently  
- Maintain TypeScript strict mode compliance
- Add Storybook stories for new components
- Include unit tests for business logic

## License

UNLICENSED - Internal Money Forward hackathon project
