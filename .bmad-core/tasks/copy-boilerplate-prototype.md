# copy-boilerplate-prototype

## Task Description
Copy the react-router-lib boilerplate from frontend-boilerplate/examples/ to create a new product prototype directory structure.

## Input Requirements
- **project_name** (required): Name for the new prototype project directory
- **target_directory** (optional): Target parent directory (defaults to current working directory)

## Elicitation
```yaml
elicit: true
format:
  - project_name: "What is the name for your new prototype project?"
  - target_directory: "Where should the prototype be created? (press Enter for current directory)"
```

## Execution Steps

### Step 1: Validate Input
- Ensure project_name is provided and valid (alphanumeric, hyphens, underscores only)
- Verify target_directory exists (create if needed)
- Check that ./frontend-boilerplate/examples/react-router-lib/ source exists

### Step 2: Copy Boilerplate Structure
```bash
# Create target directory if it doesn't exist
mkdir -p "{target_directory}/{project_name}"

# Copy entire react-router-lib structure using full path from project root
cp -r ./frontend-boilerplate/examples/react-router-lib/* "{target_directory}/{project_name}/"

# Copy hidden files too
cp -r ./frontend-boilerplate/examples/react-router-lib/.* "{target_directory}/{project_name}/" 2>/dev/null || true
```

### Step 3: Update Package Configuration
- Update package.json name field to match project_name
- Update any hardcoded references in configuration files
- Ensure all paths are relative and correct

### Step 4: Initialize Project
```bash
cd "{target_directory}/{project_name}"
pnpm install
```

### Step 5: Verification
- Verify all files copied successfully
- Check that package.json has correct name
- Confirm dependencies installed
- Test basic build works: `pnpm run build`

## Success Criteria
- [ ] New project directory created with correct name
- [ ] All boilerplate files copied including hidden files
- [ ] package.json updated with new project name
- [ ] Dependencies installed successfully
- [ ] Basic build test passes

## Output
Provide:
1. Path to the new prototype project
2. Summary of files copied
3. Next steps for customization
4. Confirmation that build test passed

## Error Handling
- If source boilerplate doesn't exist, provide clear error message
- If target directory can't be created, suggest alternative locations
- If package installation fails, provide troubleshooting steps
- If build test fails, list potential issues and solutions