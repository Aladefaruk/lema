import React from 'react';
import { PlusIcon } from '../../../assets/icons';

interface AddPostCardProps {
  onClick: () => void;
}

const AddPostCard: React.FC<AddPostCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-4/6 sm:w-[270px]  h-[257px] sm:h-[293px] relative flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 270 293"
        fill="none"
      >
        <rect
          x="0.5"
          y="0.5"
          width="269"
          height="292"
          rx="7.5"
          stroke="#D5D7DA"
          strokeDasharray="12 8"
        />
      </svg>
      <div className=" w-full flex items-center justify-center mb-2">
       <PlusIcon/>
      </div>
      <span className="text-gray-500 text-sm font-semibold">New Post</span>
    </div>
  );
};

export default AddPostCard;