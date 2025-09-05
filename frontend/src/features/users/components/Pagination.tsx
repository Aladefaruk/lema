import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../assets/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
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
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="flex items-center px-3 py-2 text-[14px] text-[#535862] font-[500] hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeftIcon />
        <span className='ml-4'>        Previous
</span>
      </button>
      
      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => (
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 text-[14px] rounded-[8px] w-[40px] h-[40px] ${
                currentPage === page
                ? 'bg-[#F9F5FF] text-[#7F56D9]'
                : 'text-[#717680] hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {page + 1}
            </button>
          )
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="flex items-center px-3 py-2 text-[14px] text-[#535862] font-[500] hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className='mr-4'>        Next
        </span>       <ArrowRightIcon/>
      </button>
    </div>
  );
};

export default Pagination;