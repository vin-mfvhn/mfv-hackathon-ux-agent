# LA Frontend Patterns Knowledge Base

## Overview

This document catalogs proven UI patterns extracted from the LA Frontend codebase, providing real-world examples of successful MFUI component usage in production MoneyForward applications.

## Pattern Catalog

### 1. List Page Pattern

**Description**: Standard pattern for displaying collections of business entities with search, filter, and bulk actions.

**Core Components**:
- PageHeader with title and primary actions
- Search/Filter toolbar
- DataGrid with selection and sorting
- Pagination controls

**Real Implementation**: Account Items List (`pages/account-items/route.tsx`)
```jsx
<PageHeader 
  title="Account Items" 
  primaryAction={<Button onClick={createNew}>Add New</Button>}
/>
<DataGrid
  data={accountItems}
  columns={[
    { field: 'code', header: 'Code', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'category', header: 'Category' },
    { field: 'actions', header: 'Actions', render: ActionsMenu }
  ]}
  selectionMode="multiple"
  onSelectionChange={handleSelection}
/>
```

**Use Cases**: Account Items, Account Patterns, Trade Partners, Lease Ledgers

### 2. CRUD Form Pattern

**Description**: Create/Edit forms in modal dialogs or side panels with validation and state management.

**Core Components**:
- Dialog or SidePane container
- Form fields with validation
- Action buttons (Save, Cancel, Delete)
- Loading states

**Real Implementation**: Account Pattern Creation (`pages/account-patterns-new/route.tsx`)
```jsx
<Dialog open={isOpen} onClose={handleClose}>
  <Dialog.Header>Create Account Pattern</Dialog.Header>
  <Dialog.Body>
    <TextInput
      label="Pattern Name"
      value={name}
      onChange={setName}
      error={errors.name}
      required
    />
    <Select
      label="Category"
      options={categoryOptions}
      value={category}
      onChange={setCategory}
    />
  </Dialog.Body>
  <Dialog.Footer>
    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleSave} loading={isSaving}>
      Save Pattern
    </Button>
  </Dialog.Footer>
</Dialog>
```

**Use Cases**: Entity creation/editing, Settings configuration, Data imports

### 3. Detail Page Pattern

**Description**: Comprehensive view of single entity with related information organized in tabs or sections.

**Core Components**:
- PageHeader with entity name and actions
- Tabs for different data sections
- Cards for grouped information
- Related data tables

**Real Implementation**: Lease Ledger Details (`pages/lease-ledger-details/route.tsx`)
```jsx
<PageHeader 
  title={`Lease Ledger: ${ledger.name}`}
  breadcrumbs={breadcrumbs}
  actions={<ActionDropdown />}
/>
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="schedule">Payment Schedule</Tabs.Trigger>
    <Tabs.Trigger value="journal">Journal Entries</Tabs.Trigger>
  </Tabs.List>
  
  <Tabs.Content value="overview">
    <Card>
      <Card.Header>Basic Information</Card.Header>
      <Card.Body>
        <DefinitionList data={basicInfo} />
      </Card.Body>
    </Card>
  </Tabs.Content>
</Tabs>
```

**Use Cases**: Lease ledger details, Trade partner profiles, Account item details

### 4. Dashboard Page Pattern

**Description**: Overview dashboard with key metrics, charts, and quick actions.

**Core Components**:
- Metric cards with KPIs
- Chart components for visualizations
- Quick action buttons
- Recent activity lists

**Real Implementation**: Main Dashboard (`pages/dashboard/route.tsx`)
```jsx
<PageHeader title="Dashboard" />
<Grid cols={3} gap="lg">
  <MetricCard
    title="Total Lease Assets"
    value={formatCurrency(totalAssets)}
    trend={+2.5}
    icon={<TrendingUpIcon />}
  />
  <MetricCard
    title="Pending Approvals"
    value={pendingCount}
    urgent={pendingCount > 10}
    action={<Button size="sm" onClick={viewApprovals}>Review</Button>}
  />
</Grid>

<Card>
  <Card.Header>Recent Activity</Card.Header>
  <List>
    {recentActivity.map(item => (
      <List.Item key={item.id}>
        <ActivityItem data={item} />
      </List.Item>
    ))}
  </List>
</Card>
```

**Use Cases**: Main dashboard, Settings overview, Department summaries

### 5. SidePane Workflow Pattern

**Description**: Multi-step processes that open in side panel without leaving current page context.

**Core Components**:
- SidePane container with close action
- Step progress indicator
- Form sections for each step
- Navigation buttons (Next, Previous, Finish)

**Real Implementation**: Survey Form Import (`pages/lease-ledgers/survey-form-import-with-navigation.stories.tsx`)
```jsx
<SidePane open={isOpen} onClose={handleClose} width="large">
  <SidePane.Header>
    Import Survey Form
    <ProgressIndicator currentStep={currentStep} totalSteps={3} />
  </SidePane.Header>
  
  <SidePane.Body>
    {currentStep === 1 && <FileUploadStep />}
    {currentStep === 2 && <DataMappingStep />}
    {currentStep === 3 && <ReviewStep />}
  </SidePane.Body>
  
  <SidePane.Footer>
    <Button 
      variant="secondary" 
      onClick={handlePrevious}
      disabled={currentStep === 1}
    >
      Previous
    </Button>
    <Button 
      variant="primary" 
      onClick={currentStep === 3 ? handleFinish : handleNext}
    >
      {currentStep === 3 ? 'Import' : 'Next'}
    </Button>
  </SidePane.Footer>
</SidePane>
```

**Use Cases**: Data imports, Approval workflows, Multi-step configurations

## Layout Patterns

### Standard Page Layout
```jsx
<GlobalHeader />
<MainNavigation />
<main>
  <PageHeader />
  <PageContent />
</main>
```

### List Page Layout
```jsx
<PageHeader title="Items" actions={<CreateButton />} />
<Toolbar>
  <SearchInput />
  <FilterDropdown />
  <ViewToggle />
</Toolbar>
<DataGrid />
<Pagination />
```

### Detail Page Layout
```jsx
<PageHeader title="Item Details" breadcrumbs actions />
<Tabs>
  <TabContent>
    <Grid>
      <Card>Primary Info</Card>
      <Card>Secondary Info</Card>
    </Grid>
    <Card>Related Data Table</Card>
  </TabContent>
</Tabs>
```

## Navigation Patterns

### Hierarchical Navigation
- GlobalHeader: Top-level navigation between products
- MainNavigation: Feature-level navigation within product
- PageHeader: Page-level context and actions
- Breadcrumbs: Path within feature hierarchy

### Action Patterns
- Primary actions in PageHeader
- Row actions in DataGrid
- Bulk actions in Toolbar
- Contextual actions in DropdownMenus

## State Management Patterns

### Loading States
```jsx
// Table loading
<DataGrid loading={isLoading} data={data} />

// Button loading
<Button loading={isSaving} onClick={handleSave}>
  Save Changes
</Button>

// Page loading
{isLoading ? <PageSkeleton /> : <PageContent />}
```

### Error States
```jsx
// Field validation
<TextInput 
  error={errors.name}
  helperText="Name is required"
/>

// Page-level errors
<ErrorBoundary fallback={<ErrorMessage />}>
  <PageContent />
</ErrorBoundary>
```

### Empty States
```jsx
// Empty data tables
<DataGrid 
  data={[]} 
  emptyMessage="No items found"
  emptyAction={<Button>Create First Item</Button>}
/>
```

## Responsive Patterns

### Mobile Adaptations
- DataGrid transforms to stacked cards on mobile
- MainNavigation collapses to hamburger menu
- SidePane becomes full-screen modal
- Form fields stack vertically

### Breakpoint Usage
- Mobile: Up to 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+
- Wide: 1440px+

## Performance Patterns

### Data Loading
- Use pagination for large datasets
- Implement virtual scrolling for very long lists
- Load detail data on demand (tabs, accordions)
- Cache frequently accessed data

### Code Splitting
- Route-based code splitting
- Component lazy loading for heavy features
- Dynamic imports for optional functionality

## Accessibility Patterns

### Keyboard Navigation
- Tab order follows visual hierarchy
- Skip links for main content
- Focus management in modals and menus
- Escape key closes overlays

### Screen Reader Support
- Proper heading hierarchy (h1, h2, h3)
- ARIA labels for interactive elements
- Live regions for dynamic content
- Table headers properly associated

## Error Handling Patterns

### Form Validation
- Real-time validation on blur
- Summary of errors at form level
- Inline error messages
- Accessible error announcements

### API Error Handling
- Toast notifications for save errors
- Retry mechanisms for failed requests
- Graceful degradation for offline state
- User-friendly error messages

These patterns provide proven templates for implementing consistent, accessible, and performant user interfaces using the MFUI component library.