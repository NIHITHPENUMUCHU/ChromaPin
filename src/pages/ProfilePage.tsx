import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePinStore } from '../store/usePinStore';
import { PinGrid } from '../components/PinGrid';
import { UploadPin } from '../components/UploadPin';
import { Settings, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const { favorites, userPins } = usePinStore();
  const [activeTab, setActiveTab] = useState<'pins' | 'favorites'>('pins');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would clear the auth state
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSettings = () => {
    toast.success('Settings page coming soon!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">John Doe</h1>
              <p className="text-gray-500 mb-4">@johndoe</p>
              <div className="flex gap-4">
                <div>
                  <span className="font-bold text-xl">{favorites.length}</span>
                  <span className="text-gray-500 ml-2">Favorites</span>
                </div>
                <div>
                  <span className="font-bold text-xl">{userPins.length}</span>
                  <span className="text-gray-500 ml-2">Pins</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <UploadPin />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSettings}
              className="p-3 rounded-full hover:bg-gray-100"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-3 rounded-full hover:bg-gray-100"
            >
              <LogOut className="w-6 h-6 text-red-500" />
            </motion.button>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('pins')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'pins'
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              My Pins
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Favorites
            </button>
          </div>
          
          <PinGrid
            pins={activeTab === 'pins' ? userPins : favorites.map(id => 
              usePinStore.getState().pins.find(pin => pin.id === id)
            ).filter(Boolean)}
          />
        </div>
      </div>
    </div>
  );
};