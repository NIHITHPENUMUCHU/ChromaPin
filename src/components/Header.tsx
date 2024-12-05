import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, MessageCircle, User, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePinStore } from '../store/usePinStore';
import { ColorPicker } from './ColorPicker';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const { searchTerm, setSearchTerm } = usePinStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 h-16">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>

          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search inspiring pins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-full border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <ColorPicker />

          <nav className="hidden md:flex items-center gap-2">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                  location.pathname === path ? 'bg-gray-100' : ''
                }`}
              >
                <Icon className="w-6 h-6 text-secondary" />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-2 border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search inspiring pins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-full border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
          >
            <nav className="p-4 space-y-2">
              {menuItems.map(({ icon: Icon, label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">{label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};