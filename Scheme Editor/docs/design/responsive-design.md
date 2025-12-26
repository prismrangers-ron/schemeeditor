# Responsive Design

## Overview

Scheme Card Editor is designed to work seamlessly across desktop, tablet, and mobile devices. This document defines breakpoints, layout adaptations, and touch-friendly considerations.

---

## Breakpoints

| Name | Width | Devices |
|------|-------|---------|
| **Mobile** | < 640px | Phones (portrait) |
| **Tablet** | 640px - 1024px | Tablets, large phones |
| **Desktop** | > 1024px | Laptops, desktops |

### CSS Custom Properties

```css
:root {
  /* Breakpoint values (for reference in JS if needed) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

### Media Query Mixins

```css
/* Mobile first approach */

/* Tablet and up */
@media (min-width: 640px) {
  /* Tablet styles */
}

/* Desktop and up */
@media (min-width: 1024px) {
  /* Desktop styles */
}

/* Large desktop */
@media (min-width: 1280px) {
  /* Large screen styles */
}
```

---

## Layout Changes

### Desktop (> 1024px)

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌───────────────────────┐   ┌───────────────────────┐     │
│   │                       │   │                       │     │
│   │                       │   │   Upload Zone         │     │
│   │    CARD PREVIEW       │   │                       │     │
│   │    (Sticky)           │   ├───────────────────────┤     │
│   │                       │   │   Card Name Input     │     │
│   │                       │   ├───────────────────────┤     │
│   │                       │   │   Description Input   │     │
│   │                       │   ├───────────────────────┤     │
│   │                       │   │   Download Buttons    │     │
│   └───────────────────────┘   └───────────────────────┘     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                         FOOTER                               │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Two-column layout (50/50 split)
- Card preview is sticky (follows scroll)
- Generous spacing between elements
- Full-width container with max-width

### Tablet (640px - 1024px)

```
┌─────────────────────────────────────┐
│              HEADER                  │
├─────────────────────────────────────┤
│                                      │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   │       CARD PREVIEW          │   │
│   │       (Centered)            │   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                      │
│   ┌─────────────────────────────┐   │
│   │       Upload Zone           │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │       Card Name Input       │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │       Description           │   │
│   └─────────────────────────────┘   │
│   ┌────────────┐ ┌────────────┐     │
│   │ JPG Button │ │ PNG Button │     │
│   └────────────┘ └────────────┘     │
│                                      │
├─────────────────────────────────────┤
│              FOOTER                  │
└─────────────────────────────────────┘
```

**Features:**
- Single column layout
- Card preview at top, centered
- Controls below preview
- Download buttons side-by-side
- Reduced padding

### Mobile (< 640px)

```
┌───────────────────────────┐
│          HEADER           │
├───────────────────────────┤
│                           │
│  ┌─────────────────────┐  │
│  │                     │  │
│  │   CARD PREVIEW      │  │
│  │   (Full width)      │  │
│  │                     │  │
│  └─────────────────────┘  │
│                           │
│  ┌─────────────────────┐  │
│  │   Upload Zone       │  │
│  └─────────────────────┘  │
│                           │
│  ┌─────────────────────┐  │
│  │   Card Name         │  │
│  └─────────────────────┘  │
│                           │
│  ┌─────────────────────┐  │
│  │   Description       │  │
│  └─────────────────────┘  │
│                           │
│  ┌─────────────────────┐  │
│  │   Download JPG      │  │
│  └─────────────────────┘  │
│  ┌─────────────────────┐  │
│  │   Download PNG      │  │
│  └─────────────────────┘  │
│                           │
├───────────────────────────┤
│          FOOTER           │
└───────────────────────────┘
```

**Features:**
- Single column, full width
- Card preview scales to fit
- Stacked download buttons
- Minimal padding
- Touch-optimized spacing

---

## CSS Implementation

### Base Layout (Mobile First)

```css
.main-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-4);
}

.preview-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.controls-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.download-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.download-buttons .btn {
  width: 100%;
}
```

### Tablet Styles

```css
@media (min-width: 640px) {
  .main-layout {
    padding: var(--space-5);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .download-buttons {
    flex-direction: row;
  }
  
  .download-buttons .btn {
    flex: 1;
  }
}
```

### Desktop Styles

```css
@media (min-width: 1024px) {
  .main-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-7);
    max-width: 1200px;
    padding: var(--space-6);
    align-items: start;
  }
  
  .preview-section {
    position: sticky;
    top: var(--space-5);
  }
  
  .controls-section {
    gap: var(--space-5);
  }
}
```

---

## Canvas Scaling

The card preview must scale responsively while maintaining aspect ratio:

```css
.preview-container {
  width: 100%;
  max-width: 400px; /* Match canvas width */
}

#cardCanvas {
  width: 100%;
  height: auto;
  display: block;
}
```

### JavaScript Responsive Handling

```javascript
function handleResize() {
  const container = document.querySelector('.preview-container');
  const canvas = document.getElementById('cardCanvas');
  
  // Get container width
  const containerWidth = container.clientWidth;
  
  // Scale canvas display (not actual resolution)
  if (containerWidth < CARD_WIDTH) {
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
  } else {
    canvas.style.width = `${CARD_WIDTH}px`;
    canvas.style.height = `${CARD_HEIGHT}px`;
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', handleResize);
```

---

## Touch Considerations

### Minimum Touch Target Size

All interactive elements should be at least **44x44 pixels** (Apple HIG) or **48x48 pixels** (Material Design):

```css
.btn,
.upload-zone,
.input-field,
.textarea {
  min-height: 48px;
}
```

### Touch-Friendly Spacing

```css
/* Increase spacing between interactive elements on touch devices */
@media (pointer: coarse) {
  .controls-section {
    gap: var(--space-5);
  }
  
  .input-group {
    gap: var(--space-3);
  }
}
```

### Disable Hover Effects on Touch

```css
@media (hover: none) {
  .btn:hover {
    transform: none;
    box-shadow: none;
  }
  
  .upload-zone:hover {
    border-color: inherit;
    background: inherit;
  }
}

/* Re-enable for active state */
@media (hover: none) {
  .btn:active {
    transform: scale(0.98);
  }
}
```

---

## Typography Scaling

### Fluid Typography

```css
/* Clamp font sizes for smooth scaling */
h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
}

h2 {
  font-size: clamp(1.25rem, 4vw, 1.5rem);
}

body {
  font-size: clamp(0.875rem, 2.5vw, 1rem);
}
```

### Mobile Typography Adjustments

```css
@media (max-width: 640px) {
  .header h1 {
    font-size: 1.5rem;
  }
  
  .header .tagline {
    font-size: 0.875rem;
  }
  
  label {
    font-size: 0.875rem;
  }
}
```

---

## Input Considerations

### Mobile Input Zoom Prevention

Prevent iOS zoom on input focus by ensuring font size is at least 16px:

```css
.input-field,
.textarea {
  font-size: 16px; /* Prevents zoom on iOS */
}

@media (min-width: 1024px) {
  .input-field,
  .textarea {
    font-size: 14px; /* Can be smaller on desktop */
  }
}
```

### Virtual Keyboard Handling

```javascript
// Detect virtual keyboard and adjust layout
function handleVirtualKeyboard() {
  const initialHeight = window.innerHeight;
  
  window.addEventListener('resize', () => {
    const currentHeight = window.innerHeight;
    const keyboardOpen = currentHeight < initialHeight * 0.75;
    
    document.body.classList.toggle('keyboard-open', keyboardOpen);
  });
}
```

```css
.keyboard-open .preview-section {
  display: none; /* Hide preview when keyboard is open on mobile */
}

@media (min-width: 1024px) {
  .keyboard-open .preview-section {
    display: block;
  }
}
```

---

## Image Upload on Mobile

### Camera Access

```html
<!-- Allow camera capture on mobile -->
<input 
  type="file" 
  id="imageInput" 
  accept="image/jpeg,image/png,image/webp" 
  capture="environment"
  hidden
>
```

### Mobile Upload UX

```css
@media (max-width: 640px) {
  .upload-zone {
    padding: var(--space-5);
  }
  
  .upload-zone .upload-text {
    font-size: 0.875rem;
  }
  
  .upload-zone .upload-icon {
    font-size: 2rem;
  }
}
```

---

## Download on Mobile

### Mobile Download Experience

Some mobile browsers handle downloads differently. Add helpful guidance:

```javascript
function showMobileDownloadTip() {
  if (isMobileDevice()) {
    const tip = document.createElement('p');
    tip.className = 'mobile-tip';
    tip.textContent = 'Tip: Your card will be saved to your Downloads folder or Photos app.';
    document.querySelector('.download-section').appendChild(tip);
  }
}
```

```css
.mobile-tip {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-align: center;
  margin-top: var(--space-2);
}

@media (min-width: 1024px) {
  .mobile-tip {
    display: none;
  }
}
```

---

## Testing Checklist

### Device Testing

- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 12/13/14 Pro Max (428px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop 1280px
- [ ] Desktop 1920px

### Orientation Testing

- [ ] Portrait mode
- [ ] Landscape mode
- [ ] Orientation change handling

### Touch Testing

- [ ] All buttons easily tappable
- [ ] No accidental taps
- [ ] Drag and drop works (or provides fallback)
- [ ] File picker opens correctly

---

## Browser DevTools Testing

### Chrome DevTools Device Mode

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select device or set custom dimensions
4. Test touch events with "touch" toggle

### Responsive Design Mode (Firefox)

1. Open DevTools (F12)
2. Click responsive design mode icon
3. Select device presets

---

*Responsive Design Version: 1.0*


