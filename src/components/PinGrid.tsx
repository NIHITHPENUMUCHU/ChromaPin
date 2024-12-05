import React, { useMemo, useState } from 'react';
import Masonry from 'react-masonry-css';
import { usePinStore } from '../store/usePinStore';
import { PinCard } from './PinCard';
import { Pin } from '../types';
import { Pagination } from './Pagination';

interface PinGridProps {
  pins?: Pin[];
}

const ITEMS_PER_PAGE = 50;

const breakpointColumns = {
  default: 5,
  1536: 4,
  1280: 3,
  1024: 3,
  768: 2,
  640: 1,
};

export const PinGrid: React.FC<PinGridProps> = ({ pins: propPins }) => {
  const { pins: storePins, searchTerm, selectedColor } = usePinStore();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPins = useMemo(() => {
    const pinsToFilter = propPins || storePins;
    return pinsToFilter.filter((pin) => {
      const matchesSearch = pin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pin.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesColor = !selectedColor || pin.colors.includes(selectedColor);
      return matchesSearch && matchesColor;
    });
  }, [propPins, storePins, searchTerm, selectedColor]);

  const totalPages = Math.ceil(filteredPins.length / ITEMS_PER_PAGE);
  
  const paginatedPins = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPins.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPins, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedColor]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {paginatedPins.map((pin) => (
          <div key={pin.id} className="mb-4">
            <PinCard pin={pin} />
          </div>
        ))}
      </Masonry>
      
      {filteredPins.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};