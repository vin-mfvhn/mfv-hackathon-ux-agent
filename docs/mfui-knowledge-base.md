# MFUI Knowledge Base for Agent Development

*Comprehensive reference for MFUI UX Expert and Product Builder agents*

## Overview

MFUI (MoneyForward UI) is a React component library following UIDS v2 compliance and accessibility requirements. This knowledge base provides curated information for AI agents to make informed component selection and usage recommendations.

## Component Library (49+ Components)

### Layout Components
- **PageLayout**: Main page structure with header slot, content area, back navigation
- **Panel**: Container component with consistent padding and styling
- **Stack**: Flexbox utility (VStack/HStack) for consistent spacing
- **GlobalHeader**: Application header with user navigation and branding
- **MainNavigation**: Primary navigation with responsive behavior
- **SubNavigation**: Secondary navigation for section-specific links

### Form Controls
- **Button**: Primary interactive element with variants (primary, secondary, sizes)
- **IconButton**: Button with icon content, consistent sizing
- **TextBox**: Single-line text input with validation states
- **MultilineTextBox**: Multi-line text input for longer content
- **SelectBox**: Dropdown selection with search and grouping
- **MultipleSelectBox**: Multi-selection dropdown with search
- **Checkbox**: Individual selection with validation states
- **RadioButton**: Mutually exclusive selection
- **DatePicker**: Date selection with calendar interface
- **MonthPicker**: Month selection interface
- **SearchBox**: Optimized text input for search functionality
- **FileDropZone**: File upload with drag-and-drop

### Data Display
- **DataGrid**: Complex table with sorting, filtering, fixed columns
- **DisplayTable**: Read-only table for data presentation
- **KeyValue**: Key-value pair display with consistent layout
- **Tag**: Small label for categorization
- **Badge**: Status indicator with semantic colors
- **Typography**: Text display with semantic variants
- **Heading**: Structured heading hierarchy
- **Pagination**: Page navigation with items per page controls
- **ProgressIndicator**: Loading and progress states

### Navigation
- **Tabs**: Content organization with tab switching
- **TextLink**: Styled links with hover and focus states
- **Breadcrumb**: Navigation path indication

### Feedback
- **Dialog**: Modal dialogs for forms and confirmations
- **Toast**: Temporary notification system
- **Tooltip**: Contextual help and information
- **SectionMessage**: Inline messages with severity levels
- **HelpMessage**: Form field help and error messages

### Interactive
- **DropdownMenu**: Context menus and action lists
- **SidePane**: Slide-out panels for secondary content
- **Popover**: Positioned floating content
- **Disclosure**: Collapsible content sections

### Specialized
- **CheckboxCard**: Enhanced checkbox with card styling
- **RadioButtonCard**: Enhanced radio button with card styling
- **StatusLabel**: Status indication with semantic styling
- **FilterSelectBox**: Specialized select for filtering
- **FilterTrigger**: Filter activation controls
- **Skeleton**: Loading state placeholders

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
- **Font Families**: System font stack with fallbacks
- **Font Sizes**: Consistent scale from small to large
- **Font Weights**: Regular, medium, bold variants
- **Line Heights**: Optimized for readability
- **Typography Variants**: strongBody, condensedBody, caption

### Spacing Tokens
- **Padding**: Consistent internal spacing (4px, 8px, 12px, 16px, 24px, 32px)
- **Margin**: External spacing system
- **Gap**: Flexbox gap values for Stack components
- **Border Radius**: Consistent corner rounding
- **Dimension**: Component sizing standards

### Layout Tokens
- **Grid**: CSS Grid layout values
- **Safe Area**: Mobile-safe positioning
- **Breakpoints**: Responsive design breakpoints

## Architecture & Development Patterns

### Component Structure Pattern
```typescript
// Standard MFUI component structure
export const ComponentName = forwardRef<HTMLElement, ComponentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <element 
        ref={ref}
        className={classNames(styles.component, className)}
        {...props}
      >
        {children}
      </element>
    );
  }
);
```

### CSS Modules Pattern
- Use CSS Modules for component-specific styling
- Import design tokens as CSS custom properties
- Follow BEM-like naming conventions within modules
- Avoid inline styles; prefer CSS classes

### TypeScript Integration
- All components use TypeScript with strict types
- Props extend appropriate HTML element interfaces
- JSDoc documentation required for all public APIs
- Export types for consumption by applications

### Testing Pattern
- Unit tests for complex components using Vitest
- Storybook stories for visual documentation and testing
- Testing Library for user interaction testing
- MSW for API mocking in integration tests

### Accessibility Requirements
- WCAG 2.2 Level A compliance
- Semantic HTML elements as foundation
- Proper ARIA attributes where needed
- Keyboard navigation support
- Focus management for interactive components

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
- Use `PageLayout` for all full-page interfaces
- Use `Panel` for grouped content sections
- Use `Stack` (VStack/HStack) for consistent spacing instead of custom CSS

**Form Components:**
- Use `TextBox` for single-line text input (names, codes, short text)
- Use `MultilineTextBox` for long text content (descriptions, comments)
- Use `SelectBox` for single selection from predefined options
- Use `MultipleSelectBox` when users need to select multiple items
- Use `DatePicker`/`MonthPicker` for date selection (never plain text input)

**Data Display:**
- Use `DataGrid` for complex data tables with interaction (sorting, filtering)
- Use `DisplayTable` for read-only data presentation
- Use `KeyValue` for form-like data display
- Use `Tag`/`Badge` for status and categorization

**Navigation:**
- Use `MainNavigation` for primary app navigation
- Use `SubNavigation` for section-specific navigation
- Use `Tabs` for content switching within a page
- Use `TextLink` for all navigation links

### Usage Patterns from Real Applications

#### Form Layout Pattern:
```jsx
<form>
  <VStack gap={12}>
    <KeyValue
      gridTemplateColumns="160px 1fr"
      keyItem={<label>Field Label</label>}
      valueItem={
        <VStack gap={4}>
          <TextBox value={value} onChange={onChange} />
          {error && <HelpMessage messageType="error">{error}</HelpMessage>}
        </VStack>
      }
    />
  </VStack>
</form>
```

#### Data Table Pattern:
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

#### Page Header Pattern:
```jsx
<PageLayout
  headerSlot={
    <PageLayout.Header
      headingSlot="Page Title"
      actionSlot={<Button priority="primary">Action</Button>}
      backButtonProps={{ href: "/parent" }}
      showBackButton
    />
  }
>
  <PageContent />
</PageLayout>
```

## Component Decision Tree

### For Data Entry:
1. **Single value selection** → `SelectBox`
2. **Multiple value selection** → `MultipleSelectBox`
3. **Short text input** → `TextBox`
4. **Long text input** → `MultilineTextBox`
5. **Date selection** → `DatePicker` or `MonthPicker`
6. **Boolean selection** → `Checkbox` or `RadioButton`
7. **File upload** → `FileDropZone`

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
5. **Breadcrumbs** → Custom breadcrumb pattern

### For Layout:
1. **Full page structure** → `PageLayout`
2. **Content grouping** → `Panel`
3. **Vertical spacing** → `VStack`
4. **Horizontal spacing** → `HStack`
5. **Secondary content** → `SidePane`

## Common Anti-Patterns to Avoid

1. **Don't use plain HTML buttons** → Use `Button` or `IconButton`
2. **Don't use plain HTML tables** → Use `DataGrid` or `DisplayTable`
3. **Don't use plain HTML form elements** → Use MFUI form components
4. **Don't create custom spacing** → Use `Stack` components with standard gaps
5. **Don't ignore loading states** → Use `ProgressIndicator` or `Skeleton`
6. **Don't create custom modals** → Use `Dialog` or `SidePane`
7. **Don't use generic error messages** → Use `HelpMessage` with specific context

## Integration Notes for Agents

### For MFUI UX Expert Agent:
- Always recommend semantic MFUI components over custom solutions
- Consider accessibility requirements in all recommendations
- Reference LA Frontend patterns for real-world usage examples
- Prioritize user task completion over visual complexity
- Maintain consistency with MoneyForward design principles

### For Product Builder Agent:
- Use these components as building blocks for generated templates
- Follow established patterns from LA Frontend implementation
- Include proper TypeScript types and CSS Module imports
- Ensure accessibility attributes are included in generated code
- Reference this knowledge base for component selection decisions

## Updates and Maintenance

This knowledge base should be updated when:
- New MFUI components are released
- Design tokens are modified
- New patterns emerge from LA Frontend development
- Agent feedback reveals knowledge gaps or inaccuracies

*Last updated: 2025-01-14*
*Source repositories: mfui, la_frontend*