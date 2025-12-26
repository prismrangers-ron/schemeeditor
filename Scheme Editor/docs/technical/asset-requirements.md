# Asset Requirements

## Overview

This document specifies all external assets required to build Scheme Card Editor. These assets must be provided before development can proceed.

---

## Required Assets

### 1. Card Template Image

| Property | Requirement |
|----------|-------------|
| **Format** | PNG (with transparency support) |
| **Dimensions** | Recommended: 400x560px or higher |
| **Transparency** | Required for image artwork area |
| **File Name** | `card-template.png` |
| **Location** | `/assets/images/` |

#### Template Specifications

The card template should include:
- **Frame/Border**: The decorative card frame
- **Transparent Area**: Where user image will appear (background layer)
- **Text Zones**: Areas where name and description will render

```
┌────────────────────────────────┐
│         Card Frame             │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │   TRANSPARENT AREA       │  │
│  │   (User Image Here)      │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  ═══════════════════════════   │ ← Name Zone
│                                │
│  ────────────────────────────  │
│  Description text area here    │ ← Description Zone
│  with multiple lines...        │
│  ────────────────────────────  │
│                                │
└────────────────────────────────┘
```

#### Template Positioning Data Needed

Please provide the following measurements (in pixels, from top-left origin):

| Element | X | Y | Width | Height |
|---------|---|---|-------|--------|
| Image Area | ? | ? | ? | ? |
| Card Name | ? | ? | max-width: ? | - |
| Description | ? | ? | max-width: ? | max-lines: ? |

**Example:**
```javascript
const CARD_CONFIG = {
  // Template dimensions
  width: 400,
  height: 560,
  
  // Image artwork area
  imageArea: {
    x: 25,        // Left edge
    y: 60,        // Top edge  
    width: 350,   // Area width
    height: 230   // Area height
  },
  
  // Card name position
  namePosition: {
    x: 200,       // Center X
    y: 50,        // Y from top
    maxWidth: 350
  },
  
  // Description position
  descPosition: {
    x: 30,        // Left padding
    y: 320,       // Y from top
    maxWidth: 340,
    lineHeight: 20,
    maxLines: 4
  }
};
```

---

### 2. Grandarena Font

| Property | Requirement |
|----------|-------------|
| **Format** | OTF (OpenType Font) |
| **File Name** | `Grandarena.otf` |
| **Location** | `/assets/fonts/` |
| **Usage** | Card name/title text |
| **License** | Ensure web usage is permitted |

#### Font Loading

```css
@font-face {
  font-family: 'Grandarena';
  src: url('../assets/fonts/Grandarena.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

---

### 3. Poppins Font

| Property | Requirement |
|----------|-------------|
| **Source** | Google Fonts (recommended) or local file |
| **Weights Needed** | 400 (Regular), 500, 600, 700 |
| **Usage** | Card description, UI elements |
| **License** | Open Font License (free) |

#### Option A: Google Fonts (Recommended)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

#### Option B: Local Files

Download from Google Fonts and place in `/assets/fonts/`:
- `Poppins-Regular.ttf`
- `Poppins-Medium.ttf`
- `Poppins-SemiBold.ttf`
- `Poppins-Bold.ttf`

```css
@font-face {
  font-family: 'Poppins';
  src: url('../assets/fonts/Poppins-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

---

## Optional Assets

### Placeholder Image

A default placeholder shown before user uploads an image.

| Property | Requirement |
|----------|-------------|
| **Format** | PNG or SVG |
| **Dimensions** | Match image area |
| **Content** | Generic placeholder (optional pattern or icon) |
| **File Name** | `placeholder.png` |
| **Location** | `/assets/images/` |

### Favicon

| Property | Requirement |
|----------|-------------|
| **Format** | ICO, PNG, or SVG |
| **Sizes** | 16x16, 32x32, 180x180 (Apple touch) |
| **File Names** | `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` |
| **Location** | Root directory or `/assets/images/` |

### Open Graph Image

For social media sharing previews:

| Property | Requirement |
|----------|-------------|
| **Format** | PNG or JPG |
| **Dimensions** | 1200x630px |
| **Content** | Brand image with logo/name |
| **File Name** | `og-image.png` |
| **Location** | `/assets/images/` |

---

## File Structure

```
/assets
├── /fonts
│   ├── Grandarena.otf          ← REQUIRED (client provided)
│   ├── Poppins-Regular.ttf     ← Optional (if not using Google Fonts)
│   ├── Poppins-Medium.ttf
│   ├── Poppins-SemiBold.ttf
│   └── Poppins-Bold.ttf
├── /images
│   ├── card-template.png       ← REQUIRED (client provided)
│   ├── placeholder.png         ← Optional
│   ├── og-image.png            ← Optional
│   └── favicon.ico             ← Optional
```

---

## Asset Checklist

### Required (Must Have)

- [ ] **Card Template PNG** - The card frame/border design
- [ ] **Grandarena.otf** - Custom font for card names
- [ ] **Template Position Data** - X, Y, Width, Height for each element

### Recommended (Should Have)

- [ ] Poppins font files (or confirm Google Fonts is OK)
- [ ] Favicon
- [ ] Placeholder image

### Nice to Have

- [ ] Open Graph image for social sharing
- [ ] Multiple favicon sizes
- [ ] High-resolution template (2x) for retina displays

---

## Asset Optimization Guidelines

### Images

| Asset | Max File Size | Notes |
|-------|---------------|-------|
| Card Template | < 500KB | Optimize with TinyPNG |
| Placeholder | < 50KB | Keep simple |
| Favicon | < 10KB | Standard |
| OG Image | < 200KB | For social sharing |

### Fonts

| Asset | Max File Size | Notes |
|-------|---------------|-------|
| Grandarena.otf | < 500KB | OTF format OK |
| Poppins (each) | < 100KB | TTF or WOFF2 |

---

## Font Licensing

### Verify License For:

1. **Grandarena.otf**
   - Can it be used on the web?
   - Does it allow embedding in @font-face?
   - Are there attribution requirements?

2. **Poppins**
   - Open Font License (OFL)
   - Free for commercial use
   - No attribution required

---

## How to Provide Assets

### Option 1: Direct File Sharing
- Share via Google Drive, Dropbox, or WeTransfer
- Include all required files in a ZIP

### Option 2: Add to Repository
- Place files in the correct `/assets` folders
- Commit and push to the repo

### Required Information

When providing the card template, please include:
1. The PNG file
2. A screenshot or mockup showing:
   - Where the image area is
   - Where the name should appear
   - Where the description should appear
3. Exact pixel measurements (if available)

---

## Questions for Client

Before proceeding, please confirm:

1. **Card Template Dimensions**: What are the exact pixel dimensions?

2. **Image Area Bounds**: Where exactly should the user's image appear?
   - X position from left?
   - Y position from top?
   - Width and height of the area?

3. **Text Positions**: Where should text appear?
   - Card name: Centered? What Y position?
   - Description: What X, Y position? How many lines max?

4. **Text Colors**: What color should the text be on the card?
   - Card name color: #______
   - Description color: #______

5. **Font Sizes**: What size should the fonts be?
   - Card name: ____px
   - Description: ____px

6. **Grandarena License**: Is this font licensed for web use?

---

*Asset Requirements Version: 1.0*


