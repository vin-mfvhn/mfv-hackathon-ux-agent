# MFUI Component Library Knowledge Base

*Comprehensive reference for MFUI UX Expert and Product Builder agents*

## Overview

MFUI (MoneyForward UI) is a React component library following UIDS v2 compliance and accessibility requirements. This knowledge base contains comprehensive information about 50+ components, their usage patterns, design tokens, and architectural decisions for AI agent development.

## Component Library (50+ Components)

### Layout Components
- **Panel**: Container component with consistent padding and styling
- **Stack**: Flexbox utility (VStack/HStack) for consistent spacing
- **GlobalHeader**: Application header with user navigation and branding
- **MainNavigation**: Primary navigation with responsive behavior
- **SubNavigation**: Secondary navigation for section-specific links
- **PageHeader**: Page header component with heading and action slots
- **KeyValue**: Key-value pair display with consistent layout

### Form Controls
- **Button**: Primary interactive element with variants (primary, secondary, sizes)
- **IconButton**: Button with icon content, consistent sizing
- **TextBox**: Single-line text input with validation states
- **MultilineTextBox**: Multi-line text input for longer content
- **SelectBox**: Dropdown selection with search and grouping
- **MultipleSelectBox**: Multi-selection dropdown with search
- **Checkbox**: Individual selection with validation states
- **CheckboxGroup**: Group of related checkboxes
- **RadioButton**: Mutually exclusive selection
- **RadioGroup**: Group of related radio buttons
- **DatePicker**: Date selection with calendar interface
- **DateRangePicker**: Date range selection with calendar interface
- **MonthPicker**: Month selection interface
- **MonthRangePicker**: Month range selection interface
- **SearchBox**: Optimized text input for search functionality
- **FileDropZone**: File upload with drag-and-drop
- **FileBox**: File input component with file display
- **FilterSelectBox**: Specialized select for filtering
- **FilterTrigger**: Filter activation controls
- **MultipleFilterSelectBox**: Multi-selection filter component

### Data Display
- **DataGrid**: Complex table with sorting, filtering, fixed columns
- **DisplayTable**: Read-only table for data presentation
- **Tag**: Small label for categorization
- **Badge**: Status indicator with semantic colors
- **StatusLabel**: Status indication with semantic styling
- **Typography**: Text display with semantic variants
- **Heading**: Structured heading hierarchy
- **Pagination**: Page navigation with items per page controls
- **ProgressIndicator**: Loading and progress states
- **Skeleton**: Loading state placeholders

### Navigation
- **Tabs**: Content organization with tab switching
- **TextLink**: Styled links with hover and focus states

### Feedback
- **Dialog**: Modal dialogs for forms and confirmations
- **Toast**: Temporary notification system
- **Tooltip**: Contextual help and information
- **SectionMessage**: Inline messages with severity levels
- **HelpMessage**: Form field help and error messages

### Interactive
- **DropdownMenu**: Context menus and action lists
- **SidePane**: Slide-out panels for secondary content
- **EmbeddedSidePane**: Embedded slide-out panels
- **Popover**: Positioned floating content
- **Disclosure**: Collapsible content sections
- **FocusIndicator**: Focus visibility enhancement component

### Specialized
- **CheckboxCard**: Enhanced checkbox with card styling
- **RadioButtonCard**: Enhanced radio button with card styling

## Design Tokens System

### Color Tokens
```json
{
  "color": {
    "primary": {
      "content": { "none": "blue-49", "hovered": "blue-38", "pressed": "blue-28" },
      "border": { "none": "blue-49", "hovered": "blue-38", "pressed": "blue-28" },
      "background": { "none": "blue-49", "hovered": "blue-38", "pressed": "blue-28" },
      "sub-background": { "none": "blue-88", "hovered": "blue-86", "pressed": "blue-84" }
    },
    "accent": "MoneyForward accent colors",
    "neutral": "Grayscale system",
    "signal": { "green": "success", "red": "error", "yellow": "warning" },
    "disabled": "Disabled state colors",
    "selected": "Selection state colors"
  }
}
```

### Typography Tokens
- **Typography Styles**: Complete semantic styles including page-heading, section-heading, content-heading, body variants
- **Font Families**: System font stack with fallbacks
- **Font Sizes**: Consistent scale from help-message to page-heading-1
- **Font Weights**: Regular, medium, bold variants
- **Line Heights**: Optimized for readability
- **Typography Variants**: body, strong-body, condensed-body, help-message, control-label, amount variants

### Spacing Tokens
- **Layout Grid**: Grid-based spacing system with horizontal (14px base) and vertical (24px base) scales
- **Spacing Scale**: Semantic spacing for icon-text, key-value, inline, container, paragraph, and section layouts
- **Fractional Scale**: Precise spacing with fractions (0.25x, 0.5x, 1.5x, etc.)
- **Border Radius**: Consistent corner rounding
- **Dimension**: Component sizing standards

### Layout Tokens
- **Grid**: CSS Grid layout values
- **Safe Area**: Mobile-safe positioning
- **Breakpoints**: Responsive design breakpoints

## Architecture & Development Patterns

### Component Structure Pattern
```typescript
// Standard MFUI component structure with CSS Modules
import React, { forwardRef } from 'react'
import styles from './ComponentName.module.css'
import { cx } from 'class-variance-authority'

export const ComponentName = forwardRef<HTMLElement, ComponentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <element 
        ref={ref}
        className={cx(styles.component, className)}
        {...props}
      >
        {children}
      </element>
    );
  }
);
```

### CSS Modules Pattern
- Use CSS Modules for scoped component styling
- Design tokens consumed through CSS custom properties
- Component styles are scoped and non-conflicting
- Avoid inline styles; prefer CSS Modules with design tokens

### TypeScript Integration
- All components use TypeScript with strict types
- Props extend appropriate HTML element interfaces
- JSDoc documentation required for all public APIs
- Export types for consumption by applications

### Testing Pattern
- Unit tests for complex components using Vitest and Testing Library
- Storybook stories for visual documentation and testing
- Use composeStories to reuse Storybook stories in tests
- Accessibility-first testing with semantic queries (getByRole, getByLabelText)
- Follow AAA pattern (Arrange-Act-Assert) in test structure

### Accessibility Requirements
- WCAG 2.2 Level A compliance
- Semantic HTML elements as foundation
- Proper ARIA attributes where needed
- Keyboard navigation support
- Focus management for interactive components

## Usage Patterns from Real Applications

### Form Layout Pattern:
```jsx
<form>
  <VStack gap="paragraph.vertical">
    <KeyValue
      gridTemplateColumns="160px 1fr"
      keyItem={<label>Field Label</label>}
      valueItem={
        <VStack gap="0-1of4">
          <TextBox value={value} onChange={onChange} />
          {error && <HelpMessage messageType="error">{error}</HelpMessage>}
        </VStack>
      }
    />
  </VStack>
</form>
```

### Data Table Pattern:
```jsx
<DataGrid layout="edge-to-edge" fixedHeader>
  <DataGrid.Header>
    <DataGrid.HeaderRow>
      <DataGrid.HeaderCell>Column 1</DataGrid.HeaderCell>
    </DataGrid.HeaderRow>
  </DataGrid.Header>
  <DataGrid.Body>
    {data.map(row => (
      <DataGrid.Row key={row.id}>
        <DataGrid.Cell>{row.value}</DataGrid.Cell>
      </DataGrid.Row>
    ))}
  </DataGrid.Body>
</DataGrid>
```

### Page Header Pattern:
```jsx
<PageHeader>
  <HStack gap="key-value.horizontal" justifyContent="space-between">
    <Heading tag="h1" variant="pageHeading1">
      Page Title
    </Heading>
    <Button priority="primary">Action</Button>
  </HStack>
</PageHeader>
```

## MFUI-Specific Guidelines

### MoneyForward Design Principles
1. **Consistency**: Maintain visual and behavioral consistency across all touchpoints
2. **Accessibility**: Design for all users, regardless of ability
3. **Clarity**: Information should be clear and easy to understand
4. **Efficiency**: Optimize for user task completion
5. **Trust**: Build confidence through reliable, predictable interfaces

### Component Selection Guidelines

#### When to Use Each Component:

**Layout Components:**
- Use `Panel` for grouped content sections
- Use `Stack` (VStack/HStack) for consistent spacing instead of custom CSS
- Use `PageHeader` for all page-level headers
- Use `KeyValue` for form-like data display

**Form Components:**
- Use `TextBox` for single-line text input (names, codes, short text)
- Use `MultilineTextBox` for long text content (descriptions, comments)
- Use `SelectBox` for single selection from predefined options
- Use `MultipleSelectBox` when users need to select multiple items
- Use `DatePicker`/`MonthPicker` for date selection (never plain text input)
- Use `SearchBox` for search functionality
- Use `FileDropZone` for file uploads

**Data Display:**
- Use `DataGrid` for complex data tables with interaction (sorting, filtering)
- Use `DisplayTable` for read-only data presentation
- Use `KeyValue` for form-like data display
- Use `Tag`/`Badge` for status and categorization
- Use `Typography` with appropriate variants for text content

**Navigation:**
- Use `MainNavigation` for primary app navigation
- Use `SubNavigation` for section-specific navigation
- Use `Tabs` for content switching within a page
- Use `TextLink` for all navigation links

## Component Decision Tree

### For Data Entry:
1. **Single value selection** → `SelectBox`
2. **Multiple value selection** → `MultipleSelectBox`
3. **Short text input** → `TextBox`
4. **Long text input** → `MultilineTextBox`
5. **Date selection** → `DatePicker` or `MonthPicker`
6. **Boolean selection** → `Checkbox` or `RadioButton`
7. **File upload** → `FileDropZone`
8. **Search input** → `SearchBox`

### For Data Display:
1. **Interactive table** → `DataGrid`
2. **Read-only table** → `DisplayTable`
3. **Key-value pairs** → `KeyValue`
4. **Status indication** → `Badge` or `StatusLabel`
5. **Categorization** → `Tag`
6. **Long text** → `Typography` with appropriate variant

### For Navigation:
1. **Primary app navigation** → `MainNavigation`
2. **Section navigation** → `SubNavigation`
3. **Content switching** → `Tabs`
4. **All links** → `TextLink`

### For Layout:
1. **Content grouping** → `Panel`
2. **Vertical spacing** → `VStack`
3. **Horizontal spacing** → `HStack`
4. **Page headers** → `PageHeader`
5. **Secondary content** → `SidePane` or `EmbeddedSidePane`

## Common Anti-Patterns to Avoid

1. **Don't use plain HTML buttons** → Use `Button` or `IconButton`
2. **Don't use plain HTML tables** → Use `DataGrid` or `DisplayTable`
3. **Don't use plain HTML form elements** → Use MFUI form components
4. **Don't create custom spacing** → Use `Stack` components with semantic spacing tokens
5. **Don't ignore loading states** → Use `ProgressIndicator` or `Skeleton`
6. **Don't create custom modals** → Use `Dialog`, `SidePane`, or `EmbeddedSidePane`
7. **Don't use generic error messages** → Use `HelpMessage` with specific context
8. **Don't use hardcoded spacing** → Use semantic spacing tokens like "paragraph.vertical", "icon-and-text.horizontal"

## Integration Examples

### Basic Component Usage
```jsx
import { Button, TextBox, Panel } from '@mfui/components'

// Semantic button usage
<Button priority="primary" onClick={handleSave}>
  Save Changes
</Button>

// Proper input with validation
<TextBox
  label="Account Name"
  value={accountName}
  onChange={setAccountName}
  error={validationError}
  required
/>
```

## Integration Notes for Agents

### For MFUI UX Expert Agent:
- Always recommend semantic MFUI components over custom solutions
- Consider accessibility requirements in all recommendations
- Reference real-world usage patterns for component selection
- Prioritize user task completion over visual complexity
- Maintain consistency with MoneyForward design principles

### For Product Builder Agent:
- Use these components as building blocks for generated templates
- Follow established patterns from real implementations
- Include proper TypeScript types and CSS Modules styling
- Ensure accessibility attributes are included in generated code
- Reference this knowledge base for component selection decisions

## Updates and Maintenance

This knowledge base should be updated when:
- New MFUI components are released
- Design tokens are modified
- New patterns emerge from development
- Agent feedback reveals knowledge gaps or inaccuracies

*Last updated: 2025-08-14*
*Source repository: https://github.com/moneyforward/mfui*
*Component count: 50+ components across categories*
*Architecture: CSS Modules + TypeScript + Vitest + Storybook*