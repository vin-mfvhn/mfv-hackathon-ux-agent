# MFUI Design Tokens Reference

*Comprehensive design token system for MoneyForward UI (MFUI)*

## Overview

This document defines the comprehensive set of design tokens used across the MoneyForward UI (MFUI) system following UIDS v2 compliance. These tokens ensure consistency across all 50+ components and applications, consumed through CSS custom properties and CSS Modules.

## Color Token System

### Primary Color Tokens
```json
{
  "primary": {
    "content": {
      "none": "blue-49",
      "hovered": "blue-38", 
      "pressed": "blue-28"
    },
    "border": {
      "none": "blue-49",
      "hovered": "blue-38",
      "pressed": "blue-28"
    },
    "background": {
      "none": "blue-49",
      "hovered": "blue-38", 
      "pressed": "blue-28"
    },
    "sub-background": {
      "none": "blue-88",
      "hovered": "blue-86",
      "pressed": "blue-84"
    }
  }
}
```

### Semantic Color Categories
```css
/* Signal Colors */
--mfui-color-signal-green: /* Success states */
--mfui-color-signal-red: /* Error states */
--mfui-color-signal-yellow: /* Warning states */

/* State Colors */
--mfui-color-disabled: /* Disabled elements */
--mfui-color-selected: /* Selected/active states */

/* Neutral System */
--mfui-color-neutral: /* Grayscale hierarchy */

/* Accent Colors */
--mfui-color-accent: /* MoneyForward brand accents */
```

## Typography Tokens

### Font Families
```css
--mfui-font-family-sans: ui-sans-serif, system-ui, sans-serif;
--mfui-font-family-mono: ui-monospace, 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
```

### Font Weights
```css
--mfui-font-weight-light: 300;
--mfui-font-weight-regular: 400;
--mfui-font-weight-medium: 500;
--mfui-font-weight-semibold: 600;
--mfui-font-weight-bold: 700;
```

### Typography Scale & Semantic Styles
```css
/* Semantic Typography Tokens */
--mfui-typography-page-heading-1: /* Largest page heading */
--mfui-typography-page-heading-2: /* Secondary page heading */
--mfui-typography-section-heading: /* Section headings */
--mfui-typography-content-heading: /* Content block headings */
--mfui-typography-body: /* Standard body text */
--mfui-typography-strong-body: /* Emphasized body text */
--mfui-typography-condensed-body: /* Compact body text */
--mfui-typography-help-message: /* Help and error text */
--mfui-typography-control-label: /* Form control labels */
--mfui-typography-amount: /* Financial amount display */
```

### Typography Variants
```css
/* Body text variants */
--mfui-font-body-regular: /* Standard body text */
--mfui-font-body-strong: /* Bold body text */
--mfui-font-body-condensed: /* Compact body text */

/* Specialized text */
--mfui-font-help-message: /* Form help text */
--mfui-font-control-label: /* Form labels */
--mfui-font-amount: /* Financial amounts */
```

### Line Heights
```css
--mfui-line-height-tight: 1.25;
--mfui-line-height-normal: 1.5;
--mfui-line-height-relaxed: 1.75;
```

### Letter Spacing
```css
--mfui-letter-spacing-tight: -0.025em;
--mfui-letter-spacing-normal: 0em;
--mfui-letter-spacing-wide: 0.025em;
```

## Spacing Tokens

### Layout Grid System
```css
/* Grid-based spacing with horizontal and vertical scales */
--mfui-space-horizontal-base: 14px;
--mfui-space-vertical-base: 24px;

/* Fractional spacing scale */
--mfui-space-0-25x: /* 0.25 × base */
--mfui-space-0-5x: /* 0.5 × base */
--mfui-space-1x: /* 1 × base */
--mfui-space-1-5x: /* 1.5 × base */
--mfui-space-2x: /* 2 × base */
```

### Semantic Spacing Tokens
```css
/* Context-specific spacing */
--mfui-space-icon-text-horizontal: /* Icon to text spacing */
--mfui-space-key-value-horizontal: /* Key-value pair spacing */
--mfui-space-inline-horizontal: /* Inline element spacing */
--mfui-space-container-horizontal: /* Container spacing */
--mfui-space-paragraph-vertical: /* Paragraph spacing */
--mfui-space-section-vertical: /* Section spacing */
```

## Layout Tokens

### Breakpoints
```css
--mfui-breakpoint-sm: 640px;   /* Small devices */
--mfui-breakpoint-md: 768px;   /* Tablets */
--mfui-breakpoint-lg: 1024px;  /* Small desktops */
--mfui-breakpoint-xl: 1280px;  /* Large desktops */
--mfui-breakpoint-2xl: 1536px; /* Extra large screens */
```

### Container Widths
```css
--mfui-container-sm: 640px;
--mfui-container-md: 768px;
--mfui-container-lg: 1024px;
--mfui-container-xl: 1280px;
--mfui-container-2xl: 1536px;
```

### Border Radius
```css
--mfui-border-radius-none: 0;
--mfui-border-radius-sm: 0.125rem;  /* 2px */
--mfui-border-radius-base: 0.25rem; /* 4px */
--mfui-border-radius-md: 0.375rem;  /* 6px */
--mfui-border-radius-lg: 0.5rem;    /* 8px */
--mfui-border-radius-xl: 0.75rem;   /* 12px */
--mfui-border-radius-2xl: 1rem;     /* 16px */
--mfui-border-radius-full: 9999px;
```

### Border Widths
```css
--mfui-border-width-0: 0;
--mfui-border-width-1: 1px;
--mfui-border-width-2: 2px;
--mfui-border-width-4: 4px;
--mfui-border-width-8: 8px;
```

## Shadow Tokens

### Drop Shadows
```css
--mfui-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--mfui-shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--mfui-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--mfui-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--mfui-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--mfui-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Inner Shadows
```css
--mfui-shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

## Z-Index Tokens

### Layer Hierarchy
```css
--mfui-z-index-hide: -1;
--mfui-z-index-auto: auto;
--mfui-z-index-base: 0;
--mfui-z-index-docked: 10;    /* Sticky elements */
--mfui-z-index-dropdown: 1000; /* Dropdown menus */
--mfui-z-index-sticky: 1100;   /* Sticky headers */
--mfui-z-index-banner: 1200;   /* Site banners */
--mfui-z-index-overlay: 1300;  /* Modal overlays */
--mfui-z-index-modal: 1400;    /* Modal content */
--mfui-z-index-popover: 1500;  /* Popovers, tooltips */
--mfui-z-index-toast: 1600;    /* Toast notifications */
--mfui-z-index-tooltip: 1700;  /* Tooltips */
```

## Animation Tokens

### Durations
```css
--mfui-duration-instant: 0ms;
--mfui-duration-fast: 150ms;
--mfui-duration-normal: 300ms;
--mfui-duration-slow: 500ms;
```

### Easing Functions
```css
--mfui-ease-linear: linear;
--mfui-ease-in: cubic-bezier(0.4, 0, 1, 1);
--mfui-ease-out: cubic-bezier(0, 0, 0.2, 1);
--mfui-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

## Component-Specific Token Collections

### Button Token System
```css
/* Button sizing with semantic naming */
--mfui-button-size-small: /* Compact buttons */
--mfui-button-size-medium: /* Standard buttons */
--mfui-button-size-large: /* Prominent buttons */

/* Button priority variants */
--mfui-button-priority-primary: /* Primary actions */
--mfui-button-priority-secondary: /* Secondary actions */
--mfui-button-priority-tertiary: /* Tertiary actions */
```

### Form Control Tokens
```css
/* Input field specifications */
--mfui-textbox-height-small: /* Compact text inputs */
--mfui-textbox-height-medium: /* Standard text inputs */
--mfui-textbox-height-large: /* Large text inputs */

/* Select box configurations */
--mfui-selectbox-dropdown-max-height: /* Dropdown size limits */
--mfui-selectbox-search-enabled: /* Search functionality */

/* Date picker specifications */
--mfui-datepicker-calendar-width: /* Calendar popup size */
--mfui-datepicker-range-enabled: /* Range selection mode */
```

### Layout Component Tokens
```css
/* Panel specifications */
--mfui-panel-padding: /* Internal panel spacing */
--mfui-panel-border-radius: /* Panel corner rounding */
--mfui-panel-elevation: /* Panel shadow depth */

/* Stack spacing configurations */
--mfui-vstack-gap-paragraph: /* Vertical paragraph spacing */
--mfui-vstack-gap-section: /* Vertical section spacing */
--mfui-hstack-gap-inline: /* Horizontal inline spacing */
--mfui-hstack-gap-container: /* Horizontal container spacing */
```

## CSS Modules Integration

### Token Usage in CSS Modules
```css
/* Component.module.css */
.button {
  height: var(--mfui-button-size-medium);
  padding: 0 var(--mfui-button-padding-horizontal-medium);
  background-color: var(--mfui-color-primary-background-none);
  color: var(--mfui-color-primary-content-none);
  border-radius: var(--mfui-border-radius-md);
  font-weight: var(--mfui-font-weight-medium);
  display: inline-flex;
  align-items: center;
  gap: var(--mfui-space-icon-text-horizontal);
}

.button:hover {
  background-color: var(--mfui-color-primary-background-hovered);
  color: var(--mfui-color-primary-content-hovered);
}

.button--primary {
  background-color: var(--mfui-color-primary-background-none);
  color: var(--mfui-color-primary-content-none);
}

.button--secondary {
  background-color: var(--mfui-color-neutral-background-none);
  color: var(--mfui-color-neutral-content-none);
  border: 1px solid var(--mfui-color-neutral-border-none);
}
```

### Component Implementation
```typescript
// Button.tsx
import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  priority?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

export const Button = ({ priority = 'primary', size = 'medium', children, ...props }: ButtonProps) => {
  const className = [
    styles.button,
    styles[`button--${priority}`],
    styles[`button--${size}`]
  ].filter(Boolean).join(' ')

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
```

## Token Usage Guidelines

### Semantic Token Selection
1. **Prefer semantic over literal tokens**
   ```css
   /* Good - semantic meaning */
   gap: var(--mfui-space-paragraph-vertical);
   
   /* Less ideal - literal value */
   gap: var(--mfui-space-6);
   ```

2. **Use context-appropriate spacing**
   ```css
   /* Good - context-specific */
   gap: var(--mfui-space-icon-text-horizontal); /* For icon + text */
   gap: var(--mfui-space-key-value-horizontal); /* For form layouts */
   
   /* Bad - generic spacing */
   gap: 1rem;
   ```

3. **Follow state-based color tokens**
   ```css
   /* Good - interactive states */
   color: var(--mfui-color-primary-content-none);
   
   .component:hover {
     color: var(--mfui-color-primary-content-hovered);
   }
   ```

### Component Token Priority
1. Component-specific tokens (highest priority)
2. Semantic category tokens
3. Base system tokens (lowest priority)

### Accessibility Compliance
- All color tokens meet WCAG 2.2 Level A contrast requirements
- Typography tokens include proper line-height for readability
- Interactive element tokens meet minimum touch target sizes (44px)
- Focus tokens provide visible focus indicators

### Token Customization

Tokens can be customized at the application level by overriding CSS custom properties:

```css
/* globals.css or theme.css */
:root {
  /* Custom primary color */
  --mfui-color-primary-background-none: #1e40af;
  --mfui-color-primary-content-none: #ffffff;
  
  /* Custom spacing scale */
  --mfui-space-section-vertical: 3rem;
  
  /* Custom typography */
  --mfui-typography-page-heading-1: 700 2.5rem/1.2 var(--mfui-font-family-sans);
}

/* Dark theme example */
[data-theme='dark'] {
  --mfui-color-primary-background-none: #3b82f6;
  --mfui-color-neutral-background-none: #1f2937;
  --mfui-color-neutral-content-none: #f9fafb;
}
```

This comprehensive token system ensures consistency across all MFUI components while providing the flexibility needed for application-specific customization and theming.

*Architecture: CSS Modules + TypeScript + CSS Custom Properties*
*Compliance: WCAG 2.2 Level A + UIDS v2*
*Integration: Design tokens consumed via CSS custom properties*