# Builder Agent Execution Checklist

## Pre-Execution Validation

### ✅ UX Agent Handoff Requirements
- [ ] **UX Agent Specification Complete**
  - [ ] Template category identified (`List` | `CRUD` | `Detail` | `Dashboard` | `SidePane`)
  - [ ] MFUI components mapped with usage rationale
  - [ ] LA Frontend patterns selected and documented
  - [ ] Design system compliance validated (>90% target)
  - [ ] Structured handoff specification generated

- [ ] **Business Requirements Clarity**
  - [ ] User stories clearly defined
  - [ ] Acceptance criteria specified
  - [ ] API requirements documented (if applicable)
  - [ ] Business logic rules identified
  - [ ] Performance requirements confirmed

- [ ] **Technical Prerequisites**
  - [ ] Project name and directory structure determined
  - [ ] Development environment requirements confirmed
  - [ ] Integration points identified

## Phase 1: Environment Setup

### ✅ Project Initialization
- [ ] **Directory Creation**
  ```bash
  mkdir {project_name}
  cd {project_name}
  ```

- [ ] **Template Foundation Copy**
  ```bash
  cp -r frontend-boilerplate/examples/react-router-lib/* .
  ```

- [ ] **Package Installation**
  ```bash
  corepack enable  # if pnpm not installed
  pnpm install     # verify no errors
  ```

- [ ] **Initial Verification**
  - [ ] `package.json` copied successfully
  - [ ] All dependencies installed without errors
  - [ ] Node.js version compatible (22.16.0)
  - [ ] pnpm version compatible (10.11.0)

## Phase 2: Development Environment

### ✅ Type Generation
- [ ] **CSS Type Generation**
  ```bash
  pnpm typegen:css
  # Verify: src/**/*.css.d.ts files generated
  ```

- [ ] **API Type Generation** (if using custom APIs)
  ```bash
  pnpm typegen:api
  # Verify: src/types/*.d.ts files updated
  ```

### ✅ Development Server
- [ ] **Start Development Mode**
  ```bash
  pnpm start
  # Expected: typegen:css + develop + typecheck --watch
  ```

- [ ] **Development Verification**
  - [ ] Server running on http://localhost:3001
  - [ ] Hot reload functioning
  - [ ] TypeScript compilation successful
  - [ ] No console errors in browser
  - [ ] CSS modules loading correctly

## Phase 3: Template Customization

### ✅ Route Structure Implementation
- [ ] **Template Category Customization**
  - [ ] **List Pages**: Modify `src/routes/[entity]/` for data listing
  - [ ] **CRUD Forms**: Update `src/routes/[entity]/new/` and `edit/` 
  - [ ] **Detail Pages**: Customize `src/routes/[entity]/[id]/`
  - [ ] **Dashboard**: Modify `src/routes/dashboard/`
  - [ ] **SidePane**: Create new layout pattern if needed

- [ ] **Component Integration**
  - [ ] MFUI components imported per UX Agent specification
  - [ ] Component props configured correctly
  - [ ] Design tokens applied consistently
  - [ ] Accessibility attributes included

### ✅ Business Logic Implementation
- [ ] **State Management**
  - [ ] State patterns implemented in `src/states/`
  - [ ] Context providers configured
  - [ ] State updates tested manually

- [ ] **API Integration** (if applicable)
  - [ ] API client methods updated in `src/api/`
  - [ ] Type-safe API calls implemented
  - [ ] Error handling included
  - [ ] Loading states managed

- [ ] **Validation Logic**
  - [ ] Form validation rules implemented
  - [ ] Business rule validation added
  - [ ] User feedback mechanisms included

## Phase 4: Quality Validation

### ✅ Code Quality Checks
- [ ] **Linting Validation**
  ```bash
  pnpm lint
  # Expected: No ESLint, Prettier, or Stylelint errors
  ```

- [ ] **TypeScript Validation**
  ```bash
  pnpm typecheck
  # Expected: No TypeScript compilation errors
  ```

- [ ] **Testing Validation**
  ```bash
  pnpm test
  # Expected: All tests passing
  ```

### ✅ Build Verification
- [ ] **Production Build**
  ```bash
  pnpm build
  # Expected: Successful build with sourcemaps
  ```

- [ ] **Build Preview**
  ```bash
  pnpm preview
  # Expected: Production preview accessible and functional
  ```

### ✅ Quality Metrics Validation
- [ ] **Performance Checks**
  - [ ] Page load time < 2 seconds (development)
  - [ ] Component rendering performance acceptable
  - [ ] No memory leaks detected in dev tools

- [ ] **Design System Compliance**
  - [ ] MFUI components used correctly (>90% compliance target)
  - [ ] Design tokens applied consistently  
  - [ ] MoneyForward branding guidelines followed
  - [ ] Responsive design implemented

- [ ] **Accessibility Validation**
  - [ ] ARIA attributes present where needed
  - [ ] Keyboard navigation functional
  - [ ] Color contrast requirements met
  - [ ] Screen reader compatibility verified

## Phase 5: Documentation & Handoff

### ✅ Project Documentation
- [ ] **README Updates**
  - [ ] Project-specific setup instructions
  - [ ] Business context and requirements summary
  - [ ] Development workflow documented
  - [ ] Deployment instructions included

- [ ] **Code Documentation**
  - [ ] Complex business logic commented
  - [ ] Component usage examples provided
  - [ ] API integration patterns documented

### ✅ Storybook Catalog
- [ ] **Component Stories**
  ```bash
  pnpm storybook
  # Expected: Storybook running on port 6007
  ```

- [ ] **Story Verification**
  - [ ] All custom components have stories
  - [ ] Props documented in stories
  - [ ] Visual regression tests possible
  - [ ] Component catalog accessible for design review

## Phase 6: Final Delivery

### ✅ Delivery Checklist
- [ ] **Working Prototype**
  - [ ] All user stories implemented
  - [ ] Acceptance criteria met
  - [ ] Business logic functional
  - [ ] UI/UX matches UX Agent specifications

- [ ] **Quality Gates Passed**
  - [ ] ✅ `pnpm lint` - No linting errors
  - [ ] ✅ `pnpm typecheck` - No TypeScript errors  
  - [ ] ✅ `pnpm test` - All tests passing
  - [ ] ✅ `pnpm build` - Production build successful

- [ ] **Performance Targets Met**
  - [ ] Template generation < 30 seconds (NFR2)
  - [ ] Component recommendations < 2 seconds (NFR1)
  - [ ] Design system compliance >90% (NFR3)
  - [ ] Use case coverage 80%+ (NFR7)

### ✅ Handoff Documentation
- [ ] **Project Summary Report**
  - [ ] Implementation approach documented
  - [ ] Deviations from UX specification explained
  - [ ] Known limitations or future enhancements listed
  - [ ] Testing results summary included

- [ ] **Technical Handoff**
  - [ ] Code repository ready for team access
  - [ ] Development environment instructions validated
  - [ ] Deployment process documented
  - [ ] Maintenance and update procedures outlined

## Success Validation

### ✅ Final Verification
- [ ] **User Experience**
  - [ ] Prototype demonstrates intended user flow
  - [ ] All interactive elements functional
  - [ ] Navigation intuitive and complete
  - [ ] Error states handled gracefully

- [ ] **Technical Excellence**
  - [ ] Code follows MoneyForward standards
  - [ ] Architecture scalable for future development
  - [ ] Performance optimized for target use cases
  - [ ] Security best practices implemented

- [ ] **Business Value**
  - [ ] Requirements satisfied completely
  - [ ] Prototype ready for stakeholder validation
  - [ ] Foundation established for further development
  - [ ] Knowledge transfer completed

---

## Emergency Procedures

### 🚨 Common Issues & Solutions

| Issue | Solution | Prevention |
|-------|----------|------------|
| **Template Copy Fails** | Verify source path, check permissions | Pre-validate template repository access |
| **Package Install Errors** | Clear cache: `pnpm store prune`, retry | Verify Node/pnpm versions match requirements |
| **TypeScript Errors** | Run `pnpm typegen:css` first, check imports | Follow strict TypeScript patterns |
| **Build Failures** | Check lint/typecheck first, fix incrementally | Run quality checks frequently |
| **Performance Issues** | Optimize imports, check bundle size | Monitor performance during development |

### 📞 Escalation Paths
- **Technical Issues**: Escalate to BMAD development team
- **Design Compliance**: Escalate to UX Expert Agent or design team
- **Business Logic**: Escalate to Product Manager/Product Owner
- **Infrastructure**: Escalate to MoneyForward platform team

---

*This checklist ensures systematic, high-quality prototype delivery while maintaining consistency with MoneyForward standards and BMAD agent capabilities.*