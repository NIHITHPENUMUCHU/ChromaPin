import React from 'react';
import { motion } from 'framer-motion';
import { colorPalette } from '../utils/colors';
import { X } from 'lucide-react';

interface ColorSelectorProps {
  selectedColors: string[];
  onChange: (colors: string[]) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedColors, onChange }) => {
  const toggleColor = (hex: string) => {
    const newColors = selectedColors.includes(hex)
      ? selectedColors.filter(color => color !== hex)
      : [...selectedColors, hex];
    onChange(newColors);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Colors *
      </label>
      <div className="grid grid-cols-5 gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => onChange([])}
          className={`w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center ${
            selectedColors.length === 0 ? 'ring-2 ring-primary' : ''
          }`}
          title="Clear colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </motion.button>
        
        {colorPalette.map((color) => (
          <motion.button
            key={color.hex}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => toggleColor(color.hex)}
            className={`w-10 h-10 rounded-lg ${
              selectedColors.includes(color.hex) ? 'ring-2 ring-primary' : ''
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {selectedColors.length === 0
          ? 'No colors selected'
          : `Selected ${selectedColors.length} color${selectedColors.length > 1 ? 's' : ''}`}
      </p>
    </div>
  );
};