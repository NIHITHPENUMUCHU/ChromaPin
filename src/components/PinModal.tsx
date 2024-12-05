import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Pin } from '../types';
import { PinModalActions } from './PinModalActions';
import { UserProfile } from './UserProfile';

interface PinModalProps {
  pin: Pin;
  isOpen: boolean;
  onClose: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({ pin, isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, type: 'spring', damping: 25 }}
            className="relative max-w-5xl w-full mx-4 max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Section */}
              <div className="md:w-2/3 bg-gray-50 flex items-center justify-center">
                <img
                  src={pin.imageUrl}
                  alt={pin.title}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '90vh' }}
                  loading="eager"
                />
              </div>

              {/* Details Section */}
              <div className="md:w-1/3 flex flex-col p-6 max-h-[90vh] overflow-y-auto">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="mb-6">
                  <PinModalActions pin={pin} />
                </div>

                <h1 className="text-2xl font-bold mb-2">{pin.title}</h1>
                <p className="text-gray-600 mb-6">{pin.description}</p>

                {/* Color Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pin.colors.map((color) => (
                    <div
                      key={color}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm text-gray-600">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t">
                  <UserProfile
                    userId={pin.author.id}
                    name={pin.author.name}
                    avatar={pin.author.avatar}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};