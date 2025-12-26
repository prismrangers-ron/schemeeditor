// ============================================
// Type Definitions for Scheme Card Editor
// ============================================

export interface CardConfig {
  width: number;
  height: number;
  imageArea: Rectangle;
  namePosition: TextConfig;
  descPosition: TextConfig;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
}

export interface TextConfig {
  x: number;
  y: number;
  maxWidth: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  strokeColor?: string;
  strokeWidth?: number;
  lineHeight?: number;
  maxLines?: number;
  align: CanvasTextAlign;
}

export interface AppState {
  cardTemplate: HTMLImageElement | null;
  userImage: HTMLImageElement | null;
  cardName: string;
  cardDescription: string;
}

export type ExportFormat = 'jpg' | 'png';


