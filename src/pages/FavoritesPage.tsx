import React from 'react';
import { motion } from 'framer-motion';
import { usePinStore } from '../store/usePinStore';
import { PinGrid } from '../components/PinGrid';
import { Heart } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { pins, favorites } = usePinStore();
  const favoritePins = React.useMemo(() => 
    pins.filter((pin) => favorites.includes(pin.id)),
    [pins, favorites]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      {favoritePins.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No favorite pins yet. Start adding some!</p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          >
            Discover Pins
          </motion.a>
        </div>
      ) : (
        <PinGrid pins={favoritePins} />
      )}
    </motion.div>
  );
};