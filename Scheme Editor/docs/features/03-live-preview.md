# Feature: Live Preview

## Overview

The live preview feature provides real-time visual feedback as users customize their card. Using HTML5 Canvas, the preview composites the card template, user image, and text into a single cohesive preview.

---

## User Stories

- As a user, I want to see my card update instantly when I upload an image
- As a user, I want to see my text appear on the card as I type
- As a user, I want the preview to accurately represent the final downloaded image
- As a user, I want smooth, flicker-free updates

---

## Functional Requirements

### FR-1: Canvas Rendering
- Use HTML5 Canvas for image composition
- Match canvas dimensions to card template
- High-resolution rendering for quality output

### FR-2: Real-Time Updates
- Preview updates on every input change
- No perceptible delay between input and visual update
- Debounce rapid updates for performance

### FR-3: Layer Composition
- Render layers in correct order (back to front)
- Support transparency in template
- Proper clipping of user image to artwork area

### FR-4: Visual Fidelity
- Preview matches final export exactly
- Consistent rendering across browsers
- No quality loss in preview

---

## Layer Composition Order

The card is rendered in a specific layer order:

```
┌─────────────────────────────────┐
│  Layer 4: Card Name Text        │  ← Top (last drawn)
├─────────────────────────────────┤
│  Layer 3: Card Description Text │
├─────────────────────────────────┤
│  Layer 2: Card Template (PNG)   │
├─────────────────────────────────┤
│  Layer 1: User Image            │  ← Bottom (first drawn)
└─────────────────────────────────┘
```

**Note:** The exact layer order may change based on template design. If the template has a transparent "window" for the image, the user image goes first. If text overlays the template, it goes last.

---

## Technical Implementation

### Canvas Setup
```html
<div class="preview-container">
  <canvas id="cardCanvas" width="400" height="560"></canvas>
</div>
```

```javascript
const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');

// Card dimensions (match template)
const CARD_WIDTH = 400;
const CARD_HEIGHT = 560;

// Set canvas size
canvas.width = CARD_WIDTH;
canvas.height = CARD_HEIGHT;
```

### Main Render Function
```javascript
// State variables
let cardTemplate = null;  // Loaded template image
let userImage = null;     // User uploaded image
let cardName = '';        // Card name text
let cardDescription = ''; // Card description text

function renderCard() {
  // Clear canvas
  ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  
  // Layer 1: User Image (behind template)
  if (userImage) {
    drawUserImage(ctx, userImage);
  }
  
  // Layer 2: Card Template
  if (cardTemplate) {
    ctx.drawImage(cardTemplate, 0, 0, CARD_WIDTH, CARD_HEIGHT);
  }
  
  // Layer 3: Card Name
  if (cardName) {
    drawCardName(ctx, cardName);
  }
  
  // Layer 4: Card Description
  if (cardDescription) {
    drawCardDescription(ctx, cardDescription);
  }
}
```

### Template Loading
```javascript
async function loadTemplate() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      cardTemplate = img;
      resolve(img);
    };
    img.onerror = () => reject(new Error('Failed to load card template'));
    img.src = 'assets/images/card-template.png';
  });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', async () => {
  await loadTemplate();
  await loadFonts();
  renderCard(); // Initial render with empty card
});
```

### User Image Drawing
```javascript
// Image artwork area configuration (adjust based on template)
const IMAGE_AREA = {
  x: 25,       // Left edge
  y: 60,       // Top edge
  width: 350,  // Area width
  height: 230  // Area height
};

function drawUserImage(ctx, img) {
  // Save context state
  ctx.save();
  
  // Create clipping region for artwork area
  ctx.beginPath();
  ctx.rect(IMAGE_AREA.x, IMAGE_AREA.y, IMAGE_AREA.width, IMAGE_AREA.height);
  ctx.clip();
  
  // Draw image with cover behavior
  drawImageCover(ctx, img, IMAGE_AREA.x, IMAGE_AREA.y, IMAGE_AREA.width, IMAGE_AREA.height);
  
  // Restore context
  ctx.restore();
}

function drawImageCover(ctx, img, x, y, width, height) {
  const imgRatio = img.width / img.height;
  const areaRatio = width / height;
  
  let drawWidth, drawHeight, offsetX, offsetY;
  
  if (imgRatio > areaRatio) {
    drawHeight = height;
    drawWidth = img.width * (height / img.height);
    offsetX = (drawWidth - width) / 2;
    offsetY = 0;
  } else {
    drawWidth = width;
    drawHeight = img.height * (width / img.width);
    offsetX = 0;
    offsetY = (drawHeight - height) / 2;
  }
  
  ctx.drawImage(img, x - offsetX, y - offsetY, drawWidth, drawHeight);
}
```

---

## Performance Optimization

### Debounced Rendering
Prevent excessive renders during rapid typing:

```javascript
let renderTimeout = null;

function scheduleRender() {
  if (renderTimeout) {
    cancelAnimationFrame(renderTimeout);
  }
  renderTimeout = requestAnimationFrame(() => {
    renderCard();
  });
}

// Use scheduleRender() instead of renderCard() in input handlers
cardNameInput.addEventListener('input', (e) => {
  cardName = e.target.value;
  scheduleRender();
});
```

### Image Caching
Cache processed images to avoid recomputation:

```javascript
let cachedUserImageData = null;

function drawUserImage(ctx, img) {
  if (!cachedUserImageData) {
    // Create offscreen canvas for caching
    const offscreen = document.createElement('canvas');
    offscreen.width = IMAGE_AREA.width;
    offscreen.height = IMAGE_AREA.height;
    const offCtx = offscreen.getContext('2d');
    
    // Draw to offscreen canvas
    drawImageCover(offCtx, img, 0, 0, IMAGE_AREA.width, IMAGE_AREA.height);
    cachedUserImageData = offscreen;
  }
  
  ctx.drawImage(cachedUserImageData, IMAGE_AREA.x, IMAGE_AREA.y);
}

// Clear cache when new image is uploaded
function handleNewImage(img) {
  userImage = img;
  cachedUserImageData = null;
  renderCard();
}
```

---

## High-DPI Display Support

For crisp rendering on Retina/high-DPI displays:

```javascript
function setupHighDPICanvas(canvas, width, height) {
  const dpr = window.devicePixelRatio || 1;
  
  // Set actual canvas size in memory
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  
  // Set display size via CSS
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  // Scale context to match
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  
  return ctx;
}
```

---

## Empty State

When no image or text is provided, show a helpful empty state:

```javascript
function renderEmptyState(ctx) {
  ctx.fillStyle = '#E0E0E0';
  ctx.fillRect(IMAGE_AREA.x, IMAGE_AREA.y, IMAGE_AREA.width, IMAGE_AREA.height);
  
  ctx.font = '16px Poppins';
  ctx.fillStyle = '#888888';
  ctx.textAlign = 'center';
  ctx.fillText(
    'Your image will appear here',
    IMAGE_AREA.x + IMAGE_AREA.width / 2,
    IMAGE_AREA.y + IMAGE_AREA.height / 2
  );
}
```

---

## Preview Container Styling

```css
.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F5F5F5;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

#cardCanvas {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}
```

---

## Error Handling

### Template Load Failure
```javascript
async function initializeApp() {
  try {
    await loadTemplate();
  } catch (error) {
    showError('Failed to load card template. Please refresh the page.');
    console.error(error);
    return;
  }
  
  await loadFonts();
  renderCard();
}
```

### Render Error Recovery
```javascript
function renderCard() {
  try {
    ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
    // ... rendering code ...
  } catch (error) {
    console.error('Render error:', error);
    // Show fallback or error state
    ctx.fillStyle = '#FFCCCC';
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
    ctx.fillStyle = '#CC0000';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Preview error', CARD_WIDTH / 2, CARD_HEIGHT / 2);
  }
}
```

---

## Configuration Constants

All positioning and sizing should be centralized for easy adjustment:

```javascript
const CARD_CONFIG = {
  // Canvas dimensions
  width: 400,
  height: 560,
  
  // Image artwork area
  imageArea: {
    x: 25,
    y: 60,
    width: 350,
    height: 230
  },
  
  // Card name position
  namePosition: {
    x: 200,  // Center
    y: 50,
    maxWidth: 350
  },
  
  // Description position
  descPosition: {
    x: 30,
    y: 320,
    maxWidth: 340,
    lineHeight: 20,
    maxLines: 4
  }
};
```

---

## Browser Compatibility

The Canvas API is supported in all modern browsers:
- Chrome 4+
- Firefox 2+
- Safari 3.1+
- Edge 12+

No polyfills required for target browser support.

---

## Dependencies

- HTML5 Canvas API (native)
- Preloaded card template image
- Loaded custom fonts

---

*Feature Version: 1.0*


