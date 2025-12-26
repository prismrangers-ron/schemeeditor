# Tech Stack & Tools

## Overview

Scheme Card Editor is built as a lightweight, client-side only web application. This document outlines all technologies, tools, and platforms used in development and deployment.

---

## Core Technologies

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | - | Semantic markup, structure |
| **CSS3** | - | Styling, layout, animations |
| **TypeScript** | 5.x | Type-safe interactivity, canvas manipulation |
| **Canvas API** | - | Image composition, rendering |

### Code Standards

- **TypeScript** for all new files (no plain JS)
- **Functional components** if React is added in future
- **snake_case** for any database columns (if backend added)
- **Repository pattern** for data access (if backend added)
- **Service layers** for business logic (if backend added)

### No Backend Required (V1)

This project is entirely client-side:
- No server-side processing
- No database
- No API calls
- All computation happens in the browser

---

## Browser APIs Used

| API | Purpose |
|-----|---------|
| **Canvas 2D Context** | Drawing and compositing images |
| **FileReader** | Reading uploaded image files |
| **FontFace** | Loading custom fonts programmatically |
| **Drag and Drop** | File upload via drag and drop |
| **Blob/URL** | Creating downloadable files |

---

## Development Tools

### Code Editor

| Tool | Purpose |
|------|---------|
| **VS Code** or **Cursor** | Primary code editor |

**Recommended Extensions:**
- Live Server - Local development server
- Prettier - Code formatting
- ESLint - JavaScript linting
- Auto Rename Tag - HTML tag editing
- CSS Peek - CSS navigation

### Version Control

| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **GitHub** | Code hosting, collaboration |

### Local Development Server

| Option | Command | Purpose |
|--------|---------|---------|
| **Live Server** (VS Code) | Click "Go Live" | Auto-reload on save |
| **Python** | `python -m http.server 8000` | Simple HTTP server |
| **Node.js** | `npx serve` | Static file server |
| **Vite** (optional) | `npm create vite@latest` | Modern dev server with HMR |

---

## Build Tools (Optional)

For this simple project, no build tools are strictly required. However, these can enhance development:

### If Using Build Tools

| Tool | Purpose |
|------|---------|
| **Vite** | Fast dev server, production builds |
| **PostCSS** | CSS processing, autoprefixer |
| **Terser** | JavaScript minification |

### Vite Setup (Optional)

```bash
# Create new project with Vite
npm create vite@latest scheme-card-editor -- --template vanilla

# Install dependencies
cd scheme-card-editor
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Without Build Tools

Simply open `index.html` in a browser or use a local server. No compilation needed.

---

## Hosting Platforms

### Recommended: Static Hosting (Free Tier)

| Platform | Pros | Deployment |
|----------|------|------------|
| **GitHub Pages** | Free, integrates with Git | Push to `gh-pages` branch |
| **Netlify** | Free, drag-and-drop deploy | Connect repo or drop folder |
| **Vercel** | Free, instant deploys | Connect repo |
| **Cloudflare Pages** | Free, fast CDN | Connect repo |

### GitHub Pages Setup

```bash
# 1. Create repository on GitHub

# 2. Push code to main branch
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/scheme-card-editor.git
git push -u origin main

# 3. Go to Settings > Pages
# 4. Select "main" branch as source
# 5. Site available at: https://username.github.io/scheme-card-editor/
```

### Netlify Deployment

```bash
# Option 1: Drag and drop
# - Go to netlify.com
# - Drag your project folder to deploy area

# Option 2: CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel Deployment

```bash
# Install CLI
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

---

## Design Tools

### Image Assets

| Tool | Purpose |
|------|---------|
| **Figma** (Free) | UI design, prototyping |
| **Adobe Photoshop** | Image editing |
| **Adobe Illustrator** | Vector graphics |
| **GIMP** (Free) | Image editing alternative |
| **Canva** (Free) | Quick graphics |

### Font Tools

| Tool | Purpose |
|------|---------|
| **Google Fonts** | Web font hosting |
| **Font Squirrel** | Webfont generator |
| **Transfonter** | Font format conversion |

---

## Testing Tools

### Browser DevTools

| Browser | DevTools Shortcut |
|---------|-------------------|
| Chrome | F12 or Ctrl+Shift+I |
| Firefox | F12 or Ctrl+Shift+I |
| Safari | Cmd+Option+I |
| Edge | F12 or Ctrl+Shift+I |

### Cross-Browser Testing

| Tool | Purpose |
|------|---------|
| **BrowserStack** | Real device testing |
| **LambdaTest** | Cross-browser testing |
| **Chrome DevTools** | Device emulation |

### Performance Testing

| Tool | Purpose |
|------|---------|
| **Lighthouse** | Performance audit (built into Chrome) |
| **PageSpeed Insights** | Google's performance tool |
| **WebPageTest** | Detailed performance analysis |

---

## Code Quality Tools

### Formatting

```bash
# Install Prettier
npm install --save-dev prettier

# Create .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}

# Format files
npx prettier --write .
```

### Linting

```bash
# Install ESLint
npm install --save-dev eslint

# Initialize
npx eslint --init

# Run linter
npx eslint js/
```

---

## Image Optimization

### Tools for Optimizing Assets

| Tool | Purpose |
|------|---------|
| **TinyPNG** | PNG/JPEG compression |
| **Squoosh** | Google's image optimizer |
| **ImageOptim** (Mac) | Batch optimization |
| **SVGO** | SVG optimization |

### Command Line

```bash
# Using imagemin
npm install imagemin imagemin-pngquant

# Or use online tools for one-time optimization
```

---

## CDN Resources

### Fonts

```html
<!-- Google Fonts - Poppins -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### No Additional CDN Dependencies

This project intentionally avoids external JavaScript libraries to:
- Minimize load time
- Reduce dependencies
- Ensure offline capability after initial load

---

## Browser Support

### Target Browsers

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

### Feature Support Check

All required features have excellent browser support:
- Canvas 2D: 98%+ global support
- FileReader: 97%+ global support
- ES6: 95%+ global support

Use [caniuse.com](https://caniuse.com) to verify specific features.

---

## Development Workflow

### Recommended Workflow

```
1. Edit code in VS Code/Cursor
       ↓
2. Live Server auto-reloads browser
       ↓
3. Test in Chrome DevTools
       ↓
4. Commit changes with Git
       ↓
5. Push to GitHub
       ↓
6. Auto-deploy via Netlify/Vercel/GitHub Pages
```

### Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/upload-zone

# Make changes, then commit
git add .
git commit -m "Add drag and drop upload"

# Push and create PR
git push origin feature/upload-zone

# Merge to main for deployment
```

---

## Summary Table

| Category | Choice | Reason |
|----------|--------|--------|
| Languages | HTML, CSS, JS | Universal, no compilation |
| Build Tool | None (or Vite) | Simplicity |
| Hosting | GitHub Pages/Netlify | Free, easy |
| Editor | VS Code/Cursor | Best extensions |
| Version Control | Git + GitHub | Industry standard |
| Fonts | Google Fonts + Local | Reliability |

---

*Tech Stack Version: 1.0*

