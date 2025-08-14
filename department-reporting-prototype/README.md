# Department-Level Reporting & Cost Center Allocation Prototype

A comprehensive prototype for enterprise lease cost management built with MoneyForward MFUI components and React Router 7.

## Features

- **Executive Dashboard**: KPI cards, variance alerts, and department breakdown analysis
- **Department Manager Portal**: Self-service cost visibility and budget tracking  
- **Allocation Configuration**: Interactive cost allocation setup with real-time preview
- **Advanced Analytics**: Space utilization and scenario modeling
- **Mobile-First Design**: Fully responsive MFUI implementation

## Target Users

- **Finance Directors**: Executive reporting and strategic decision-making
- **Department Managers**: Self-service lease cost visibility
- **System Administrators**: Cost allocation configuration and management
- **Real Estate Managers**: Portfolio optimization and space planning

## Technology Stack

- **Frontend**: React 19 + React Router 7
- **UI Components**: MoneyForward MFUI Component Library v2.0
- **Design System**: MFUI Design Tokens v2.0
- **Styling**: CSS Modules with MFUI patterns
- **Build Tool**: Vite
- **Type Safety**: TypeScript

## Key Components

### Executive Dashboard (`/executive`)
- Cost overview KPIs with variance indicators
- Department breakdown table with drill-down navigation
- Trend analysis charts
- Export functionality for executive reports

### Department Manager Portal (`/my-department`)
- Personal department cost summary
- Budget tracking and utilization metrics
- Upcoming lease renewals
- Space utilization analytics

### Allocation Configuration (`/allocation`)
- Interactive allocation method selection
- Real-time preview of cost distribution
- Department mapping interface
- Validation and audit trail

### Report Center (`/reports`)
- Report template library
- Scheduled report management
- Export center with multiple formats

## Running the Prototype

### Prerequisites

| Module                   | Version                              |
| :----------------------- | :----------------------------------- |
| Node.js                  | 22.16.0                             |
| [pnpm](https://pnpm.io/) | 10.11.0                             |

### Setup

#### 1. Install dependencies

```sh
corepack enable # if pnpm is not installed
pnpm install
```

#### 2. Start development server

```sh
pnpm start
```

Open [http://localhost:3001](http://localhost:3001) to view the prototype.

### Development Commands

```sh
# Start development with live reload
pnpm start

# Build for production
pnpm build

# Run Storybook component catalog
pnpm storybook

# Type checking
pnpm typecheck

# Linting and formatting
pnpm lint
pnpm format

# Testing
pnpm test
```

## Architecture

### Directory Structure

```
src/
├── routes/                 # Page components following React Router 7 patterns
│   ├── executive/         # Executive Dashboard
│   ├── my-department/     # Department Manager Portal  
│   ├── allocation/        # Allocation Configuration
│   └── reports/           # Report Center
├── components/            # Reusable MFUI-based components
│   ├── DepartmentCostTable/
│   ├── AllocationPreviewCard/
│   └── CostTrendChart/
├── layouts/               # Layout components
│   └── DepartmentReporting/
├── api/                   # API client functions
├── types/                 # TypeScript definitions
└── styles/                # Global styles and CSS modules
```

### Design Patterns

- **MFUI Component Library**: Exclusive use of MoneyForward design system components
- **LA Frontend Patterns**: List pages, CRUD forms, detail pages, dashboard pages, sidepane workflows
- **Responsive Design**: Mobile-first approach with MFUI breakpoints
- **Progressive Disclosure**: Essential information first, drill-down for details

## User Flows

### Finance Director Workflow
1. **Login** → Executive Dashboard
2. **Review KPIs** → Identify high variance departments  
3. **Drill Down** → Department → Location → Contract details
4. **Export Report** → Executive summary for board presentation

### Department Manager Workflow  
1. **Access Portal** → My Department costs
2. **Review Budget** → Check variance and utilization
3. **Plan Renewals** → Upcoming lease expirations
4. **Request Changes** → Space modification workflow

### Administrator Workflow
1. **Configure Allocation** → Method selection and percentages
2. **Preview Impact** → Real-time calculation validation
3. **Save Configuration** → Audit trail and notifications
4. **Monitor System** → Exception reporting and resolution

## Implementation Notes

Based on the comprehensive business requirements in `business_docs/`:

- **Epic 1 Foundation**: Cost allocation engine with interactive configuration (Months 1-2)
- **Epic 2 Core Reporting**: Executive dashboards and department portals (Months 2-3)  
- **Epic 3 Advanced Analytics**: Space optimization and scenario modeling (Months 3-4)
- **Epic 4 Workflow Integration**: ERP integration and approval workflows (Months 4-5)
- **Epic 5 Portfolio Intelligence**: Multi-location optimization (Months 5-6)

This prototype focuses on **Epic 1 & 2 functionality** to demonstrate the core user experience and technical feasibility.

## Contact

For questions about this prototype or the Department Reporting requirements:

- **Business Requirements**: Refer to `business_docs/department-reporting-prd.md`
- **Technical Specifications**: See `business_docs/department-reporting-mfui-frontend-spec.md`
- **Epic Breakdown**: Review `business_docs/department-reporting-epics.md`