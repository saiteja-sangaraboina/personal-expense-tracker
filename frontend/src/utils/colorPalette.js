/**
 * colorPalette.js - Accessible color palettes, WCAG contrast calculation, and category styling
 */

export const PRESET_CATEGORY_PALETTE = [
  '#6366f1', // Indigo
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Rose
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#ec4899', // Pink
  '#14b8a6', // Teal
  '#3b82f6', // Blue
  '#84cc16', // Lime
  '#64748b', // Slate
];

export const getContrastRatio = (hexColor = '#000000') => {
  const hex = hexColor.replace('#', '');
  if (hex.length !== 6) return 21; // Default black on white

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Relative luminance calculation
  const getLuminance = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const lum = 0.2126 * getLuminance(r) + 0.7152 * getLuminance(g) + 0.0722 * getLuminance(b);

  // Return true if white text is preferred, false if black text is preferred
  return lum < 0.5 ? '#ffffff' : '#000000';
};
