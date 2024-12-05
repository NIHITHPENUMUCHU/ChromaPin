import React, { useState, useRef, useEffect } from 'react';
import { Palette, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { colorPalette } from '../utils/colors';
import { usePinStore } from '../store/usePinStore';

export const ColorPicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedColor, setSelectedColor } = usePinStore();
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
          selectedColor ? 'bg-gray-100' : ''
        }`}
        title="Color picker"
      >
        <Palette 
          className="w-6 h-6" 
          style={{ color: selectedColor || 'var(--secondary)' }} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            <div className="grid grid-cols-5 gap-2 w-64">
              <button
                onClick={() => {
                  setSelectedColor(null);
                  setIsOpen(false);
                }}
                className={`w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center transition-transform hover:scale-110 ${
                  selectedColor === null ? 'ring-2 ring-primary' : ''
                }`}
                title="No color filter"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              {colorPalette.map((color) => (
                <motion.button
                  key={color.hex}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedColor(selectedColor === color.hex ? null : color.hex);
                    setIsOpen(false);
                  }}
                  className={`w-10 h-10 rounded-lg transition-shadow ${
                    selectedColor === color.hex ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};