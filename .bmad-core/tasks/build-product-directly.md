# build-product-directly

## Task Description
Execute a direct build of a product prototype, including all necessary checks, optimizations, and deployment preparation.

## Input Requirements
- **project_path** (required): Path to the prototype project to build
- **build_type** (optional): Type of build - 'development', 'production', 'preview' (defaults to 'production')
- **output_path** (optional): Custom output directory (defaults to project's dist/)

## Elicitation
```yaml
elicit: true
format:
  - project_path: "What is the path to your prototype project?"
  - build_type: "What type of build? (development/production/preview, press Enter for production)"
  - output_path: "Custom output path? (press Enter for default dist/)"
```

## Execution Steps

### Step 1: Setup Project Foundation
#### 1a. Copy React Router Library
Copy the react-router-lib to prototypes directory for use:
```bash
# Ensure prototypes directory exists
mkdir -p prototypes/

# Copy react-router-lib to prototypes directory
cp -r ./frontend-boilerplate/examples/react-router-lib/ prototypes/
echo "✓ Copied react-router-lib to prototypes directory"
```

#### 1b. Validate Project
- Verify project_path exists and contains a valid package.json
- Check for required build scripts in package.json
- Confirm project dependencies are installed

### Step 2: Pre-Build Quality Checks
Run comprehensive checks before building:

#### 2a. Type Checking
```bash
cd "{project_path}"
pnpm run type-check || npm run type-check || npx tsc --noEmit
```
**MANDATORY**: Fix ALL TypeScript errors before proceeding with build. The build process must not continue if any TypeScript errors exist.

#### 2b. Linting
```bash
pnpm run lint || npm run lint || npx eslint src/
```

#### 2c. Styling Checks
```bash
pnpm run lint:css || npm run lint:css || npx stylelint "src/**/*.css"
```

#### 2d. Unit Tests (if available)
```bash
pnpm run test || npm run test || npx vitest run
```

### Step 3: Clean Previous Build
```bash
rm -rf dist/ || rm -rf build/ || rm -rf out/
```

### Step 4: Execute Build
Based on build_type:

#### Production Build
```bash
pnpm run build || npm run build || npx vite build
```

#### Development Build
```bash
pnpm run build:dev || npm run build:dev || npx vite build --mode development
```

#### Preview Build
```bash
pnpm run build && pnpm run preview || npm run build && npm run preview
```

### Step 5: Post-Build Verification
- Verify build output exists in expected directory
- Check build artifacts for completeness
- Validate bundle sizes and optimization
- Test that critical assets are present

### Step 6: Build Analysis (Production Only)
- Generate bundle analysis report if tools available
- Check for optimization opportunities
- Identify any build warnings or issues
- Report on asset sizes and dependencies

### Step 7: Deployment Preparation
- Verify all static assets are properly handled
- Check that routing configuration works for SPA
- Ensure environment variables are properly handled
- Validate that the build is deployment-ready

## Success Criteria
- [ ] React-router-lib successfully copied to prototypes directory
- [ ] **ZERO TypeScript errors** - all type issues resolved
- [ ] All pre-build quality checks pass
- [ ] Build completes without errors
- [ ] Build output directory contains expected files
- [ ] Critical assets (HTML, JS, CSS) are present
- [ ] Bundle sizes are reasonable for deployment
- [ ] No critical warnings in build output

## Output
Provide:
1. Build status and completion time
2. Summary of quality check results
3. Build output directory and file sizes
4. Any warnings or issues encountered
5. Bundle analysis summary (for production builds)
6. Next steps for deployment or testing
7. Performance recommendations if applicable

## Error Handling
- If project path doesn't exist, provide clear error message
- If dependencies missing, guide through installation
- If quality checks fail, provide specific fixes needed
- If build fails, analyze error logs and suggest solutions
- If build output is invalid, diagnose and recommend fixes

## Build Optimization Tips
- Suggest code splitting opportunities
- Recommend asset optimization strategies
- Identify unused dependencies
- Propose performance improvements
- Check for security vulnerabilities in dependencies

## Common Build Scripts
The task will attempt these commands in order:
1. `pnpm run build` (preferred for pnpm projects)
2. `npm run build` (fallback for npm projects)
3. `npx vite build` (direct Vite build)
4. `npx webpack` (webpack projects)
5. `npx next build` (Next.js projects)