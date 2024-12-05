import { Pin } from '../types';
import { colorPalette } from './colors';

const generateMockPins = (): Pin[] => {
  const pins: Pin[] = [];
  const categories = ['Nature', 'Architecture', 'Food', 'Travel', 'Art', 'Fashion', 'Technology'];
  const authors = [
    { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' },
    { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { id: '3', name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12' },
    { id: '4', name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
  ];

  colorPalette.forEach((color) => {
    for (let i = 1; i <= 100; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const author = authors[Math.floor(Math.random() * authors.length)];
      const imageId = Math.floor(Math.random() * 1000);
      
      pins.push({
        id: `${color.name}-${i}`,
        title: `${color.name} ${category} ${i}`,
        description: `Beautiful ${color.name.toLowerCase()} themed ${category.toLowerCase()} inspiration`,
        imageUrl: `https://images.unsplash.com/photo-${imageId}?w=800&fit=crop&auto=format`,
        colors: [color.hex],
        author,
      });
    }
  });

  return pins;
};

export const mockPins = generateMockPins();