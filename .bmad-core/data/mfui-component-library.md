# MFUI Component Library Knowledge Base

## Overview

This knowledge base contains comprehensive information about the MoneyForward UI (MFUI) React component library, including all 49+ components, their usage patterns, design tokens, and architectural decisions extracted from real-world implementations.

## Component Categories

### Layout Components
- **GlobalHeader**: Main navigation header with user account, notifications, and tenant switching
- **PageHeader**: Secondary page-level header with breadcrumbs and page actions
- **MainNavigation**: Primary navigation sidebar with collapsible sections
- **SidePane**: Modal-like side panel for detailed forms and workflows

### Data Display
- **DataGrid**: Advanced table component with sorting, filtering, pagination, and row selection
- **Table**: Simple table component for basic tabular data
- **Card**: Content container with consistent spacing and elevation
- **List**: Flexible list component for various content types

### Form Controls
- **TextInput**: Single-line text input with validation states
- **TextArea**: Multi-line text input
- **Select**: Dropdown selection component
- **DatePicker**: Calendar-based date selection
- **Checkbox**: Boolean selection control
- **RadioButton**: Single selection from multiple options
- **Switch**: Toggle control for binary states

### Navigation
- **Tabs**: Horizontal navigation between related content
- **Breadcrumbs**: Hierarchical navigation path
- **Pagination**: Navigation through large datasets
- **Link**: Styled navigation links

### Feedback
- **Toast**: Temporary notification messages
- **Dialog**: Modal dialogs for confirmations and forms
- **Tooltip**: Contextual help information
- **LoadingSpinner**: Visual loading indicators
- **ProgressBar**: Task completion visualization

### Actions
- **Button**: Primary, secondary, and tertiary action buttons
- **IconButton**: Compact button with icon only
- **DropdownMenu**: Contextual action menus
- **MenuButton**: Button that opens dropdown menu

## Design Tokens

### Colors
- **Primary**: Blue color scheme for main actions and branding
- **Secondary**: Gray color scheme for supporting elements
- **Success**: Green for positive feedback and confirmations
- **Warning**: Yellow for cautionary messages
- **Error**: Red for errors and destructive actions
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: System font stack optimized for readability
- **Scale**: Consistent type scale from 12px to 32px
- **Weights**: Regular (400), Medium (500), Bold (700)
- **Line Heights**: 1.2 for headings, 1.5 for body text

### Spacing
- **Base Unit**: 4px grid system
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Component Spacing**: Consistent internal padding and margins

### Layout
- **Breakpoints**: 768px (tablet), 1024px (desktop), 1440px (wide)
- **Grid**: 12-column responsive grid system
- **Max Width**: 1200px container for content

## Usage Patterns from LA Frontend

### List Page Pattern
**Purpose**: Display collections of items with filtering and actions
**Components**: DataGrid + PageHeader + Toolbar + Pagination
**Use Cases**: Account items, lease ledgers, trade partners

### CRUD Form Pattern  
**Purpose**: Create, read, update, delete operations
**Components**: Dialog + Form fields + Button groups
**Use Cases**: Account pattern creation, trade partner management

### Detail Page Pattern
**Purpose**: Display comprehensive item information
**Components**: Card layout + Tabs + Action buttons
**Use Cases**: Lease ledger details, account item details

### Dashboard Page Pattern
**Purpose**: Overview with key metrics and quick actions
**Components**: Cards + Charts + Quick action buttons
**Use Cases**: Main dashboard, settings overview

### SidePane Workflow Pattern
**Purpose**: Multi-step processes without leaving current page
**Components**: SidePane + Form steps + Progress indicator
**Use Cases**: Complex forms, data imports, approval workflows

## Component Selection Guidelines

### Semantic Selection Principles
1. **Choose by Function, Not Appearance**: Select components based on their intended purpose
2. **Maintain Consistency**: Use the same component for similar use cases across the application
3. **Consider Context**: Account for user mental models and expected interactions
4. **Prioritize Accessibility**: Ensure proper keyboard navigation and screen reader support

### Common Selection Decisions

**For Data Display:**
- Use DataGrid for complex tables with interaction
- Use Table for simple read-only tabular data
- Use Card for grouped content with actions
- Use List for simple collections

**For Forms:**
- Use TextInput for short single-line text
- Use TextArea for longer multi-line text
- Use Select for 7+ options, RadioButton for 2-6 options
- Use DatePicker for date selection, not TextInput

**For Navigation:**
- Use Tabs for related content sections
- Use Breadcrumbs for hierarchical navigation
- Use Link for navigation, Button for actions

## Technical Implementation Notes

### CSS Modules Approach
- Each component includes CSS modules for styling
- Design tokens are consumed through CSS custom properties
- Component styles are scoped and non-conflicting

### Responsive Behavior
- Components adapt to different screen sizes automatically
- Mobile-first approach with progressive enhancement
- Touch-friendly interaction targets (minimum 44px)

### Accessibility Standards
- WCAG 2.1 AA compliance by default
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Focus management in complex components

## Common Anti-Patterns to Avoid

1. **Generic Containers**: Don't use generic divs when semantic components exist
2. **Custom Styling**: Don't override component styles, use provided variants instead
3. **Inconsistent Patterns**: Don't create one-off solutions when patterns exist
4. **Accessibility Bypasses**: Don't skip accessibility features for faster implementation

## Integration Examples

### Basic Component Usage
```jsx
import { Button, TextInput, Card } from '@mfui/components'

// Semantic button usage
<Button variant="primary" onClick={handleSave}>
  Save Changes
</Button>

// Proper input with validation
<TextInput
  label="Account Name"
  value={accountName}
  onChange={setAccountName}
  error={validationError}
  required
/>
```

### Pattern Implementation
```jsx
// List Page Pattern
<PageHeader title="Account Items" />
<DataGrid
  data={accountItems}
  columns={columns}
  onRowSelect={handleRowSelect}
  pagination={paginationConfig}
/>
```

This knowledge base serves as the foundation for making informed component selection decisions that maintain MoneyForward design system consistency and follow proven usage patterns.