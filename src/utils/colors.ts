export interface Color {
  name: string;
  hex: string;
}

export const colorPalette: Color[] = [
  // Reds
  { name: 'Red', hex: '#FF0000' },
  { name: 'Crimson', hex: '#DC143C' },
  { name: 'Indian Red', hex: '#CD5C5C' },
  { name: 'Coral', hex: '#FF7F50' },
  
  // Blues
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Royal Blue', hex: '#4169E1' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Navy', hex: '#000080' },
  
  // Greens
  { name: 'Green', hex: '#008000' },
  { name: 'Forest Green', hex: '#228B22' },
  { name: 'Lime Green', hex: '#32CD32' },
  { name: 'Olive', hex: '#808000' },
  
  // Yellows
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Khaki', hex: '#F0E68C' },
  { name: 'Light Yellow', hex: '#FFFFE0' },
  
  // Purples
  { name: 'Purple', hex: '#800080' },
  { name: 'Violet', hex: '#EE82EE' },
  { name: 'Indigo', hex: '#4B0082' },
  { name: 'Orchid', hex: '#DA70D6' }
];