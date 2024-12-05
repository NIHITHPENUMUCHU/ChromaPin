import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Download, Share2 } from 'lucide-react';
import { Pin } from '../types';
import { usePinStore } from '../store/usePinStore';
import { PinModal } from './PinModal';
import toast from 'react-hot-toast';

interface PinCardProps {
  pin: Pin;
}

export const PinCard: React.FC<PinCardProps> = memo(({ pin }) => {
  const { toggleFavorite, isFavorite, downloadPin, sharePin } = usePinStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pin.id);
    toast.success(isFavorite(pin.id) ? 'Added from favorites' : 'Removed to favorites');
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    downloadPin(pin);
    toast.success('Download started');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sharePin(pin);
    toast.success('Link copied to clipboard');
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={pin.imageUrl}
          alt={pin.title}
          className="w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          style={{ 
            minHeight: '200px',
            aspectRatio: '1',
            objectFit: 'cover'
          }}
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
          <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavorite}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart 
                  className={`w-5 h-5 ${isFavorite(pin.id) ? 'text-primary fill-primary' : 'text-secondary'}`} 
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownload}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Download className="w-5 h-5 text-secondary" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Share2 className="w-5 h-5 text-secondary" />
              </motion.button>
            </div>
            
            <div className="text-white">
              <h3 className="font-bold text-lg">{pin.title}</h3>
              <p className="text-sm opacity-90">{pin.description}</p>
              <div className="flex items-center mt-3 gap-2">
                <img
                  src={pin.author.avatar}
                  alt={pin.author.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  loading="lazy"
                />
                <span className="text-sm font-medium">{pin.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <PinModal
        pin={pin}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
});