import { describe, it, expect } from 'vitest';
import { PRESET_CATEGORY_PALETTE, getContrastRatio } from '../colorPalette';

describe('colorPalette utility', () => {
  it('supplies at least 10 unique accessible category color swatches', () => {
    expect(PRESET_CATEGORY_PALETTE.length).toBeGreaterThanOrEqual(10);
    const unique = new Set(PRESET_CATEGORY_PALETTE);
    expect(unique.size).toBe(PRESET_CATEGORY_PALETTE.length);
  });

  it('calculates optimal accessible text color for contrasting background', () => {
    // Dark background should recommend white text
    expect(getContrastRatio('#000000')).toBe('#ffffff');
    expect(getContrastRatio('#1e1b4b')).toBe('#ffffff');

    // Light background should recommend black text
    expect(getContrastRatio('#ffffff')).toBe('#000000');
    expect(getContrastRatio('#fef08a')).toBe('#000000');
  });
});
