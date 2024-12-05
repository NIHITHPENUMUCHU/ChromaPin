import React from 'react';
import { Header } from './Header';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const showSidebar = !['/', '/messages'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 pt-16 transition-all duration-300 ${showSidebar ? 'md:pl-64' : ''}`}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          className: 'bg-white shadow-lg rounded-lg p-4',
        }} 
      />
    </div>
  );
};