# Feature: Image Upload

## Overview

The image upload feature allows users to add their custom artwork to the card. This is the primary visual element that personalizes each card.

---

## User Stories

- As a user, I want to drag and drop an image onto the upload area
- As a user, I want to click to browse and select an image file
- As a user, I want to see my uploaded image appear on the card preview instantly
- As a user, I want to replace my image by uploading a new one

---

## Functional Requirements

### FR-1: Drag and Drop Upload
- The upload zone must accept dragged files
- Visual feedback when file is dragged over the zone (highlight/border change)
- Only process the first file if multiple files are dropped

### FR-2: Click to Upload
- Clicking the upload zone opens the native file picker
- Hidden `<input type="file">` triggered by click event
- Same processing flow as drag-and-drop

### FR-3: Supported Formats
| Format | MIME Type | Extension |
|--------|-----------|-----------|
| JPEG | image/jpeg | .jpg, .jpeg |
| PNG | image/png | .png |
| WebP | image/webp | .webp |

### FR-4: File Validation
- **Max file size:** 10MB (configurable)
- **Min dimensions:** 100x100 pixels
- **Format check:** Reject unsupported file types with user-friendly error

### FR-5: Image Processing
- Read file using `FileReader` API
- Create `Image` object for canvas rendering
- Fit image to card artwork area (maintain aspect ratio, cover mode)

---

## Technical Implementation

### HTML Structure
```html
<div class="upload-zone" id="uploadZone">
  <input type="file" id="imageInput" accept="image/jpeg,image/png,image/webp" hidden>
  <div class="upload-content">
    <span class="upload-icon">📷</span>
    <p>Drag & drop your image here</p>
    <p class="upload-hint">or click to browse</p>
  </div>
</div>
```

### JavaScript Events
```javascript
// Click handler
uploadZone.addEventListener('click', () => imageInput.click());

// File input change
imageInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

// Drag events
uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  handleFile(e.dataTransfer.files[0]);
});
```

### File Processing Function
```javascript
function handleFile(file) {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    showError('Please upload a JPG, PNG, or WebP image');
    return;
  }

  // Validate file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    showError('Image must be smaller than 10MB');
    return;
  }

  // Read and process
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      userImage = img;
      renderCard(); // Trigger preview update
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
```

---

## Image Fitting Strategy

The user's image must fit within the designated card artwork area while maintaining visual appeal.

### Cover Mode (Recommended)
- Scale image to completely cover the artwork area
- Crop excess from the center
- No letterboxing or pillarboxing

```javascript
function drawImageCover(ctx, img, x, y, width, height) {
  const imgRatio = img.width / img.height;
  const areaRatio = width / height;
  
  let drawWidth, drawHeight, offsetX, offsetY;
  
  if (imgRatio > areaRatio) {
    // Image is wider - fit height, crop width
    drawHeight = height;
    drawWidth = img.width * (height / img.height);
    offsetX = (drawWidth - width) / 2;
    offsetY = 0;
  } else {
    // Image is taller - fit width, crop height
    drawWidth = width;
    drawHeight = img.height * (width / img.width);
    offsetX = 0;
    offsetY = (drawHeight - height) / 2;
  }
  
  ctx.drawImage(img, -offsetX + x, -offsetY + y, drawWidth, drawHeight);
}
```

---

## Error Handling

| Error Condition | User Message |
|-----------------|--------------|
| Invalid file type | "Please upload a JPG, PNG, or WebP image" |
| File too large | "Image must be smaller than 10MB" |
| File read error | "Unable to read image. Please try another file" |
| Image load error | "Unable to load image. The file may be corrupted" |

### Error Display
- Show error message near upload zone
- Use accent color (#FF66CC) for error styling
- Auto-dismiss after 5 seconds or on next action

---

## UI States

### Default State
- Dashed border
- Upload icon and instructional text
- Background: slightly darker than main

### Hover State
- Border color changes to accent (#8F68FC)
- Cursor: pointer

### Dragover State
- Solid border with accent color
- Background highlight
- "Drop your image" text

### Uploaded State
- Show thumbnail preview in upload zone
- "Click to change" text overlay
- Success indicator

---

## Accessibility

- Upload zone is keyboard accessible (Enter/Space to trigger)
- ARIA labels for screen readers
- Focus visible indicator
- Error messages announced to screen readers

```html
<div class="upload-zone" 
     id="uploadZone" 
     role="button" 
     tabindex="0"
     aria-label="Upload card image">
```

---

## Dependencies

- No external libraries required
- Uses native browser APIs:
  - `FileReader` API
  - `Image` object
  - Drag and Drop API
  - `<input type="file">`

---

*Feature Version: 1.0*


