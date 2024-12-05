import React from 'react';
import { Heart, MessageCircle, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Pin } from '../types';
import { usePinStore } from '../store/usePinStore';
import toast from 'react-hot-toast';

interface PinModalActionsProps {
  pin: Pin;
}

export const PinModalActions: React.FC<PinModalActionsProps> = ({ pin }) => {
  const { toggleFavorite, isFavorite, downloadPin, sharePin } = usePinStore();

  const handleFavorite = () => {
    toggleFavorite(pin.id);
    toast.success(isFavorite(pin.id) ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleDownload = () => {
    downloadPin(pin);
    toast.success('Download started');
  };

  const handleShare = () => {
    sharePin(pin);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="flex items-center gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFavorite}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <Heart className={`w-5 h-5 ${isFavorite(pin.id) ? 'fill-primary text-primary' : ''}`} />
        {isFavorite(pin.id) ? 'Saved' : 'Save'}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownload}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        title="Download"
      >
        <Download className="w-6 h-6" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        title="Share"
      >
        <Share2 className="w-6 h-6" />
      </motion.button>
    </div>
  );
};