# implement-features-from-docs

## Task Description
Implement features in an existing prototype based on user-provided documentation, specifications, or requirements.

## Input Requirements
- **project_path** (required): Path to the existing prototype project
- **docs_source** (required): Path to documentation file or specification content
- **feature_scope** (optional): Specific features to implement (defaults to all features in docs)

## Elicitation
```yaml
elicit: true
format:
  - project_path: "What is the path to your prototype project?"
  - docs_source: "What documentation should I use? (file path or paste content)"
  - feature_scope: "Which specific features to implement? (press Enter for all)"
```

## Execution Steps

### Step 1: Analyze Documentation
- Read and parse the provided documentation
- Identify distinct features and requirements
- Map features to MFUI component patterns
- Create implementation plan with priority order

### Step 2: Validate Project Structure
- Verify project_path exists and is a valid React project
- Check existing routes, components, and API structure
- Identify integration points for new features

### Step 3: Generate Feature Specifications
For each feature identified:
- Create detailed component specifications
- Map to existing template patterns (List, CRUD, Detail, Dashboard, SidePane)
- Define API requirements and data models
- Plan routing and navigation updates

### Step 4: Implement Features Systematically
For each feature in priority order:

#### 4a. Create/Update Routes
- Add new routes to routes.ts
- Create route components in routes/ directory
- Implement proper route guards if needed

#### 4b. Build Components
- Create template components following existing patterns
- Implement business logic and state management
- Add proper TypeScript types and interfaces
- Include Storybook stories for new components

#### 4c. API Integration
- Create or update API clients in src/api/
- Add proper error handling and loading states
- Implement data validation and transformation

#### 4d. Update Navigation
- Add new routes to MainNavigation component
- Update navigation hierarchy as needed
- Ensure proper active states and breadcrumbs

### Step 5: TypeScript Error Fixing & Quality Assurance
- Run type checking: `pnpm run type-check` or `tsc --noEmit`
- **MANDATORY**: Fix ALL TypeScript errors before proceeding
  - Address missing type declarations
  - Fix type mismatches and assignments
  - Resolve import/export issues
  - Add proper interface definitions
  - Handle null/undefined cases properly
- Run linting: `pnpm run lint` and fix all linting issues
- Build verification: `pnpm run build` - must complete without errors
- Test component stories: `pnpm run storybook`

### Step 6: Integration Testing
- Test all new features in development mode
- Verify routing and navigation work correctly
- Check API integration and error handling
- Validate responsive behavior and accessibility

## Success Criteria
- [ ] All specified features implemented and functional
- [ ] **ZERO TypeScript errors** - all type issues resolved
- [ ] No linting issues or warnings
- [ ] Build process completes successfully without any errors
- [ ] Storybook stories created for new components
- [ ] Navigation updated appropriately
- [ ] API integration working with proper error handling

## Output
Provide:
1. Summary of features implemented
2. List of new components and routes created
3. API changes and new endpoints used
4. Navigation structure updates
5. Instructions for testing the new features
6. Any limitations or future enhancements needed

## Error Handling
- If project path doesn't exist, guide user to create prototype first
- If docs are unclear, request clarification on specific requirements
- If features conflict with existing code, provide resolution options
- If build fails, provide detailed error analysis and fixes
- If API requirements can't be met, suggest alternative approaches

## Template Mapping Reference
- **List Pages**: Data tables, search/filter interfaces, bulk operations
- **CRUD Forms**: Create/edit forms, validation, submission handling
- **Detail Pages**: Single item views, related data display, actions
- **Dashboard Pages**: Metrics, charts, summary views, widgets
- **SidePane Workflows**: Multi-step processes, modals, slide-outs