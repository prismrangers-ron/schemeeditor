# Feature: Text Customization

## Overview

Text customization allows users to personalize their card with a custom name and description. Each text field uses a specific font to match the card's design aesthetic.

---

## User Stories

- As a user, I want to enter a custom name for my card
- As a user, I want to write a description for my card
- As a user, I want to see my text appear on the card preview as I type
- As a user, I want the text to use the correct fonts as designed

---

## Text Fields

### Card Name
| Property | Value |
|----------|-------|
| Font | Grandarena.otf |
| Font Size | TBD (based on template) |
| Max Characters | 30 (suggested) |
| Input Type | Single line text |
| Placeholder | "Enter card name..." |

### Card Description
| Property | Value |
|----------|-------|
| Font | Poppins Regular |
| Font Size | TBD (based on template) |
| Max Characters | 150 (suggested) |
| Input Type | Multi-line textarea |
| Max Lines | 4-5 lines visible |
| Placeholder | "Enter card description..." |

---

## Functional Requirements

### FR-1: Card Name Input
- Single line text input field
- Real-time preview update on input
- Character counter showing remaining characters
- Prevent line breaks (Enter key ignored or submits)

### FR-2: Card Description Input
- Multi-line textarea
- Real-time preview update on input
- Character counter showing remaining characters
- Soft word wrap within text area
- Text wrapping on canvas preview

### FR-3: Font Loading
- Custom fonts must load before first render
- Fallback fonts while loading
- Font loading status indicator (optional)

### FR-4: Text Rendering
- Render text at exact positions on canvas
- Handle text overflow gracefully
- Maintain consistent styling across browsers

---

## Technical Implementation

### HTML Structure
```html
<div class="input-group">
  <label for="cardName">Card Name</label>
  <input 
    type="text" 
    id="cardName" 
    maxlength="30" 
    placeholder="Enter card name..."
  >
  <span class="char-counter"><span id="nameCount">0</span>/30</span>
</div>

<div class="input-group">
  <label for="cardDescription">Description</label>
  <textarea 
    id="cardDescription" 
    maxlength="150" 
    rows="4"
    placeholder="Enter card description..."
  ></textarea>
  <span class="char-counter"><span id="descCount">0</span>/150</span>
</div>
```

### CSS Font Loading
```css
@font-face {
  font-family: 'Grandarena';
  src: url('../assets/fonts/Grandarena.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Poppins';
  src: url('../assets/fonts/Poppins-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### JavaScript Font Loading
```javascript
// Ensure fonts are loaded before rendering
async function loadFonts() {
  const grandarena = new FontFace('Grandarena', 'url(assets/fonts/Grandarena.otf)');
  const poppins = new FontFace('Poppins', 'url(assets/fonts/Poppins-Regular.ttf)');
  
  try {
    const loadedFonts = await Promise.all([grandarena.load(), poppins.load()]);
    loadedFonts.forEach(font => document.fonts.add(font));
    console.log('Fonts loaded successfully');
    return true;
  } catch (error) {
    console.error('Font loading failed:', error);
    return false;
  }
}

// Wait for fonts before initial render
document.fonts.ready.then(() => {
  renderCard();
});
```

### Real-Time Input Handling
```javascript
const cardNameInput = document.getElementById('cardName');
const cardDescInput = document.getElementById('cardDescription');
const nameCounter = document.getElementById('nameCount');
const descCounter = document.getElementById('descCount');

// Card name input
cardNameInput.addEventListener('input', (e) => {
  cardName = e.target.value;
  nameCounter.textContent = cardName.length;
  renderCard();
});

// Card description input
cardDescInput.addEventListener('input', (e) => {
  cardDescription = e.target.value;
  descCounter.textContent = cardDescription.length;
  renderCard();
});
```

---

## Canvas Text Rendering

### Drawing Card Name
```javascript
function drawCardName(ctx, text, x, y, maxWidth) {
  ctx.font = '32px Grandarena';
  ctx.fillStyle = '#FFFFFF'; // Adjust based on template
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Truncate if too long
  let displayText = text;
  while (ctx.measureText(displayText).width > maxWidth && displayText.length > 0) {
    displayText = displayText.slice(0, -1);
  }
  if (displayText !== text) {
    displayText = displayText.slice(0, -3) + '...';
  }
  
  ctx.fillText(displayText, x, y);
}
```

### Drawing Card Description (Multi-line)
```javascript
function drawCardDescription(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  ctx.font = '14px Poppins';
  ctx.fillStyle = '#333333'; // Adjust based on template
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  // Word wrap
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // Limit lines and add ellipsis if needed
  const displayLines = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    const lastLine = displayLines[maxLines - 1];
    displayLines[maxLines - 1] = lastLine.slice(0, -3) + '...';
  }
  
  // Draw each line
  displayLines.forEach((line, index) => {
    ctx.fillText(line, x, y + (index * lineHeight));
  });
}
```

---

## Text Positioning

Text positions will be determined by the card template. Define these as configurable constants:

```javascript
// Text position configuration (adjust based on template)
const TEXT_CONFIG = {
  name: {
    x: 200,        // Center X position
    y: 50,         // Y position from top
    maxWidth: 350, // Maximum text width
    fontSize: 32,
    fontFamily: 'Grandarena',
    color: '#FFFFFF'
  },
  description: {
    x: 30,         // Left padding
    y: 320,        // Y position from top
    maxWidth: 340, // Maximum text width
    lineHeight: 20,
    maxLines: 4,
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#333333'
  }
};
```

---

## Input Validation

| Field | Validation | Error Message |
|-------|------------|---------------|
| Card Name | Max 30 chars | "Name is too long" |
| Card Name | No special HTML | Sanitize input |
| Description | Max 150 chars | "Description is too long" |
| Description | No special HTML | Sanitize input |

### Input Sanitization
```javascript
function sanitizeText(text) {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

---

## UI States

### Default State
- Empty input with placeholder text
- Character counter at 0/max

### Active/Focus State
- Border highlight with accent color (#8F68FC)
- Placeholder hidden
- Cursor visible

### Filled State
- User text displayed
- Character counter updates
- Preview reflects text

### Near Limit State
- Character counter turns warning color (#FF66CC) at 90%
- Visual indicator of approaching limit

### At Limit State
- Character counter turns error color
- Input prevents additional characters

---

## Accessibility

- Labels associated with inputs via `for` attribute
- Character counters have `aria-live="polite"` for screen readers
- Clear focus indicators
- Sufficient color contrast

```html
<label for="cardName" id="nameLabel">Card Name</label>
<input 
  type="text" 
  id="cardName"
  aria-labelledby="nameLabel"
  aria-describedby="nameCounter"
>
<span id="nameCounter" aria-live="polite" class="char-counter">
  <span id="nameCount">0</span> of 30 characters
</span>
```

---

## Dependencies

- **Grandarena.otf** - Custom font file (provided by client)
- **Poppins Regular** - Google Fonts or local file
- **FontFace API** - For JavaScript font loading

---

*Feature Version: 1.0*


