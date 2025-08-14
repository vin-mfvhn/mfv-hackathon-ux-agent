# Builder Agent Workflow Documentation

## Overview

This document defines the systematic workflow for the UX Expert Agent → Builder Agent pipeline, using the MoneyForward frontend-boilerplate as the foundation for prototype generation.

## Workflow Architecture

### Phase 1: UX Expert Agent (Design Phase)
**Agent**: MFUI UX Expert Agent  
**Input**: User requirements, user stories, business objectives  
**Output**: Structured design specification with component recommendations

**Responsibilities:**
- Analyze requirements for UI/UX needs
- Recommend appropriate MFUI components from 49+ component library
- Map user stories to UI patterns from LA Frontend knowledge base
- Generate structured design specifications
- Validate design compliance with MoneyForward design system

### Phase 2: Builder Agent (Implementation Phase)
**Agent**: Product Builder Agent  
**Input**: UX Expert Agent specifications + Template selection  
**Output**: Working prototype with complete project structure

**Template Foundation:**
- **Base Template**: [react-router-lib](https://github.com/moneyforward/frontend-boilerplate/tree/main/examples/react-router-lib)
- **Location**: `frontend-boilerplate/examples/react-router-lib/`
- **Copy Strategy**: Full directory duplication with selective modifications

## Template Analysis & Alignment

### ✅ Template Strengths (Aligned with Requirements)

| Requirement | Template Support | Details |
|-------------|------------------|---------|
| FR1: MFUI Components | ✅ **Native Support** | Uses `@moneyforward/mfui-components: 2.0.1` |
| FR4: Template Categories | ✅ **Structured Patterns** | Contains List, CRUD, Detail, Dashboard patterns |
| NFR3: Design Compliance | ✅ **Built-in Compliance** | Uses MFUI design tokens and patterns |
| NFR4: Integration | ✅ **Standard Architecture** | Follows MoneyForward technical standards |

### 🔧 Template Capabilities

**Technology Stack (Fully Compatible):**
- **React 19.1.0** with React Router 7.6.2
- **MFUI Integration**: Components, design tokens, and icons
- **TypeScript 5.8.3** with comprehensive type safety
- **CSS Modules** for styling (MoneyForward standard)
- **Vite** for development and build processes
- **pnpm** package management (MoneyForward standard)

**Quality Gates (Built-in):**
```json
"scripts": {
  "typecheck": "tsc --noEmit",
  "lint": "prettier + eslint + stylelint",
  "test": "vitest",
  "build": "pnpm typegen:css && pnpm typecheck && vite build",
  "start": "pnpm typegen:css -w & pnpm develop & pnpm typecheck --watch"
}
```

**Template Structure Patterns:**
```
src/
├── routes/              # 5 Core Template Categories
│   ├── dashboard/      → Dashboard Pages
│   ├── posts/          → CRUD Forms (create, edit, destroy)  
│   ├── comments/       → List Pages
│   ├── todos/          → List Pages
│   └── users/          → Detail Pages + List Pages
├── components/         # Reusable components with Storybook
├── layouts/           # Common layout patterns
├── api/               # Type-safe API client patterns
└── states/            # State management patterns
```

### ⚡ Template Gaps & Solutions

| Gap | Impact | Solution |
|-----|--------|----------|
| **SidePane Pattern** | Missing from FR4 requirements | ✅ **Buildable** - Layout structure supports SidePane implementation |
| **OpenAPI Integration** | Uses JSONPlaceholder API | ✅ **Replaceable** - Clean API abstraction layer |
| **Storybook Stories** | All components have stories | ✅ **Beneficial** - Accelerates component development |

## Detailed Workflow Steps

### UX Agent → Builder Agent Handoff

**1. UX Agent Completion Criteria:**
- [ ] Component selections mapped to MFUI library
- [ ] UI patterns identified from LA Frontend knowledge
- [ ] Template category determined (List/CRUD/Detail/Dashboard/SidePane)
- [ ] Design compliance validated
- [ ] Structured specification document generated

**2. Builder Agent Input Requirements:**
```yaml
# UX Agent Output Format
template_category: "CRUD" | "List" | "Detail" | "Dashboard" | "SidePane"
mfui_components: ["Button", "TextField", "DataGrid", ...]
page_structure:
  layout: "Desktop" | "SidePane" | "Modal"
  navigation: boolean
  sections: [...]
api_requirements:
  endpoints: [...]
  data_models: [...]
business_logic:
  validation_rules: [...]
  user_flows: [...]
```

### Builder Agent Execution Workflow

**Phase 1: Environment Setup**
```bash
# 1. Create new project directory
mkdir {project_name}
cd {project_name}

# 2. Copy template foundation
cp -r /path/to/frontend-boilerplate/examples/react-router-lib/* .

# 3. Initialize project
pnpm install
```

**Phase 2: Template Customization**
```bash
# 4. Generate CSS types
pnpm typegen:css

# 5. Generate API types (if needed)
pnpm typegen:api

# 6. Start development environment
pnpm start  # Runs: typegen:css + develop + typecheck --watch
```

**Phase 3: Implementation**
- Modify `/src/routes/` based on template category
- Update MFUI component usage per UX Agent specifications
- Implement business logic and validation rules
- Configure API endpoints and data models
- Apply custom styling within MFUI design token constraints

**Phase 4: Quality Validation**
```bash
# 7. Run comprehensive quality checks
pnpm lint        # ESLint + Prettier + Stylelint
pnpm typecheck   # TypeScript validation
pnpm test        # Vitest unit tests

# 8. Build verification
pnpm build       # Production build with sourcemaps

# 9. Preview deployment
pnpm preview     # Preview production build
```

**Phase 5: Delivery**
- Working prototype accessible at `http://localhost:3001`
- Complete project structure ready for handoff
- All quality gates passed (lint, typecheck, test, build)
- Storybook components catalog available (`pnpm storybook`)

## Success Criteria

### ✅ Workflow Completion Checklist

**UX Agent Deliverables:**
- [ ] Complete MFUI component mapping
- [ ] LA Frontend pattern identification
- [ ] Template category selection with rationale
- [ ] Design system compliance validation report
- [ ] Structured handoff specification

**Builder Agent Deliverables:**
- [ ] Working prototype with template-based structure
- [ ] All quality gates passing (lint/typecheck/test/build)
- [ ] MFUI component integration confirmed
- [ ] Development server running successfully
- [ ] Production build verified
- [ ] Documentation updated with project-specific details

### 📊 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| UX Agent Response Time | < 2 seconds | Component recommendations |
| Builder Agent Generation | < 30 seconds | Complete template customization |
| Template Coverage | 80% use cases | Matches brainstorming analysis |
| Design Compliance | > 90% | MoneyForward design system |

## Integration Points

### BMAD System Integration
- Both agents operate within existing BMAD framework
- Handoff occurs through structured specification format
- Template repository maintains consistency across projects
- Quality validation integrates with existing development standards

### MoneyForward Standards Compliance
- **Technology Stack**: Aligned with MoneyForward technical ADRs
- **Design System**: Native MFUI integration ensures compliance
- **Code Quality**: Built-in linting and formatting rules
- **Development Process**: Standard pnpm workflows and build processes

---

*This workflow documentation ensures systematic, reproducible prototype generation while maintaining MoneyForward's quality and design standards.*