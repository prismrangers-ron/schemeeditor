# Scheme Card Editor - Product Document

## Overview

**Product Name:** Scheme Card Editor  
**Type:** Single-Page Web Application  
**Purpose:** A custom card image generator that allows users to create personalized trading-style cards with custom images, names, and descriptions.

---

## Product Vision

Scheme Card Editor is a lightweight, user-friendly web tool that enables anyone to create professional-looking custom cards without design skills or software. Users can upload their own images, add custom text, and download high-quality card images instantly.

---

## Core Features

### 1. Image Upload
- Users can upload a custom image to be used as the card artwork
- Supported formats: JPG, PNG, WEBP
- Image will be cropped/fitted to the designated card image area
- Drag-and-drop support for easy uploading
- Click-to-upload alternative option

### 2. Text Customization
- **Card Name Field**
  - Custom font: Grandarena.otf
  - Character limit: TBD based on card design
  - Single line input

- **Card Description Field**
  - Custom font: Poppins Regular
  - Multi-line text area
  - Character limit: TBD based on card design

### 3. Live Preview
- Real-time card mockup preview
- Updates instantly as users type or upload images
- WYSIWYG (What You See Is What You Get) experience

### 4. Download Options
- **JPG Format** - Smaller file size, ideal for sharing
- **PNG Format** - Lossless quality, supports transparency
- High-resolution output suitable for printing

---

## Design Specifications

### Brand Colors

| Color Code | Usage |
|------------|-------|
| `#FFD753` | Main background color (Golden Yellow) |
| `#8F68FC` | Accent color - Purple |
| `#FF66CC` | Accent color - Pink |
| `#1ABF9E` | Accent color - Teal/Green |

### Typography

| Font | Usage |
|------|-------|
| **Grandarena.otf** | Card name/title |
| **Poppins Regular** | Card description, UI elements |

### Design Principles
- **Simple** - Minimal UI, focus on the card creation
- **Modern** - Clean lines, contemporary aesthetics
- **Professional** - Polished appearance, trustworthy feel

---

## User Interface Layout

### Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
│                   "Scheme Card Editor"                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────┐     ┌─────────────────────────────┐   │
│   │                 │     │                             │   │
│   │                 │     │  UPLOAD IMAGE AREA          │   │
│   │   LIVE CARD     │     │  [Drag & Drop or Click]     │   │
│   │   PREVIEW       │     │                             │   │
│   │                 │     ├─────────────────────────────┤   │
│   │                 │     │                             │   │
│   │                 │     │  CARD NAME INPUT            │   │
│   │                 │     │  [____________________]     │   │
│   │                 │     │                             │   │
│   │                 │     ├─────────────────────────────┤   │
│   │                 │     │                             │   │
│   │                 │     │  CARD DESCRIPTION           │   │
│   │                 │     │  [____________________]     │   │
│   │                 │     │  [____________________]     │   │
│   │                 │     │  [____________________]     │   │
│   │                 │     │                             │   │
│   └─────────────────┘     ├─────────────────────────────┤   │
│                           │                             │   │
│                           │  DOWNLOAD BUTTONS           │   │
│                           │  [Download JPG] [Download PNG]  │
│                           │                             │   │
│                           └─────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                        FOOTER                                │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Design
- Desktop: Side-by-side layout (preview left, controls right)
- Tablet: Stacked layout with preview on top
- Mobile: Single column, scrollable

---

## Technical Requirements

### Frontend Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern styling, Flexbox/Grid
- **TypeScript** - Type-safe interactivity (required for all new files)
- **HTML Canvas API** - Image composition and export

### Assets Required
1. **Card Template** - PNG format (provided by client)
2. **Grandarena.otf** - Custom font for card names (provided by client)
3. **Poppins Regular** - Font for descriptions (Google Fonts or local)

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Goals
- Page load: < 2 seconds
- Image processing: < 1 second
- No server-side processing required (client-side only)

---

## User Flow

```
1. User lands on page
        ↓
2. User sees empty card template preview
        ↓
3. User uploads custom image
        ↓
4. Image appears in card preview (live update)
        ↓
5. User enters card name
        ↓
6. Name appears on card preview (live update)
        ↓
7. User enters card description
        ↓
8. Description appears on card preview (live update)
        ↓
9. User clicks "Download JPG" or "Download PNG"
        ↓
10. Card image downloads to user's device
```

---

## Authentication

**No login required.**

- Fully anonymous usage
- No user accounts
- No data storage
- Privacy-friendly design

---

## Constraints & Limitations

- Single card template only
- No card template customization
- No cloud storage of created cards
- Client-side processing only
- Image size may be limited by browser memory

---

## Future Considerations (Out of Scope for V1)

- Multiple card templates
- Additional text fields (stats, numbers, etc.)
- Card border/frame color options
- Social sharing integration
- Gallery of created cards
- Batch card generation

---

## Success Metrics

- Page fully functional across all major browsers
- Card generation works offline after initial load
- Download produces high-quality images
- Intuitive enough to use without instructions

---

## File Structure

```
/scheme-card-editor
├── index.html
├── /css
│   └── styles.css
├── /js
│   └── app.js
├── /assets
│   ├── /fonts
│   │   ├── Grandarena.otf
│   │   └── Poppins-Regular.ttf
│   └── /images
│       └── card-template.png
└── /docs
    └── PRODUCT_DOCUMENT.md
```

---

## Deliverables Checklist

- [ ] Single HTML page
- [ ] CSS stylesheet
- [ ] JavaScript functionality
- [ ] Font files integrated
- [ ] Card template integrated
- [ ] Image upload functionality
- [ ] Text input fields
- [ ] Live preview
- [ ] JPG download
- [ ] PNG download
- [ ] Responsive design
- [ ] Cross-browser tested

---

## Dependencies from Client

1. **Card Template (PNG)** - Required before development
2. **Grandarena.otf font file** - Required before development
3. **Brand guidelines** (if any additional details)
4. **Text positioning specifications** - Exact placement of name/description on template

---

*Document Version: 1.0*  
*Created: December 26, 2025*

