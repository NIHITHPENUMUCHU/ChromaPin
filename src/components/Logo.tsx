import React from 'react';
import { Palette } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Palette className="w-8 h-8 text-primary" />
      <span className="logo-text text-2xl font-bold text-secondary">
        Chroma<span className="text-primary">Pin</span>
      </span>
    </div>
  );
};