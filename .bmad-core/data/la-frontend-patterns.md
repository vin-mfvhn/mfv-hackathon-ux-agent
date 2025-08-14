# LA Frontend Template Patterns

*Proven UI patterns extracted from MoneyForward LA Frontend application for template-based prototype generation*

## Overview

This document catalogs battle-tested UI patterns from the LA Frontend codebase that demonstrate real-world MFUI usage. These patterns serve as templates for rapid prototype generation and ensure consistency with existing MoneyForward applications.

## Pattern Categories

### 1. List/Index Page Pattern

**Purpose**: Display collections of data with filtering, sorting, and actions

**Example**: `pages/account-patterns/ui/account-patterns-template.tsx`

**Structure**:
```jsx
<PageLayout
  headerSlot={
    <PageLayout.Header
      headingSlot={title}
      actionSlot={<Button priority="primary">Add New</Button>}
      backButtonProps={{ href: parentPath }}
      showBackButton
    />
  }
>
  <DataTableComponent />
</PageLayout>
```

**Key Components**:
- `PageLayout` with header configuration
- Primary action button in header
- Back navigation to parent section
- Data table or grid for content
- Empty state handling
- Loading state management

**When to Use**:
- Master data listing pages
- Content management interfaces
- Any collection of items requiring CRUD operations

**Template Variables**:
- `title`: Page title
- `addButtonText`: Primary action text
- `parentPath`: Back navigation target
- `columns`: Table column definitions
- `dataSource`: API endpoint or data source
- `emptyMessage`: Text for empty state

---

### 2. CRUD Form Pattern

**Purpose**: Create and edit entity forms with validation

**Example**: `features/account-pattern/ui/account-patterns-form.tsx`

**Structure**:
```jsx
<form onSubmit={handleSubmit}>
  <ConfirmEditingFormModal hasFormChanged={hasUnsavedChanges} />
  <VStack gap={12}>
    <VStack>
      {/* Form fields using KeyValue layout */}
      <KeyValue
        gridTemplateColumns="160px 1fr"
        keyItem={<label>Field Label <RequiredFieldIndicator /></label>}
        valueItem={
          <VStack gap={4}>
            <TextBox value={value} onChange={onChange} />
            {error && <HelpMessage messageType="error">{error}</HelpMessage>}
          </VStack>
        }
      />
    </VStack>
    
    {/* Action buttons */}
    <HStack gap={7} justifyContent="flex-end">
      <Button priority="secondary">Cancel</Button>
      <Button priority="primary" type="submit" loading={loading}>
        Save
      </Button>
    </HStack>
  </VStack>
</form>
```

**Key Components**:
- Form wrapper with validation
- `ConfirmEditingFormModal` for unsaved changes
- `KeyValue` layout for consistent field presentation
- `RequiredFieldIndicator` for required fields
- `HelpMessage` for validation errors
- Action buttons with loading states

**Form Field Patterns**:
```jsx
// Text input field
<KeyValue
  keyItem={<label>Name <RequiredFieldIndicator /></label>}
  valueItem={
    <VStack gap={4}>
      <TextBox
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        invalid={!field.state.meta.isValid}
      />
      {error && <HelpMessage messageType="error">{error}</HelpMessage>}
    </VStack>
  }
/>

// Select field
<KeyValue
  keyItem={<label>Category</label>}
  valueItem={
    <SelectBox
      options={options}
      value={selectedValue}
      onChange={handleChange}
    />
  }
/>
```

**When to Use**:
- Entity creation forms
- Entity editing forms
- Settings and configuration pages
- Any data input interface

**Template Variables**:
- `entityName`: Entity being created/edited
- `fields`: Array of form field definitions
- `validationRules`: Form validation configuration
- `submitAction`: Form submission handler
- `cancelPath`: Navigation target for cancel action

---

### 3. DataGrid Table Pattern

**Purpose**: Complex data tables with sorting, filtering, and interactions

**Example**: `pages/account-patterns/ui/account-pattern-table.tsx`

**Structure**:
```jsx
<VStack gap={16}>
  <DataGrid
    layout="edge-to-edge"
    leftFixedColumnIndex={1}
    rightFixedColumnIndex={-1}
    fixedHeader
    size="medium"
  >
    <colgroup>
      {columns.map(col => <col key={col.key} style={{ width: col.width }} />)}
    </colgroup>
    
    <DataGrid.Header>
      <DataGrid.HeaderRow>
        {columns.map(col => (
          <DataGrid.HeaderCell key={col.key}>
            {col.label}
          </DataGrid.HeaderCell>
        ))}
      </DataGrid.HeaderRow>
    </DataGrid.Header>
    
    <DataGrid.Body>
      {data.map(row => (
        <DataGrid.Row key={row.id}>
          {columns.map(col => (
            <DataGrid.Cell key={col.key}>
              {col.render(row)}
            </DataGrid.Cell>
          ))}
        </DataGrid.Row>
      ))}
    </DataGrid.Body>
  </DataGrid>
  
  {showEmpty && <EmptyContentMessage message="No data found" />}
</VStack>
```

**Column Definition Pattern**:
```jsx
const columns = [
  {
    key: 'name',
    label: 'Name',
    width: 200,
    render: (row) => <Typography>{row.name}</Typography>
  },
  {
    key: 'status',
    label: 'Status',
    width: 120,
    render: (row) => <Badge variant={row.status}>{row.statusText}</Badge>
  },
  {
    key: 'actions',
    label: '',
    width: 100,
    render: (row) => (
      <Button size="small" href={`/edit/${row.id}`}>
        Edit
      </Button>
    )
  }
];
```

**Custom Cell Components**:
```jsx
// Multi-line cell content
const AccountCell = ({ accountItem, subAccountItem }) => (
  <VStack gap={4}>
    <Typography variant="condensedBody">{accountItem.code}</Typography>
    <EllipsisTypography>{accountItem.name}</EllipsisTypography>
    <div className={styles.divider} />
    <Typography variant="condensedBody">{subAccountItem.code}</Typography>
    <EllipsisTypography>{subAccountItem.name}</EllipsisTypography>
  </VStack>
);

// Action cell with tooltip
const ActionCell = ({ row }) => (
  <HStack gap={4}>
    <Button size="small" disabled={!row.isEditable}>
      Edit
    </Button>
    {!row.isEditable && (
      <Tooltip content="Cannot edit this item">
        <HelpIcon />
      </Tooltip>
    )}
  </HStack>
);
```

**When to Use**:
- Large datasets requiring tabular display
- Data requiring sorting or filtering
- Complex data with multiple attributes per row
- Any interface where users need to scan/compare data

**Template Variables**:
- `columns`: Table column definitions
- `dataSource`: API endpoint for table data
- `sortable`: Enable column sorting
- `filterable`: Enable filtering controls
- `selectable`: Enable row selection
- `fixedColumns`: Configure fixed column behavior

---

### 4. SidePane Workflow Pattern

**Purpose**: Secondary content and editing workflows

**Example**: `shared/ui/fixed-bottom-sidepane.tsx`

**Structure**:
```jsx
<SidePane
  className={classNames(styles.sidepane, className)}
  open={open}
  onClose={onClose}
>
  <div className={styles.layoutContainer}>
    {/* Main content area */}
    <div className={styles.contentArea}>
      <VStack gap={16}>
        <Heading variant="h2">Sidepane Title</Heading>
        <SidepaneContent />
      </VStack>
    </div>
    
    {/* Fixed bottom actions */}
    <div className={styles.fixedBottomContent}>
      <HStack gap={8} justifyContent="flex-end">
        <Button priority="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button priority="primary" onClick={onSave}>
          Save
        </Button>
      </HStack>
    </div>
  </div>
</SidePane>
```

**Portal Integration**:
```jsx
const FixedBottomPort = ({ children, id }) => {
  const element = document.getElementById(`sidepane-${id}-bottom`);
  if (!element) return null;
  return createPortal(children, element);
};

// Usage
<SidePane>
  <MainContent />
  <FixedBottomPort id="edit-form">
    <ActionButtons />
  </FixedBottomPort>
</SidePane>
```

**When to Use**:
- Quick edit workflows
- Secondary information display
- Multi-step processes
- Detail views that don't require full page navigation

**Template Variables**:
- `title`: Sidepane heading
- `content`: Main content component
- `actions`: Bottom action buttons
- `width`: Sidepane width configuration
- `closeAction`: Close handler

---

### 5. Page Header Pattern

**Purpose**: Consistent page headers with navigation and actions

**Example**: Used across all page templates

**Structure**:
```jsx
<PageLayout
  headerSlot={
    <PageLayout.Header
      headingSlot={pageTitle}
      actionSlot={
        <HStack gap={8}>
          <Button priority="secondary">Secondary Action</Button>
          <Button priority="primary">Primary Action</Button>
        </HStack>
      }
      backButtonProps={{
        href: parentPath,
        onClick: handleBack
      }}
      showBackButton={hasParent}
    />
  }
>
  <PageContent />
</PageLayout>
```

**Variations**:

**Simple Header**:
```jsx
<PageLayout.Header
  headingSlot="Simple Page"
/>
```

**Header with Single Action**:
```jsx
<PageLayout.Header
  headingSlot="Page with Action"
  actionSlot={<Button priority="primary">Add New</Button>}
/>
```

**Header with Back Navigation**:
```jsx
<PageLayout.Header
  headingSlot="Detail Page"
  backButtonProps={{ href: "/list" }}
  showBackButton
/>
```

**When to Use**:
- All full-page interfaces
- Consistent navigation experience
- Action placement standardization

**Template Variables**:
- `title`: Page heading text
- `primaryAction`: Main action button
- `secondaryActions`: Additional action buttons
- `showBackButton`: Enable back navigation
- `backPath`: Back navigation target

---

## Layout Patterns

### Standard Page Layout
```jsx
<PageLayout
  headerSlot={<PageHeader />}
>
  <VStack gap={24}>
    <MainContent />
    <SecondaryContent />
  </VStack>
</PageLayout>
```

### Two-Column Layout
```jsx
<HStack gap={24} alignItems="flex-start">
  <VStack gap={16} style={{ flex: 2 }}>
    <PrimaryContent />
  </VStack>
  <VStack gap={16} style={{ flex: 1 }}>
    <SidebarContent />
  </VStack>
</HStack>
```

### Card Grid Layout
```jsx
<div className={styles.cardGrid}>
  {items.map(item => (
    <Panel key={item.id} className={styles.card}>
      <CardContent item={item} />
    </Panel>
  ))}
</div>
```

## State Management Patterns

### Loading States
```jsx
if (isLoading) {
  return <FullScreenLoading />;
}

// Or for partial loading
<VStack gap={16}>
  <Skeleton height={40} />
  <Skeleton height={200} />
  <Skeleton height={60} />
</VStack>
```

### Empty States
```jsx
const showEmpty = !isLoading && data.length === 0;

return (
  <VStack gap={16}>
    <DataGrid>
      {/* Table content */}
    </DataGrid>
    {showEmpty && (
      <EmptyContentMessage 
        message="No items found"
        actionSlot={<Button>Add First Item</Button>}
      />
    )}
  </VStack>
);
```

### Error States
```jsx
if (error) {
  return (
    <SectionMessage messageType="error">
      <Typography>Failed to load data: {error.message}</Typography>
      <Button onClick={retry}>Retry</Button>
    </SectionMessage>
  );
}
```

## Form Patterns

### Validation Display
```jsx
<VStack gap={4}>
  <TextBox
    value={value}
    onChange={onChange}
    invalid={!isValid}
  />
  {errors.map(error => (
    <HelpMessage key={error.code} messageType="error">
      {error.message}
    </HelpMessage>
  ))}
</VStack>
```

### Required Field Indication
```jsx
<HStack gap={7} justifyContent="space-between">
  <label htmlFor="fieldId">Field Label</label>
  <RequiredFieldIndicator />
</HStack>
```

### Form Section Grouping
```jsx
<VStack gap={24}>
  <VStack gap={12}>
    <Heading variant="h3">Basic Information</Heading>
    <FormFields />
  </VStack>
  
  <VStack gap={12}>
    <Heading variant="h3">Additional Details</Heading>
    <AdditionalFields />
  </VStack>
</VStack>
```

## Navigation Patterns

### Breadcrumb Navigation
```jsx
<HStack gap={8} alignItems="center">
  <TextLink href="/dashboard">Dashboard</TextLink>
  <Typography variant="caption">/</Typography>
  <TextLink href="/settings">Settings</TextLink>
  <Typography variant="caption">/</Typography>
  <Typography>Current Page</Typography>
</HStack>
```

### Tab Navigation
```jsx
<Tabs value={activeTab} onChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Tab value="history">History</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Panel value="overview">
    <OverviewContent />
  </Tabs.Panel>
  <Tabs.Panel value="details">
    <DetailsContent />
  </Tabs.Panel>
  <Tabs.Panel value="history">
    <HistoryContent />
  </Tabs.Panel>
</Tabs>
```

## CSS Module Patterns

### Component-Scoped Styling
```css
/* component.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: var(--mfui-space-section-vertical);
}

.header {
  padding: var(--mfui-space-container-horizontal) var(--mfui-space-key-value-horizontal);
  border-bottom: 1px solid var(--mfui-color-neutral-border-none);
}

.content {
  flex: 1;
  padding: var(--mfui-space-key-value-horizontal);
}
```

### Responsive Design
```css
.cardGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--mfui-space-container-horizontal);
}

@media (max-width: 768px) {
  .cardGrid {
    grid-template-columns: 1fr;
  }
}
```

## Usage Guidelines for Agents

### Pattern Selection Decision Tree

1. **Is this a data listing interface?** → Use List/Index Page Pattern
2. **Is this a form for creating/editing?** → Use CRUD Form Pattern
3. **Is this a complex data table?** → Use DataGrid Table Pattern
4. **Is this secondary workflow content?** → Use SidePane Workflow Pattern
5. **Does this need consistent page structure?** → Use Page Header Pattern

### Code Generation Guidelines

1. **Always include proper imports** for MFUI components
2. **Use CSS Modules** for component-specific styling
3. **Include TypeScript types** for props and state
4. **Add proper accessibility attributes** (labels, ARIA)
5. **Handle loading and error states** appropriately
6. **Follow established spacing patterns** using VStack/HStack
7. **Include validation** for form inputs
8. **Provide empty states** for data displays

### Quality Checklist

- [ ] Uses semantic MFUI components
- [ ] Follows established layout patterns
- [ ] Includes proper TypeScript types
- [ ] Handles loading states
- [ ] Handles error states
- [ ] Handles empty states
- [ ] Uses CSS Modules for styling
- [ ] Includes accessibility attributes
- [ ] Follows MoneyForward design principles
- [ ] Matches existing LA Frontend patterns

## Template Generation Variables

Each pattern should support these common variables:

- `componentName`: Generated component name
- `entityName`: Business entity name
- `apiEndpoint`: Data source URL
- `fields`: Array of field definitions
- `actions`: Available user actions
- `navigationPaths`: Related page URLs
- `permissions`: User permission checks
- `validationRules`: Form validation logic

*Source: LA Frontend codebase analysis*
*Last updated: 2025-01-14*