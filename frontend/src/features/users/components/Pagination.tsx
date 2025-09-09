import React, { useMemo, useCallback } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../assets/icons';
import { Button } from '../../../shared';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      if (currentPage > 2) pages.push(-1); // ellipsis
      
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 3) pages.push(-1); // ellipsis
      if (totalPages > 1) pages.push(totalPages - 1);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const handlePrevious = useCallback(() => {
    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    onPageChange(currentPage + 1);
  }, [currentPage, onPageChange]);

  return (
    <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-8">
      <Button
        variant="ghost"
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className="px-2 sm:px-3 py-2 text-sm font-medium disabled:cursor-not-allowed"
      >
        <ArrowLeftIcon />
        <span className='ml-2 sm:ml-4 hidden sm:inline'>Previous</span>
      </Button>
      
      <div className="flex space-x-1">
        {pageNumbers.map((page, index) => (
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="px-2 sm:px-3 py-2 text-gray-400">...</span>
          ) : (
            <Button
              key={page}
              variant="ghost"
              onClick={() => onPageChange(page)}
              className={`px-2 sm:px-3 py-2 text-sm rounded-lg w-8 h-8 sm:w-10 sm:h-10 ${
                currentPage === page
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {page + 1}
            </Button>
          )
        ))}
      </div>
      
      <Button
        variant="ghost"
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
        className="px-2 sm:px-3 py-2 text-sm font-medium disabled:cursor-not-allowed"
      >
        <span className='mr-2 sm:mr-4 hidden sm:inline'>Next</span>
        <ArrowRightIcon/>
      </Button>
    </div>
  );
};

export default Pagination;