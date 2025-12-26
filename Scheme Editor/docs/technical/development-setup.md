# Development Setup Guide

## Overview

This guide walks through setting up a local development environment for Scheme Card Editor. The project is simple and requires minimal setup.

---

## Prerequisites

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| **Code Editor** | Any | [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.sh/) |
| **Web Browser** | Modern | Chrome, Firefox, Safari, or Edge |
| **Git** | 2.x+ | [git-scm.com](https://git-scm.com/) |

### Optional Software

| Software | Purpose | Download |
|----------|---------|----------|
| **Node.js** | For npm packages, local server | [nodejs.org](https://nodejs.org/) |
| **Python** | Alternative local server | [python.org](https://python.org/) |

---

## Quick Start

### Step 1: Clone or Create Project

```bash
# Option A: Clone existing repo
git clone https://github.com/username/scheme-card-editor.git
cd scheme-card-editor

# Option B: Create new project
mkdir scheme-card-editor
cd scheme-card-editor
git init
```

### Step 2: Create Project Structure

```bash
# Create directories
mkdir -p assets/fonts assets/images css src docs

# Create main files
touch index.html css/styles.css src/app.ts src/types.ts
```

### Step 3: Add Assets

Copy required assets to their locations:
- `Grandarena.otf` → `assets/fonts/`
- `card-template.png` → `assets/images/`

### Step 4: Start Local Server

```bash
# Option A: VS Code Live Server
# Install "Live Server" extension, then click "Go Live"

# Option B: Python (if installed)
python -m http.server 8000
# Open: http://localhost:8000

# Option C: Node.js (if installed)
npx serve
# Open: http://localhost:3000

# Option D: PHP (if installed)
php -S localhost:8000
```

### Step 5: Open in Browser

Navigate to `http://localhost:8000` (or the port shown by your server).

---

## Project Structure

```
scheme-card-editor/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles
├── src/
│   ├── app.ts              # Main TypeScript entry
│   ├── types.ts            # Type definitions
│   └── utils.ts            # Utility functions
├── dist/                   # Compiled JS output
├── assets/
│   ├── fonts/
│   │   ├── Grandarena.otf  # Custom font (required)
│   │   └── Poppins-*.ttf   # Optional local fonts
│   └── images/
│       ├── card-template.png  # Card template (required)
│       └── placeholder.png    # Optional placeholder
├── docs/                   # Documentation
│   ├── README.md
│   ├── features/
│   ├── design/
│   └── technical/
├── .gitignore
└── README.md               # Project readme
```

---

## VS Code Setup

### Recommended Extensions

Install these extensions for the best development experience:

1. **Live Server** - Local development server with auto-reload
   - ID: `ritwickdey.LiveServer`
   
2. **Prettier** - Code formatting
   - ID: `esbenp.prettier-vscode`

3. **ESLint** - JavaScript linting
   - ID: `dbaeumer.vscode-eslint`

4. **Auto Rename Tag** - Rename paired HTML tags
   - ID: `formulahendry.auto-rename-tag`

5. **CSS Peek** - Navigate to CSS definitions
   - ID: `pranaygp.vscode-css-peek`

### Install via Command Line

```bash
code --install-extension ritwickdey.LiveServer
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension formulahendry.auto-rename-tag
code --install-extension pranaygp.vscode-css-peek
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "liveServer.settings.donotShowInfoMsg": true,
  "liveServer.settings.port": 5500
}
```

---

## Git Setup

### Create .gitignore

```bash
# Create .gitignore file
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build output
dist/
build/

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
EOF
```

### Initial Commit

```bash
git add .
git commit -m "Initial project setup"
```

---

## Starter HTML Template

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scheme Card Editor</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <h1>Scheme Card Editor</h1>
      <p class="tagline">Create your custom card in seconds</p>
    </header>

    <!-- Main Content -->
    <main class="main-layout">
      <!-- Preview Section -->
      <section class="preview-section">
        <div class="preview-container">
          <canvas id="cardCanvas" width="400" height="560"></canvas>
        </div>
      </section>

      <!-- Controls Section -->
      <section class="controls-section">
        <!-- Upload Zone -->
        <div class="card">
          <h3>Upload Image</h3>
          <div class="upload-zone" id="uploadZone">
            <input type="file" id="imageInput" accept="image/jpeg,image/png,image/webp" hidden>
            <div class="upload-content">
              <span class="upload-icon">🖼️</span>
              <p>Drag & drop your image here</p>
              <p class="upload-hint">or click to browse</p>
            </div>
          </div>
        </div>

        <!-- Text Inputs -->
        <div class="card">
          <div class="input-group">
            <label for="cardName">Card Name</label>
            <input type="text" id="cardName" maxlength="30" placeholder="Enter card name...">
            <span class="char-counter"><span id="nameCount">0</span>/30</span>
          </div>

          <div class="input-group">
            <label for="cardDescription">Description</label>
            <textarea id="cardDescription" maxlength="150" rows="4" placeholder="Enter card description..."></textarea>
            <span class="char-counter"><span id="descCount">0</span>/150</span>
          </div>
        </div>

        <!-- Download Buttons -->
        <div class="card download-section">
          <h3>Download Your Card</h3>
          <div class="download-buttons">
            <button id="downloadJpg" class="btn btn-primary">
              📥 Download JPG
            </button>
            <button id="downloadPng" class="btn btn-secondary">
              📥 Download PNG
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>Made with ❤️ by Scheme Card Editor</p>
    </footer>
  </div>

  <!-- Scripts -->
  <script src="js/app.js"></script>
</body>
</html>
```

---

## Starter CSS

Create `css/styles.css`:

```css
/* CSS Variables */
:root {
  --color-primary: #FFD753;
  --color-accent-purple: #8F68FC;
  --color-accent-pink: #FF66CC;
  --color-accent-teal: #1ABF9E;
  --color-white: #FFFFFF;
  --color-light-gray: #F5F5F5;
  --color-dark-gray: #333333;
  
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  
  --radius-md: 8px;
  --radius-lg: 12px;
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Base */
body {
  font-family: 'Poppins', sans-serif;
  background: var(--color-primary);
  color: var(--color-dark-gray);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4);
}

/* Add more styles as needed... */
```

---

## TypeScript Setup

### Install TypeScript

```bash
npm init -y
npm install typescript --save-dev
npx tsc --init
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

---

## Starter TypeScript

Create `src/types.ts`:

```typescript
// Type definitions for Scheme Card Editor

export interface CardConfig {
  width: number;
  height: number;
  imageArea: ImageArea;
  namePosition: TextPosition;
  descPosition: TextPosition;
}

export interface ImageArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TextPosition {
  x: number;
  y: number;
  maxWidth: number;
  lineHeight?: number;
  maxLines?: number;
}

export interface AppState {
  cardTemplate: HTMLImageElement | null;
  userImage: HTMLImageElement | null;
  cardName: string;
  cardDescription: string;
}

export type ExportFormat = 'jpg' | 'png';
```

Create `src/app.ts`:

```typescript
// ============================================
// Scheme Card Editor - Main Application
// ============================================

import type { CardConfig, AppState, ExportFormat } from './types';

// Configuration
const CARD_CONFIG: CardConfig = {
  width: 400,
  height: 560,
  imageArea: { x: 25, y: 60, width: 350, height: 230 },
  namePosition: { x: 200, y: 50, maxWidth: 350 },
  descPosition: { x: 30, y: 320, maxWidth: 340, lineHeight: 20, maxLines: 4 },
};

// State
const state: AppState = {
  cardTemplate: null,
  userImage: null,
  cardName: '',
  cardDescription: '',
};

// DOM Elements
const canvas = document.getElementById('cardCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const uploadZone = document.getElementById('uploadZone')!;
const imageInput = document.getElementById('imageInput') as HTMLInputElement;
const cardNameInput = document.getElementById('cardName') as HTMLInputElement;
const cardDescInput = document.getElementById('cardDescription') as HTMLTextAreaElement;

// Initialize
async function init(): Promise<void> {
  await loadTemplate();
  await loadFonts();
  setupEventListeners();
  renderCard();
}

// Load card template
async function loadTemplate(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      state.cardTemplate = img;
      resolve(img);
    };
    img.onerror = reject;
    img.src = 'assets/images/card-template.png';
  });
}

// Load fonts
async function loadFonts(): Promise<void> {
  try {
    const grandarena = new FontFace('Grandarena', 'url(assets/fonts/Grandarena.otf)');
    await grandarena.load();
    document.fonts.add(grandarena);
  } catch (e) {
    console.warn('Custom font not loaded:', e);
  }
}

// Setup event listeners
function setupEventListeners(): void {
  uploadZone.addEventListener('click', () => imageInput.click());
  imageInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) handleFile(target.files[0]);
  });
  
  uploadZone.addEventListener('dragover', handleDragOver);
  uploadZone.addEventListener('dragleave', handleDragLeave);
  uploadZone.addEventListener('drop', handleDrop);
  
  cardNameInput.addEventListener('input', handleNameInput);
  cardDescInput.addEventListener('input', handleDescInput);
  
  document.getElementById('downloadJpg')!.addEventListener('click', () => download('jpg'));
  document.getElementById('downloadPng')!.addEventListener('click', () => download('png'));
}

// Handle file upload
function handleFile(file: File): void {
  if (!file.type.startsWith('image/')) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      state.userImage = img;
      renderCard();
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

// Drag and drop handlers
function handleDragOver(e: DragEvent): void {
  e.preventDefault();
  uploadZone.classList.add('dragover');
}

function handleDragLeave(): void {
  uploadZone.classList.remove('dragover');
}

function handleDrop(e: DragEvent): void {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  if (e.dataTransfer?.files[0]) handleFile(e.dataTransfer.files[0]);
}

// Text input handlers
function handleNameInput(e: Event): void {
  const target = e.target as HTMLInputElement;
  state.cardName = target.value;
  document.getElementById('nameCount')!.textContent = state.cardName.length.toString();
  renderCard();
}

function handleDescInput(e: Event): void {
  const target = e.target as HTMLTextAreaElement;
  state.cardDescription = target.value;
  document.getElementById('descCount')!.textContent = state.cardDescription.length.toString();
  renderCard();
}

// Render card to canvas
function renderCard(): void {
  ctx.clearRect(0, 0, CARD_CONFIG.width, CARD_CONFIG.height);
  
  if (state.userImage) {
    // TODO: Draw with proper clipping
  }
  
  if (state.cardTemplate) {
    ctx.drawImage(state.cardTemplate, 0, 0, CARD_CONFIG.width, CARD_CONFIG.height);
  }
  
  // TODO: Implement text drawing
}

// Download functions
function download(format: ExportFormat): void {
  const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const quality = format === 'jpg' ? 0.92 : undefined;
  const dataURL = canvas.toDataURL(mimeType, quality);
  
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `scheme-card-${Date.now()}.${format}`;
  link.click();
}

// Start app
document.addEventListener('DOMContentLoaded', init);
```

### Build & Run

```bash
# Compile TypeScript
npx tsc

# Or watch mode
npx tsc --watch
```

---

## Testing Checklist

### Manual Testing

- [ ] Page loads without errors
- [ ] Card template displays
- [ ] Image upload works (click)
- [ ] Image upload works (drag & drop)
- [ ] Card name input updates preview
- [ ] Description input updates preview
- [ ] Character counters work
- [ ] Download JPG works
- [ ] Download PNG works
- [ ] Responsive on mobile
- [ ] Responsive on tablet

### Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### DevTools Checks

1. Open DevTools (F12)
2. Check Console for errors
3. Check Network for failed requests
4. Test responsive with device toolbar

---

## Common Issues

### Fonts Not Loading

**Symptom:** Text appears in default font
**Solution:** 
- Check font file path is correct
- Ensure font file is in `/assets/fonts/`
- Check browser console for 404 errors

### Canvas Not Rendering

**Symptom:** Blank canvas or no preview
**Solution:**
- Check if template image loads (Network tab)
- Verify image path is correct
- Check console for JavaScript errors

### CORS Errors

**Symptom:** "Tainted canvas" error
**Solution:**
- Use a local server (not file://)
- All assets must be from same origin

### Download Not Working

**Symptom:** Download button does nothing
**Solution:**
- Check console for errors
- Verify canvas has content
- Try different browser

---

## Deployment Checklist

Before deploying to production:

- [ ] All features working locally
- [ ] No console errors
- [ ] Assets optimized (images compressed)
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] All paths are relative (no absolute local paths)
- [ ] README.md updated

---

## Next Steps

1. **Get Assets**: Obtain card template and font files
2. **Configure Positions**: Update `CARD_CONFIG` with actual template measurements
3. **Style UI**: Complete CSS styling per design specs
4. **Implement Features**: Complete all JavaScript functionality
5. **Test Thoroughly**: Cross-browser and device testing
6. **Deploy**: Push to hosting platform

---

*Development Setup Version: 1.0*

