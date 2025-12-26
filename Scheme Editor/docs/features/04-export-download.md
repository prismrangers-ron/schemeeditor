# Feature: Export & Download

## Overview

The export feature allows users to download their customized card as a high-quality image file. Two formats are supported: JPG for smaller file sizes and PNG for lossless quality.

---

## User Stories

- As a user, I want to download my card as a JPG file
- As a user, I want to download my card as a PNG file
- As a user, I want the downloaded image to match the preview exactly
- As a user, I want to easily identify my downloaded file

---

## Functional Requirements

### FR-1: JPG Export
- Convert canvas to JPEG format
- Configurable quality setting (default: 0.92)
- White background for transparency areas
- Smaller file size for sharing

### FR-2: PNG Export
- Convert canvas to PNG format
- Lossless quality preservation
- Transparency support (if template uses it)
- Larger file size but pixel-perfect

### FR-3: File Download
- Automatic download trigger (no popup)
- Meaningful filename generation
- Works across all modern browsers

### FR-4: Download Buttons
- Clear, labeled buttons for each format
- Visual feedback on click
- Disabled state when card is empty (optional)

---

## Technical Implementation

### Download Buttons HTML
```html
<div class="download-section">
  <h3>Download Your Card</h3>
  <div class="download-buttons">
    <button id="downloadJpg" class="btn btn-download">
      <span class="btn-icon">📥</span>
      Download JPG
    </button>
    <button id="downloadPng" class="btn btn-download btn-secondary">
      <span class="btn-icon">📥</span>
      Download PNG
    </button>
  </div>
</div>
```

### Core Download Functions

```javascript
// Download as JPG
function downloadAsJPG() {
  const canvas = document.getElementById('cardCanvas');
  
  // For JPG, we need to handle transparency by adding white background
  const exportCanvas = createExportCanvas(canvas, true);
  
  // Convert to JPG data URL
  const dataURL = exportCanvas.toDataURL('image/jpeg', 0.92);
  
  // Trigger download
  downloadFile(dataURL, generateFilename('jpg'));
}

// Download as PNG
function downloadAsPNG() {
  const canvas = document.getElementById('cardCanvas');
  
  // PNG preserves transparency
  const dataURL = canvas.toDataURL('image/png');
  
  // Trigger download
  downloadFile(dataURL, generateFilename('png'));
}

// Event listeners
document.getElementById('downloadJpg').addEventListener('click', downloadAsJPG);
document.getElementById('downloadPng').addEventListener('click', downloadAsPNG);
```

### Export Canvas Creation (For JPG)
```javascript
function createExportCanvas(sourceCanvas, addWhiteBackground = false) {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = sourceCanvas.width;
  exportCanvas.height = sourceCanvas.height;
  const exportCtx = exportCanvas.getContext('2d');
  
  if (addWhiteBackground) {
    // Fill with white background for JPG (no transparency support)
    exportCtx.fillStyle = '#FFFFFF';
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  }
  
  // Draw the source canvas content
  exportCtx.drawImage(sourceCanvas, 0, 0);
  
  return exportCanvas;
}
```

### File Download Trigger
```javascript
function downloadFile(dataURL, filename) {
  // Create temporary link element
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

### Filename Generation
```javascript
function generateFilename(extension) {
  const cardName = document.getElementById('cardName').value.trim();
  const timestamp = Date.now();
  
  // Use card name if available, otherwise generic name
  let baseName = 'scheme-card';
  if (cardName) {
    // Sanitize card name for filename
    baseName = cardName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')  // Replace special chars with hyphen
      .replace(/-+/g, '-')          // Collapse multiple hyphens
      .replace(/^-|-$/g, '')        // Remove leading/trailing hyphens
      .substring(0, 30);            // Limit length
  }
  
  return `${baseName}-${timestamp}.${extension}`;
}
```

---

## High-Resolution Export

For print-quality exports, support higher resolution:

```javascript
const EXPORT_SCALE = 2; // 2x resolution for high quality

function downloadHighRes(format) {
  const sourceCanvas = document.getElementById('cardCanvas');
  
  // Create high-res canvas
  const highResCanvas = document.createElement('canvas');
  highResCanvas.width = CARD_WIDTH * EXPORT_SCALE;
  highResCanvas.height = CARD_HEIGHT * EXPORT_SCALE;
  const ctx = highResCanvas.getContext('2d');
  
  // Scale up
  ctx.scale(EXPORT_SCALE, EXPORT_SCALE);
  
  // Re-render at high resolution
  renderCardToContext(ctx);
  
  // Export
  const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const quality = format === 'jpg' ? 0.92 : undefined;
  const dataURL = highResCanvas.toDataURL(mimeType, quality);
  
  downloadFile(dataURL, generateFilename(format));
}
```

---

## Export Quality Settings

### JPG Quality Levels
| Quality | Value | Use Case |
|---------|-------|----------|
| High | 0.92 | Default - good balance |
| Maximum | 1.0 | Best quality, larger file |
| Medium | 0.8 | Smaller file, slight artifacts |
| Low | 0.6 | Smallest file, visible artifacts |

```javascript
const JPG_QUALITY = 0.92; // Configurable
```

### File Size Estimates
| Format | Resolution | Approximate Size |
|--------|------------|------------------|
| JPG (0.92) | 400x560 | 50-100 KB |
| PNG | 400x560 | 200-500 KB |
| JPG (0.92) | 800x1120 (2x) | 150-300 KB |
| PNG | 800x1120 (2x) | 500KB - 1MB |

---

## Button States

### Default State
```css
.btn-download {
  background: linear-gradient(135deg, #8F68FC, #FF66CC);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
```

### Hover State
```css
.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(143, 104, 252, 0.4);
}
```

### Active/Click State
```css
.btn-download:active {
  transform: translateY(0);
}
```

### Disabled State (Optional)
```css
.btn-download:disabled {
  background: #CCCCCC;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

---

## Download Feedback

### Visual Feedback on Download
```javascript
function downloadWithFeedback(format) {
  const button = document.getElementById(`download${format.charAt(0).toUpperCase() + format.slice(1)}`);
  
  // Add loading state
  button.classList.add('downloading');
  button.disabled = true;
  const originalText = button.innerHTML;
  button.innerHTML = '<span class="btn-icon">⏳</span> Preparing...';
  
  // Perform download
  setTimeout(() => {
    if (format === 'jpg') {
      downloadAsJPG();
    } else {
      downloadAsPNG();
    }
    
    // Show success state
    button.innerHTML = '<span class="btn-icon">✅</span> Downloaded!';
    
    // Reset after delay
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('downloading');
      button.disabled = false;
    }, 2000);
  }, 100);
}
```

---

## Browser Compatibility

### Canvas toDataURL Support
Supported in all modern browsers:
- Chrome 4+
- Firefox 2+
- Safari 4+
- Edge 12+

### Download Attribute Support
The `download` attribute for `<a>` tags:
- Chrome 14+
- Firefox 20+
- Safari 10.1+
- Edge 13+

### Fallback for Older Browsers
```javascript
function downloadFile(dataURL, filename) {
  const link = document.createElement('a');
  
  if ('download' in link) {
    // Modern browsers
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Fallback: Open in new tab
    window.open(dataURL, '_blank');
  }
}
```

---

## Mobile Considerations

### iOS Safari
- Long-press on image may be needed
- Consider adding "Tap and hold to save" hint
- PNG format recommended for iOS

### Android Chrome
- Standard download works
- May prompt for download location

```javascript
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function showMobileHint() {
  if (isMobileDevice()) {
    // Show additional instructions for mobile users
    showToast('Tip: If download doesn\'t start, tap and hold the preview image to save.');
  }
}
```

---

## Error Handling

### Export Errors
```javascript
function downloadAsJPG() {
  try {
    const canvas = document.getElementById('cardCanvas');
    const dataURL = canvas.toDataURL('image/jpeg', 0.92);
    downloadFile(dataURL, generateFilename('jpg'));
  } catch (error) {
    console.error('Export failed:', error);
    showError('Failed to export image. Please try again.');
  }
}
```

### Security Restrictions
Canvas may be "tainted" if images are loaded from external domains:

```javascript
// When loading images, enable CORS if needed
const img = new Image();
img.crossOrigin = 'anonymous'; // Enable CORS
img.src = imageUrl;
```

---

## Accessibility

```html
<button 
  id="downloadJpg" 
  class="btn btn-download"
  aria-label="Download card as JPG image file"
>
  <span class="btn-icon" aria-hidden="true">📥</span>
  Download JPG
</button>

<button 
  id="downloadPng" 
  class="btn btn-download btn-secondary"
  aria-label="Download card as PNG image file"
>
  <span class="btn-icon" aria-hidden="true">📥</span>
  Download PNG
</button>
```

---

## Dependencies

- HTML5 Canvas API (native)
- Blob API (native)
- Download attribute support

---

*Feature Version: 1.0*


