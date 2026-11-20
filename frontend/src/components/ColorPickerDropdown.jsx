import React, { useState } from 'react';
import { PRESET_CATEGORY_PALETTE, getContrastRatio } from '../utils/colorPalette';
import { Check } from 'lucide-react';

const ColorPickerDropdown = ({ selectedColor = '#6366f1', onSelectColor }) => {
  return (
    <div className="grid grid-cols-6 gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      {PRESET_CATEGORY_PALETTE.map((color) => {
        const isSelected = selectedColor.toLowerCase() === color.toLowerCase();
        const textColor = getContrastRatio(color);

        return (
          <button
            key={color}
            type="button"
            onClick={() => onSelectColor(color)}
            style={{ backgroundColor: color, color: textColor }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform hover:scale-110 shadow-xs ${
              isSelected ? 'ring-2 ring-offset-2 ring-indigo-500 scale-105' : ''
            }`}
          >
            {isSelected && <Check size={14} />}
          </button>
        );
      })}
    </div>
  );
};

export default ColorPickerDropdown;
