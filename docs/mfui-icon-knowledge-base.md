# MFUI Icon Knowledge Base

*Comprehensive reference for all MFUI React icons with their purposes and usage patterns*

## Overview

MFUI Icons provides a comprehensive set of 85+ React icon components designed specifically for MoneyForward applications. All icons are optimized SVG components that follow accessibility best practices and integrate seamlessly with MFUI design tokens.

## Complete Icon Catalog

### Actions & Operations (25 icons)

**Primary Actions**
- `Add` - Plus symbol for creating new items, adding content, or expanding collections
- `Close` - X symbol for closing dialogs, modals, sidepanes, and dismissing content
- `Delete` - Trash/delete action for removing items permanently
- `Edit` - Pencil icon for editing existing content or entering edit mode
- `Search` - Magnifying glass for search functionality and filters

**File Operations**
- `Copy` - Duplicate content, copy to clipboard functionality
- `Download` - Download files, export data to local system
- `Upload` - Upload files, import data from local system
- `Import` - Arrow pointing in, for importing external data
- `Export` - Arrow pointing out, for exporting data to external systems
- `Open` - Open folders, files, or expand collapsed content
- `Print` - Printer icon for print functionality

**Content Manipulation**
- `Reload` - Refresh/reload data, reset to initial state
- `RotateLeft` - Counter-clockwise rotation for image/content manipulation
- `RotateRight` - Clockwise rotation for image/content manipulation
- `Undo` - Reverse previous action or operation
- `ZoomIn` - Magnify content, increase scale
- `ZoomOut` - Reduce magnification, decrease scale

**Organization & Utility**
- `Clip` - Paperclip for file attachments, linking related content
- `Tag` - Label/categorize content, metadata organization
- `Bookmark` - Save for later, mark as favorite
- `Template` - Predefined layouts, reusable content structures
- `Filter` - Funnel icon for filtering and refining data views
- `Lock` - Security indicator, access control, read-only states
- `Setting` - Gear icon for configuration, preferences, admin functions

### Navigation & UI Controls (19 icons)

**Primary Navigation**
- `Menu` - Hamburger menu for navigation drawer/sidebar
- `Home` - House icon for homepage, dashboard, main view
- `ExternalLink` - Arrow pointing out for links that open in new tab/window

**Directional Navigation**
- `DrilldownBackward` - Left arrow for going back, previous step
- `DrilldownForward` - Right arrow for going forward, next step
- `NavigationToDetail` - Arrow pointing to detail view, drill-down action

**Picker Controls**
- `PickerBefore` - Arrow for moving to previous item in sequence
- `PickerAfter` - Arrow for moving to next item in sequence
- `PickerFirst` - Arrow for jumping to first item
- `PickerLast` - Arrow for jumping to last item

**Dropdown & Menu Controls**
- `Dropdown` - Down arrow for dropdown menus, expandable content
- `MoreHorizontal` - Three horizontal dots (kebab menu) for additional actions
- `MoreVertical` - Three vertical dots (meatball menu) for context menus

**Data Manipulation**
- `SortAscending` - Up arrow for ascending sort order
- `SortDescending` - Down arrow for descending sort order
- `ListHandle` - Drag handle for reordering list items

**Visibility & Display**
- `Visibility` - Eye icon for showing hidden content, making visible
- `VisibilityOff` - Eye with slash for hiding content, privacy mode
- `List` - List view icon for switching to list layout

### Content & Document Management (8 icons)

**Document Types**
- `Document` - Generic file/document icon for papers, reports, files
- `Folder` - Directory/folder icon for organizing documents
- `Memo` - Note/memo icon for annotations, quick notes

**Communication**
- `Comment` - Speech bubble for comments, discussions, feedback
- `Mail` - Email/mail icon for messaging, correspondence
- `Chat` - Chat bubble for real-time messaging, conversations

**Content States**
- `Current` - Current/active state indicator, present status
- `Draft` - Draft document state, work-in-progress indicator
- `History` - Clock/history icon for version history, audit trails

### UI Components & Layout (12 icons)

**Disclosure Components**
- `DisclosureBasicCollapsed` - Plus in square for collapsed accordion/disclosure
- `DisclosureBasicExpanded` - Minus in square for expanded accordion/disclosure
- `DisclosureNestedCollapsed` - Right arrow for nested collapsed tree item
- `DisclosureNestedExpanded` - Down arrow for nested expanded tree item

**Form Controls**
- `CheckboxChecked` - Filled checkbox for selected state
- `CheckboxIndeterminate` - Partially filled checkbox for mixed/partial selection
- `CheckboxUnchecked` - Empty checkbox for unselected state
- `RadioButtonChecked` - Filled radio button for selected option
- `RadioButtonUnchecked` - Empty radio button for unselected option

**Panel & Layout Controls**
- `PaneExpansionToLeft` - Expand panel to the left
- `PaneExpansionToRight` - Expand panel to the right
- `PaneSwitchToLeft` - Move panel to left position
- `PaneSwitchToRight` - Move panel to right position
- `PaneSwitchToTop` - Move panel to top position
- `PaneSwitchToBottom` - Move panel to bottom position

### Status & Communication (9 icons)

**Status Indicators**
- `Error` - Error/danger state, critical issues, validation failures
- `Caution` - Warning/caution triangle for alerts, non-critical issues
- `Info` - Information circle for helpful tips, neutral information
- `Approval` - Checkmark for approved status, successful completion
- `Pending` - Clock icon for pending status, waiting states
- `Canceled` - X or strike-through for canceled/terminated items

**Communication & Alerts**
- `Announcement` - Megaphone for public announcements, broadcasts
- `Notification` - Bell icon for system notifications, alerts
- `Help` - Question mark for help documentation, support

### Business & Data (7 icons)

**Data Visualization**
- `BarChart` - Bar chart for data visualization, analytics dashboards

**Scheduling & Time**
- `Calendar` - Calendar icon for dates, scheduling, time management
- `EventAvailable` - Calendar with checkmark for available time slots

**Organization**
- `Employee` - Person icon for employees, users, team members
- `Organization` - Building icon for companies, departments, organizational units
- `Applications` - Grid icon for application portfolios, app launchers
- `SubmitApplication` - Send/submit icon for application processes

### Workflow & Process (2 icons)

**Process Flow**
- `ConditionalBranch` - Diamond shape for decision points in workflows

**Support**
- `Help` - Question mark for help documentation, user assistance

## Usage Patterns by Component Type

### Form Components
```jsx
// Checkbox with icons
<Checkbox checked={isChecked}>
  {isChecked ? <CheckboxChecked /> : <CheckboxUnchecked />}
</Checkbox>

// Search input
<SearchBox leftIcon={<Search />} />

// File upload
<FileDropZone uploadIcon={<Upload />} />
```

### Navigation Components
```jsx
// Main navigation
<MainNavigation>
  <NavigationItem icon={<Home />}>Dashboard</NavigationItem>
  <NavigationItem icon={<Document />}>Documents</NavigationItem>
  <NavigationItem icon={<Employee />}>Team</NavigationItem>
</MainNavigation>

// Breadcrumb navigation
<Breadcrumb>
  <BreadcrumbItem icon={<Home />}>Home</BreadcrumbItem>
  <BreadcrumbItem icon={<Folder />}>Projects</BreadcrumbItem>
</Breadcrumb>
```

### Data Display Components
```jsx
// DataGrid with sorting
<DataGridHeaderCell sortable>
  Name {sortDirection === 'asc' ? <SortAscending /> : <SortDescending />}
</DataGridHeaderCell>

// Status badges
<Badge icon={<Approval />} variant="success">Approved</Badge>
<Badge icon={<Pending />} variant="warning">Pending</Badge>
<Badge icon={<Error />} variant="error">Failed</Badge>
```

### Action Components
```jsx
// Primary actions
<Button priority="primary" leftIcon={<Add />}>Add New</Button>
<IconButton aria-label="Edit"><Edit /></IconButton>
<IconButton aria-label="Delete"><Delete /></IconButton>

// Secondary actions
<Button leftIcon={<Export />}>Export Data</Button>
<Button leftIcon={<Print />}>Print Report</Button>
```

### Dialog and Modal Components
```jsx
// Close button
<Dialog>
  <DialogHeader>
    <DialogTitle>Settings</DialogTitle>
    <IconButton aria-label="Close"><Close /></IconButton>
  </DialogHeader>
</Dialog>

// Section messages
<SectionMessage type="error" icon={<Error />}>
  Something went wrong
</SectionMessage>
```

## Icon Selection Guidelines

### When to Choose Each Icon:

**For CRUD Operations:**
- `Add` - Creating new records, adding items to lists
- `Edit` - Modifying existing content
- `Delete` - Permanent removal (use with confirmation)
- `Copy` - Duplicating content

**For Data Operations:**
- `Search` - Search functionality, filters
- `Filter` - Data filtering, view refinement
- `SortAscending/SortDescending` - Data sorting
- `Export/Import` - Data transfer operations

**For Navigation:**
- `Home` - Return to main/dashboard view
- `DrilldownForward` - Navigate deeper into hierarchy
- `DrilldownBackward` - Navigate back up hierarchy
- `ExternalLink` - Links to external sites/applications

**For Status Communication:**
- `Error` - Critical errors, validation failures
- `Caution` - Warnings, non-critical issues
- `Info` - Helpful information, tips
- `Approval` - Success states, completed actions
- `Pending` - Loading states, in-progress operations

**For Content Organization:**
- `Document` - Files, reports, documentation
- `Folder` - Categorization, organization
- `Tag` - Metadata, categorization
- `Bookmark` - Saved items, favorites

## Technical Implementation

### Import Patterns
```tsx
// Named imports (recommended for tree-shaking)
import { Add, Search, Delete } from '@moneyforward/mfui-icons-react';

// Individual imports (best for large applications)
import Add from '@moneyforward/mfui-icons-react/Add';
```

### Styling and Sizing
```tsx
// Icons inherit text size and color by default
<Add /> // Uses current font size and color

// Custom sizing with CSS
<Add style={{ fontSize: '24px', color: 'blue' }} />

// Using with design tokens
<Add style={{ 
  fontSize: 'var(--font-size-heading-3)', 
  color: 'var(--color-primary-content-none)' 
}} />
```

### Accessibility Best Practices
```tsx
// Decorative icons (no additional meaning)
<Add aria-hidden="true" />

// Meaningful icons need accessible names
<IconButton aria-label="Add new item">
  <Add />
</IconButton>

// Icons with text labels
<Button leftIcon={<Add />}>
  Add New Item {/* Icon is decorative when text is present */}
</Button>
```

## Component Integration Matrix

| Component Type | Commonly Used Icons | Purpose |
|----------------|-------------------|---------|
| **Button** | Add, Edit, Delete, Search, Export, Print | Primary actions |
| **IconButton** | Close, MoreVertical, MoreHorizontal, Help | Secondary actions, menus |
| **MainNavigation** | Home, Document, Employee, Applications, Setting | App navigation |
| **DataGrid** | SortAscending, SortDescending, Filter, Export | Data manipulation |
| **Form Controls** | CheckboxChecked, CheckboxUnchecked, RadioButton* | Input states |
| **Status Display** | Error, Caution, Info, Approval, Pending | Status communication |
| **File Operations** | Upload, Download, Import, Export, Clip | File management |
| **Disclosure** | DisclosureBasic*, DisclosureNested* | Expandable content |

## Anti-Patterns to Avoid

1. **Don't use icons without accessible names** for meaningful actions
2. **Don't mix icon families** - stick to MFUI icons for consistency
3. **Don't use cryptic icons** without text labels for complex actions
4. **Don't ignore semantic meaning** - use icons that match their conventional meaning
5. **Don't overuse decorative icons** - they can create visual noise
6. **Don't use icons as the sole means** of conveying critical information

## Icon Audit Checklist

- [ ] Icon semantic meaning matches its usage
- [ ] Accessible name provided for meaningful icons
- [ ] Consistent sizing across similar UI elements
- [ ] Proper color contrast maintained
- [ ] Icons work at different zoom levels
- [ ] Icons enhance rather than replace text labels for complex actions
- [ ] Loading and error states have appropriate icons
- [ ] Navigation icons follow established patterns

---

*Last updated: 2025-08-14*  
*Total icon count: 85+ icons across 6 categories*  
*Source: @moneyforward/mfui-icons-react package*  
*Architecture: SVG-based React components with SVGR generation*