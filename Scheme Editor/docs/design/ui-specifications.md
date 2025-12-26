# UI Specifications

## Overview

This document defines the visual design system for Scheme Card Editor, including colors, typography, spacing, and component styling.

---

## Brand Colors

### Primary Palette

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Golden Yellow** | `#FFD753` | rgb(255, 215, 83) | Main background |
| **Purple** | `#8F68FC` | rgb(143, 104, 252) | Primary accent, buttons |
| **Pink** | `#FF66CC` | rgb(255, 102, 204) | Secondary accent, highlights |
| **Teal** | `#1ABF9E` | rgb(26, 191, 158) | Success states, tertiary accent |

### Extended Palette

| Name | Hex Code | Usage |
|------|----------|-------|
| **White** | `#FFFFFF` | Cards, inputs, contrast areas |
| **Light Gray** | `#F5F5F5` | Subtle backgrounds |
| **Medium Gray** | `#888888` | Placeholder text |
| **Dark Gray** | `#333333` | Body text |
| **Black** | `#1A1A1A` | Headings, high contrast |

### CSS Variables

```css
:root {
  /* Brand Colors */
  --color-primary: #FFD753;
  --color-accent-purple: #8F68FC;
  --color-accent-pink: #FF66CC;
  --color-accent-teal: #1ABF9E;
  
  /* Neutrals */
  --color-white: #FFFFFF;
  --color-light-gray: #F5F5F5;
  --color-medium-gray: #888888;
  --color-dark-gray: #333333;
  --color-black: #1A1A1A;
  
  /* Semantic */
  --color-background: var(--color-primary);
  --color-surface: var(--color-white);
  --color-text-primary: var(--color-black);
  --color-text-secondary: var(--color-dark-gray);
  --color-text-muted: var(--color-medium-gray);
  --color-error: #E53935;
  --color-success: var(--color-accent-teal);
}
```

---

## Typography

### Font Families

| Font | Usage | Source |
|------|-------|--------|
| **Grandarena** | Card name text (on canvas) | Local OTF file |
| **Poppins** | UI text, card description | Google Fonts / Local |

### Font Loading

```css
/* Custom font - Grandarena */
@font-face {
  font-family: 'Grandarena';
  src: url('../assets/fonts/Grandarena.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Poppins from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* Fallback stack */
body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Title) | 32px | 700 | 1.2 |
| H2 (Section) | 24px | 600 | 1.3 |
| H3 (Subsection) | 18px | 600 | 1.4 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 400 | 1.4 |
| Caption | 12px | 400 | 1.4 |
| Button | 16px | 600 | 1 |

### CSS Typography

```css
h1 {
  font-size: 2rem;      /* 32px */
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text-primary);
}

h2 {
  font-size: 1.5rem;    /* 24px */
  font-weight: 600;
  line-height: 1.3;
}

h3 {
  font-size: 1.125rem;  /* 18px */
  font-weight: 600;
  line-height: 1.4;
}

body {
  font-size: 1rem;      /* 16px */
  font-weight: 400;
  line-height: 1.5;
}

.text-small {
  font-size: 0.875rem;  /* 14px */
}

.text-caption {
  font-size: 0.75rem;   /* 12px */
  color: var(--color-text-muted);
}
```

---

## Spacing System

### Base Unit
Base spacing unit: **8px**

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Default small |
| `--space-3` | 12px | Medium-small |
| `--space-4` | 16px | Default medium |
| `--space-5` | 24px | Large |
| `--space-6` | 32px | Section gaps |
| `--space-7` | 48px | Major sections |
| `--space-8` | 64px | Page margins |

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
}
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small elements, tags |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Large cards |
| `--radius-full` | 9999px | Pills, avatars |

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

---

## Shadows

```css
:root {
  /* Subtle shadow for inputs */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  /* Default card shadow */
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  /* Elevated elements */
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
  
  /* High emphasis */
  --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  /* Colored shadow for buttons */
  --shadow-purple: 0 4px 15px rgba(143, 104, 252, 0.4);
  --shadow-pink: 0 4px 15px rgba(255, 102, 204, 0.4);
}
```

---

## Component Styles

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-accent-purple), var(--color-accent-pink));
  color: white;
  padding: var(--space-3) var(--space-5);
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-purple);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: white;
  color: var(--color-accent-purple);
  padding: var(--space-3) var(--space-5);
  border: 2px solid var(--color-accent-purple);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--color-accent-purple);
  color: white;
}
```

### Input Fields

```css
.input-field {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-light-gray);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-accent-purple);
  box-shadow: 0 0 0 3px rgba(143, 104, 252, 0.2);
}

.input-field::placeholder {
  color: var(--color-text-muted);
}
```

### Text Area

```css
.textarea {
  width: 100%;
  min-height: 120px;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-light-gray);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.textarea:focus {
  outline: none;
  border-color: var(--color-accent-purple);
  box-shadow: 0 0 0 3px rgba(143, 104, 252, 0.2);
}
```

### Cards/Panels

```css
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-md);
}

.card-elevated {
  box-shadow: var(--shadow-lg);
}
```

### Upload Zone

```css
.upload-zone {
  border: 2px dashed var(--color-medium-gray);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-light-gray);
}

.upload-zone:hover {
  border-color: var(--color-accent-purple);
  background: rgba(143, 104, 252, 0.05);
}

.upload-zone.dragover {
  border-style: solid;
  border-color: var(--color-accent-purple);
  background: rgba(143, 104, 252, 0.1);
}
```

---

## Layout

### Page Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}
```

### Main Layout Grid
```css
.main-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  align-items: start;
}

/* Preview side */
.preview-section {
  position: sticky;
  top: var(--space-5);
}

/* Controls side */
.controls-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
```

### Input Groups
```css
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.input-group label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}
```

---

## Header

```css
.header {
  padding: var(--space-5) 0;
  text-align: center;
}

.header h1 {
  margin: 0;
  background: linear-gradient(135deg, var(--color-accent-purple), var(--color-accent-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header .tagline {
  color: var(--color-text-secondary);
  margin-top: var(--space-2);
}
```

---

## Footer

```css
.footer {
  padding: var(--space-5) 0;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: var(--space-7);
}
```

---

## Animations

### Transitions
```css
:root {
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;
}
```

### Hover Scale
```css
.hover-scale {
  transition: transform var(--transition-normal);
}

.hover-scale:hover {
  transform: scale(1.02);
}
```

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease forwards;
}
```

---

## Icons

Use emoji icons for simplicity (no icon library required):

| Icon | Emoji | Usage |
|------|-------|-------|
| Upload | 📷 or 🖼️ | Upload zone |
| Download | 📥 | Download buttons |
| Success | ✅ | Success states |
| Error | ❌ | Error states |
| Loading | ⏳ | Loading states |

---

*Design Specifications Version: 1.0*


