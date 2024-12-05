import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Globe, Lock, UserCircle, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {/* Account Settings */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <UserCircle className="w-6 h-6 text-gray-500" />
                <div className="text-left">
                  <p className="font-medium">Profile Information</p>
                  <p className="text-sm text-gray-500">Update your profile details</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-gray-500" />
                <div className="text-left">
                  <p className="font-medium">Password & Security</p>
                  <p className="text-sm text-gray-500">Manage your password and security settings</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-6 h-6 text-gray-500" />
                ) : (
                  <Sun className="w-6 h-6 text-gray-500" />
                )}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Toggle dark mode theme</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  darkMode ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5"
                  animate={{ x: darkMode ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-gray-500">Manage notification settings</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  notifications ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5"
                  animate={{ x: notifications ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-gray-500" />
                <div className="text-left">
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-gray-500">Choose your preferred language</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  );
};