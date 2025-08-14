# MFUI Design Tokens Reference

## Overview

This document defines the comprehensive set of design tokens used across the MoneyForward UI (MFUI) system. These tokens ensure consistency across all components and applications.

## Color Tokens

### Primary Colors
```css
/* Brand Primary - Blue */
--mfui-color-primary-50: #f0f9ff;
--mfui-color-primary-100: #e0f2fe;
--mfui-color-primary-200: #bae6fd;
--mfui-color-primary-300: #7dd3fc;
--mfui-color-primary-400: #38bdf8;
--mfui-color-primary-500: #0ea5e9; /* Base primary */
--mfui-color-primary-600: #0284c7;
--mfui-color-primary-700: #0369a1;
--mfui-color-primary-800: #075985;
--mfui-color-primary-900: #0c4a6e;
```

### Secondary Colors
```css
/* Neutral Gray */
--mfui-color-gray-50: #fafafa;
--mfui-color-gray-100: #f4f4f5;
--mfui-color-gray-200: #e4e4e7;
--mfui-color-gray-300: #d4d4d8;
--mfui-color-gray-400: #a1a1aa;
--mfui-color-gray-500: #71717a;
--mfui-color-gray-600: #52525b;
--mfui-color-gray-700: #3f3f46;
--mfui-color-gray-800: #27272a;
--mfui-color-gray-900: #18181b;
```

### Semantic Colors
```css
/* Success - Green */
--mfui-color-success-50: #f0fdf4;
--mfui-color-success-100: #dcfce7;
--mfui-color-success-500: #22c55e; /* Base success */
--mfui-color-success-600: #16a34a;
--mfui-color-success-700: #15803d;

/* Warning - Amber */
--mfui-color-warning-50: #fffbeb;
--mfui-color-warning-100: #fef3c7;
--mfui-color-warning-500: #f59e0b; /* Base warning */
--mfui-color-warning-600: #d97706;
--mfui-color-warning-700: #b45309;

/* Error - Red */
--mfui-color-error-50: #fef2f2;
--mfui-color-error-100: #fee2e2;
--mfui-color-error-500: #ef4444; /* Base error */
--mfui-color-error-600: #dc2626;
--mfui-color-error-700: #b91c1c;
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

### Font Sizes
```css
--mfui-font-size-xs: 0.75rem;    /* 12px */
--mfui-font-size-sm: 0.875rem;   /* 14px */
--mfui-font-size-base: 1rem;     /* 16px */
--mfui-font-size-lg: 1.125rem;   /* 18px */
--mfui-font-size-xl: 1.25rem;    /* 20px */
--mfui-font-size-2xl: 1.5rem;    /* 24px */
--mfui-font-size-3xl: 1.875rem;  /* 30px */
--mfui-font-size-4xl: 2.25rem;   /* 36px */
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

### Base Spacing Scale
```css
--mfui-space-0: 0;
--mfui-space-1: 0.25rem;  /* 4px */
--mfui-space-2: 0.5rem;   /* 8px */
--mfui-space-3: 0.75rem;  /* 12px */
--mfui-space-4: 1rem;     /* 16px */
--mfui-space-5: 1.25rem;  /* 20px */
--mfui-space-6: 1.5rem;   /* 24px */
--mfui-space-8: 2rem;     /* 32px */
--mfui-space-10: 2.5rem;  /* 40px */
--mfui-space-12: 3rem;    /* 48px */
--mfui-space-16: 4rem;    /* 64px */
--mfui-space-20: 5rem;    /* 80px */
--mfui-space-24: 6rem;    /* 96px */
```

### Component Spacing
```css
--mfui-space-component-xs: var(--mfui-space-1);  /* 4px */
--mfui-space-component-sm: var(--mfui-space-2);  /* 8px */
--mfui-space-component-md: var(--mfui-space-4);  /* 16px */
--mfui-space-component-lg: var(--mfui-space-6);  /* 24px */
--mfui-space-component-xl: var(--mfui-space-8);  /* 32px */
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

## Component-Specific Tokens

### Button Tokens
```css
--mfui-button-height-sm: 2rem;    /* 32px */
--mfui-button-height-md: 2.5rem;  /* 40px */
--mfui-button-height-lg: 3rem;    /* 48px */

--mfui-button-padding-x-sm: 0.75rem;  /* 12px */
--mfui-button-padding-x-md: 1rem;     /* 16px */
--mfui-button-padding-x-lg: 1.5rem;   /* 24px */
```

### Input Tokens
```css
--mfui-input-height-sm: 2rem;    /* 32px */
--mfui-input-height-md: 2.5rem;  /* 40px */
--mfui-input-height-lg: 3rem;    /* 48px */

--mfui-input-padding-x: 0.75rem;  /* 12px */
--mfui-input-padding-y: 0.5rem;   /* 8px */

--mfui-input-border-width: 1px;
--mfui-input-border-radius: var(--mfui-border-radius-md);
```

### Card Tokens
```css
--mfui-card-padding: 1.5rem;  /* 24px */
--mfui-card-border-radius: var(--mfui-border-radius-lg);
--mfui-card-shadow: var(--mfui-shadow-sm);
```

## Usage Guidelines

### Token Naming Convention
- Prefix: `--mfui-`
- Category: `color`, `space`, `font`, etc.
- Property: `primary`, `secondary`, `size`, etc.
- Scale: `50`, `100`, `sm`, `md`, `lg`, etc.

### Best Practices

1. **Always use tokens instead of hard-coded values**
   ```css
   /* Good */
   color: var(--mfui-color-primary-500);
   
   /* Bad */
   color: #0ea5e9;
   ```

2. **Use semantic color tokens for meaning**
   ```css
   /* Good */
   color: var(--mfui-color-success-600);
   
   /* Less ideal */
   color: var(--mfui-color-green-600);
   ```

3. **Follow the spacing scale consistently**
   ```css
   /* Good */
   margin: var(--mfui-space-4) var(--mfui-space-6);
   
   /* Bad */
   margin: 15px 25px;
   ```

4. **Use component-specific tokens when available**
   ```css
   /* Good */
   height: var(--mfui-button-height-md);
   
   /* Less ideal */
   height: var(--mfui-space-10);
   ```

### Customization

Design tokens can be customized at the application level by overriding CSS custom properties:

```css
:root {
  /* Custom primary color */
  --mfui-color-primary-500: #1e40af;
  
  /* Custom spacing scale */
  --mfui-space-4: 1.125rem; /* 18px instead of 16px */
}
```

This token system ensures consistency across all MFUI components and enables easy theming and customization while maintaining design coherence.