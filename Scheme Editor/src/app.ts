// ============================================
// Scheme Card Editor - Main Application
// ============================================

import type { CardConfig, AppState, ExportFormat } from './types.js';

// Card Configuration - Based on template analysis
const CARD_CONFIG: CardConfig = {
  width: 744,
  height: 1039,
  
  // Image area (white rectangle for user artwork)
  imageArea: {
    x: 28,
    y: 28,
    width: 688,
    height: 520,
    borderRadius: 20
  },
  
  // Card name position (bold title in blue area)
  namePosition: {
    x: 372,           // Center of card
    y: 640,           // In the light blue area
    maxWidth: 650,
    fontSize: 52,
    fontFamily: 'Grandarena',
    color: '#000000',
    strokeColor: '#FFFFFF',
    strokeWidth: 6,
    align: 'center'
  },
  
  // Description position (below card name)
  descPosition: {
    x: 372,           // Center of card
    y: 720,           // Below the name
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
const state: AppState = {
  cardTemplate: null,
  userImage: null,
  cardName: '',
  cardDescription: ''
};

// DOM Elements
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let uploadZone: HTMLElement;
let imageInput: HTMLInputElement;
let cardNameInput: HTMLInputElement;
let cardDescInput: HTMLTextAreaElement;

// Initialize Application
async function init(): Promise<void> {
  // Get DOM elements
  canvas = document.getElementById('cardCanvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d')!;
  uploadZone = document.getElementById('uploadZone')!;
  imageInput = document.getElementById('imageInput') as HTMLInputElement;
  cardNameInput = document.getElementById('cardName') as HTMLInputElement;
  cardDescInput = document.getElementById('cardDescription') as HTMLTextAreaElement;
  
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
async function loadFonts(): Promise<void> {
  try {
    const grandarena = new FontFace('Grandarena', 'url(Assets/fonts/grand-arena.otf)');
    const poppins = new FontFace('Poppins', 'url(Assets/fonts/Poppins-Regular.otf)');
    
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
async function loadTemplate(): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      state.cardTemplate = img;
      console.log('Template loaded:', img.width, 'x', img.height);
      resolve();
    };
    img.onerror = () => {
      console.warn('Template not found - using placeholder');
      resolve();
    };
    img.src = 'Assets/images/card-template.png';
  });
}

// Setup all event listeners
function setupEventListeners(): void {
  // Upload zone click
  uploadZone.addEventListener('click', () => imageInput.click());
  
  // File input change
  imageInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) handleFile(target.files[0]);
  });
  
  // Drag and drop
  uploadZone.addEventListener('dragover', handleDragOver);
  uploadZone.addEventListener('dragleave', handleDragLeave);
  uploadZone.addEventListener('drop', handleDrop);
  
  // Text inputs
  cardNameInput.addEventListener('input', handleNameInput);
  cardDescInput.addEventListener('input', handleDescInput);
  
  // Download buttons
  document.getElementById('downloadJpg')!.addEventListener('click', () => download('jpg'));
  document.getElementById('downloadPng')!.addEventListener('click', () => download('png'));
}

// Handle file upload
function handleFile(file: File): void {
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
      uploadZone.classList.add('has-image');
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
  if (e.dataTransfer?.files[0]) {
    handleFile(e.dataTransfer.files[0]);
  }
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

// Main render function
function renderCard(): void {
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

// Draw user image with cover behavior
function drawUserImage(): void {
  const img = state.userImage!;
  const area = CARD_CONFIG.imageArea;
  
  // Calculate cover dimensions
  const imgRatio = img.width / img.height;
  const areaRatio = area.width / area.height;
  
  let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;
  
  if (imgRatio > areaRatio) {
    // Image is wider - fit height, crop width
    drawHeight = area.height;
    drawWidth = img.width * (area.height / img.height);
    offsetX = (drawWidth - area.width) / 2;
    offsetY = 0;
  } else {
    // Image is taller - fit width, crop height
    drawWidth = area.width;
    drawHeight = img.height * (area.width / img.width);
    offsetX = 0;
    offsetY = (drawHeight - area.height) / 2;
  }
  
  // Save context and create clipping region
  ctx.save();
  
  // Create rounded rectangle clip path
  ctx.beginPath();
  roundedRect(ctx, area.x, area.y, area.width, area.height, area.borderRadius || 0);
  ctx.clip();
  
  // Draw image
  ctx.drawImage(img, area.x - offsetX, area.y - offsetY, drawWidth, drawHeight);
  
  ctx.restore();
}

// Draw placeholder when no image
function drawPlaceholder(): void {
  const area = CARD_CONFIG.imageArea;
  
  ctx.save();
  ctx.beginPath();
  roundedRect(ctx, area.x, area.y, area.width, area.height, area.borderRadius || 0);
  ctx.fillStyle = '#E8E8E8';
  ctx.fill();
  
  // Placeholder text
  ctx.font = '24px Poppins';
  ctx.fillStyle = '#999999';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Upload your image', area.x + area.width / 2, area.y + area.height / 2);
  
  ctx.restore();
}

// Draw card name with stroke effect
function drawCardName(): void {
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
function drawDescription(): void {
  const config = CARD_CONFIG.descPosition;
  
  ctx.save();
  ctx.font = `${config.fontSize}px ${config.fontFamily}`;
  ctx.fillStyle = config.color;
  ctx.textAlign = config.align;
  ctx.textBaseline = 'top';
  
  // Word wrap
  const words = state.cardDescription.split(' ');
  const lines: string[] = [];
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
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
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
function download(format: ExportFormat): void {
  // Create export canvas (ensure white background for JPG)
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = CARD_CONFIG.width;
  exportCanvas.height = CARD_CONFIG.height;
  const exportCtx = exportCanvas.getContext('2d')!;
  
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
}

// Start application
document.addEventListener('DOMContentLoaded', init);


