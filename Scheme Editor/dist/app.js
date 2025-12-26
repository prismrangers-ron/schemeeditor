// ============================================
// Scheme Card Editor - Main Application (Compiled)
// ============================================

// Card Configuration - Based on template analysis
const CARD_CONFIG = {
  width: 744,
  height: 1039,
  
  // Image area (white rectangle for user artwork)
  imageArea: {
    x: 28,
    y: 28,
    width: 688,
    height: 620,
    borderRadius: 20
  },
  
  // Card name position (bold title in blue area - lower)
  namePosition: {
    x: 372,           // Center of card
    y: 720,           // Lower in the light blue area
    maxWidth: 650,
    fontSize: 52,
    fontFamily: 'Grandarena',
    color: '#000000',
    strokeColor: '#FFFFFF',
    strokeWidth: 6,
    align: 'center'
  },
  
  // Description position (below card name - lower)
  descPosition: {
    x: 372,           // Center of card
    y: 800,           // Below the name
    maxWidth: 620,
    fontSize: 32,
    fontFamily: 'Poppins',
    color: '#000000',
    lineHeight: 42,
    maxLines: 3,
    align: 'center'
  }
};

// Application State
const state = {
  cardTemplate: null,
  userImage: null,
  cardName: '',
  cardDescription: '',
  // Image adjustment
  imageZoom: 1,
  imageOffsetX: 0,
  imageOffsetY: 0
};

// DOM Elements
let canvas;
let ctx;
let uploadZone;
let imageInput;
let cardNameInput;
let cardDescInput;
let zoomSlider;
let xSlider;
let ySlider;
let imageControls;

// Initialize Application
async function init() {
  // Get DOM elements
  canvas = document.getElementById('cardCanvas');
  ctx = canvas.getContext('2d');
  uploadZone = document.getElementById('uploadZone');
  imageInput = document.getElementById('imageInput');
  cardNameInput = document.getElementById('cardName');
  cardDescInput = document.getElementById('cardDescription');
  zoomSlider = document.getElementById('zoomSlider');
  xSlider = document.getElementById('xSlider');
  ySlider = document.getElementById('ySlider');
  imageControls = document.getElementById('imageControls');
  
  // Set canvas size
  canvas.width = CARD_CONFIG.width;
  canvas.height = CARD_CONFIG.height;
  
  // Load assets
  await loadFonts();
  await loadTemplate();
  
  // Setup event listeners
  setupEventListeners();
  
  // Initial render
  renderCard();
}

// Load custom fonts
async function loadFonts() {
  try {
    const grandarena = new FontFace('Grandarena', 'url(/assets/fonts/grand-arena.otf)');
    const poppins = new FontFace('Poppins', 'url(/assets/fonts/Poppins-Regular.otf)');
    
    const [loadedGrandarena, loadedPoppins] = await Promise.all([
      grandarena.load(),
      poppins.load()
    ]);
    
    document.fonts.add(loadedGrandarena);
    document.fonts.add(loadedPoppins);
    console.log('Fonts loaded successfully');
  } catch (e) {
    console.warn('Font loading failed:', e);
  }
}

// Load card template
async function loadTemplate() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      state.cardTemplate = img;
      console.log('Template loaded:', img.width, 'x', img.height);
      resolve();
    };
    img.onerror = (e) => {
      console.error('Template failed to load:', e);
      alert('Card template failed to load. Please refresh the page.');
      resolve();
    };
    // Use absolute path for Netlify
    img.src = '/assets/images/card-template.png';
  });
}

// Setup all event listeners
function setupEventListeners() {
  // Upload zone click
  uploadZone.addEventListener('click', () => imageInput.click());
  
  // File input change
  imageInput.addEventListener('change', (e) => {
    const target = e.target;
    if (target.files && target.files[0]) handleFile(target.files[0]);
  });
  
  // Drag and drop
  uploadZone.addEventListener('dragover', handleDragOver);
  uploadZone.addEventListener('dragleave', handleDragLeave);
  uploadZone.addEventListener('drop', handleDrop);
  
  // Text inputs
  cardNameInput.addEventListener('input', handleNameInput);
  cardDescInput.addEventListener('input', handleDescInput);
  
  // Image adjustment sliders
  zoomSlider.addEventListener('input', handleZoomChange);
  xSlider.addEventListener('input', handleXChange);
  ySlider.addEventListener('input', handleYChange);
  
  // Reset image button
  document.getElementById('resetImage').addEventListener('click', resetImageAdjustments);
  
  // Download buttons
  document.getElementById('downloadJpg').addEventListener('click', () => download('jpg'));
  document.getElementById('downloadPng').addEventListener('click', () => download('png'));
}

// Image adjustment handlers
function handleZoomChange(e) {
  state.imageZoom = parseFloat(e.target.value);
  document.getElementById('zoomValue').textContent = state.imageZoom.toFixed(1) + 'x';
  renderCard();
}

function handleXChange(e) {
  state.imageOffsetX = parseInt(e.target.value);
  renderCard();
}

function handleYChange(e) {
  state.imageOffsetY = parseInt(e.target.value);
  renderCard();
}

function resetImageAdjustments() {
  state.imageZoom = 1;
  state.imageOffsetX = 0;
  state.imageOffsetY = 0;
  zoomSlider.value = 1;
  xSlider.value = 0;
  ySlider.value = 0;
  document.getElementById('zoomValue').textContent = '1.0x';
  renderCard();
}

// Handle file upload
function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file (JPG, PNG, or WebP)');
    return;
  }
  
  if (file.size > 10 * 1024 * 1024) {
    alert('Image must be smaller than 10MB');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      state.userImage = img;
      // Reset adjustments
      state.imageZoom = 1;
      state.imageOffsetX = 0;
      state.imageOffsetY = 0;
      zoomSlider.value = 1;
      xSlider.value = 0;
      ySlider.value = 0;
      document.getElementById('zoomValue').textContent = '1.0x';
      // Show controls and update UI
      uploadZone.classList.add('has-image');
      imageControls.style.display = 'block';
      renderCard();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Drag and drop handlers
function handleDragOver(e) {
  e.preventDefault();
  uploadZone.classList.add('dragover');
}

function handleDragLeave() {
  uploadZone.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  if (e.dataTransfer && e.dataTransfer.files[0]) {
    handleFile(e.dataTransfer.files[0]);
  }
}

// Text input handlers
function handleNameInput(e) {
  const target = e.target;
  state.cardName = target.value;
  document.getElementById('nameCount').textContent = state.cardName.length.toString();
  renderCard();
}

function handleDescInput(e) {
  const target = e.target;
  state.cardDescription = target.value;
  document.getElementById('descCount').textContent = state.cardDescription.length.toString();
  renderCard();
}

// Main render function
function renderCard() {
  const { width, height } = CARD_CONFIG;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw user image first (behind template)
  if (state.userImage) {
    drawUserImage();
  } else {
    drawPlaceholder();
  }
  
  // Draw card template (frame overlay)
  if (state.cardTemplate) {
    ctx.drawImage(state.cardTemplate, 0, 0, width, height);
  }
  
  // Draw card name with stroke
  if (state.cardName) {
    drawCardName();
  }
  
  // Draw description
  if (state.cardDescription) {
    drawDescription();
  }
}

// Draw user image with zoom and pan controls
function drawUserImage() {
  const img = state.userImage;
  const area = CARD_CONFIG.imageArea;
  const zoom = state.imageZoom;
  const panX = state.imageOffsetX;
  const panY = state.imageOffsetY;
  
  // Calculate base cover dimensions
  const imgRatio = img.width / img.height;
  const areaRatio = area.width / area.height;
  
  let baseWidth, baseHeight;
  
  if (imgRatio > areaRatio) {
    // Image is wider - fit height
    baseHeight = area.height;
    baseWidth = img.width * (area.height / img.height);
  } else {
    // Image is taller - fit width
    baseWidth = area.width;
    baseHeight = img.height * (area.width / img.width);
  }
  
  // Apply zoom
  const drawWidth = baseWidth * zoom;
  const drawHeight = baseHeight * zoom;
  
  // Center the image, then apply pan offset
  const centerOffsetX = (drawWidth - area.width) / 2;
  const centerOffsetY = (drawHeight - area.height) / 2;
  
  // Save context and create clipping region
  ctx.save();
  
  // Create rounded rectangle clip path
  ctx.beginPath();
  roundedRect(ctx, area.x, area.y, area.width, area.height, area.borderRadius || 0);
  ctx.clip();
  
  // Fill background with blue for transparent PNGs
  ctx.fillStyle = '#72beff';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  
  // Draw image with zoom and pan
  ctx.drawImage(
    img,
    area.x - centerOffsetX + panX,
    area.y - centerOffsetY + panY,
    drawWidth,
    drawHeight
  );
  
  ctx.restore();
}

// Draw placeholder when no image
function drawPlaceholder() {
  const area = CARD_CONFIG.imageArea;
  
  ctx.save();
  ctx.beginPath();
  roundedRect(ctx, area.x, area.y, area.width, area.height, area.borderRadius || 0);
  ctx.fillStyle = '#72beff';
  ctx.fill();
  
  // Placeholder text
  ctx.font = '24px Poppins';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Upload your image', area.x + area.width / 2, area.y + area.height / 2);
  
  ctx.restore();
}

// Draw card name with stroke effect
function drawCardName() {
  const config = CARD_CONFIG.namePosition;
  
  ctx.save();
  ctx.font = `${config.fontSize}px ${config.fontFamily}`;
  ctx.textAlign = config.align;
  ctx.textBaseline = 'middle';
  
  // Draw stroke (outline) first
  if (config.strokeColor && config.strokeWidth) {
    ctx.strokeStyle = config.strokeColor;
    ctx.lineWidth = config.strokeWidth;
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeText(state.cardName.toUpperCase(), config.x, config.y, config.maxWidth);
  }
  
  // Draw fill
  ctx.fillStyle = config.color;
  ctx.fillText(state.cardName.toUpperCase(), config.x, config.y, config.maxWidth);
  
  ctx.restore();
}

// Draw description with word wrap
function drawDescription() {
  const config = CARD_CONFIG.descPosition;
  
  ctx.save();
  ctx.font = `${config.fontSize}px ${config.fontFamily}`;
  ctx.fillStyle = config.color;
  ctx.textAlign = config.align;
  ctx.textBaseline = 'top';
  
  // Word wrap
  const words = state.cardDescription.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > config.maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // Limit lines
  const maxLines = config.maxLines || 3;
  const displayLines = lines.slice(0, maxLines);
  
  // Draw lines
  const lineHeight = config.lineHeight || config.fontSize * 1.3;
  displayLines.forEach((line, index) => {
    ctx.fillText(line, config.x, config.y + (index * lineHeight));
  });
  
  ctx.restore();
}

// Helper: Draw rounded rectangle
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Download functions
function download(format) {
  const button = document.getElementById(format === 'jpg' ? 'downloadJpg' : 'downloadPng');
  const originalText = button.innerHTML;
  
  // Show loading state
  button.disabled = true;
  button.innerHTML = '⏳ Preparing...';
  button.classList.add('btn-loading');
  
  // Small delay for UI feedback
  setTimeout(() => {
    try {
      // Create export canvas (ensure white background for JPG)
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = CARD_CONFIG.width;
      exportCanvas.height = CARD_CONFIG.height;
      const exportCtx = exportCanvas.getContext('2d');
      
      if (format === 'jpg') {
        // White background for JPG
        exportCtx.fillStyle = '#FFFFFF';
        exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      }
      
      // Draw main canvas content
      exportCtx.drawImage(canvas, 0, 0);
      
      // Generate download
      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
      const quality = format === 'jpg' ? 0.92 : undefined;
      const dataURL = exportCanvas.toDataURL(mimeType, quality);
      
      // Create filename
      const baseName = state.cardName
        ? state.cardName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 20)
        : 'scheme-card';
      const filename = `${baseName}-${Date.now()}.${format}`;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success state
      button.innerHTML = '✅ Downloaded!';
      button.classList.remove('btn-loading');
      button.classList.add('btn-success');
      
      // Reset after delay
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove('btn-success');
      }, 2000);
      
    } catch (error) {
      console.error('Download failed:', error);
      button.innerHTML = '❌ Error';
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove('btn-loading');
      }, 2000);
    }
  }, 100);
}

// Start application
document.addEventListener('DOMContentLoaded', init);

