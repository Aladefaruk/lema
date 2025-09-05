import React from 'react';
import "../loader.css"

interface LoaderProps {
  fullPage?: boolean;
  color?: 'purple' | 'white';
  size?: 'normal' | 'small';
}

const Loader: React.FC<LoaderProps> = ({ fullPage = false, color = 'purple', size = 'normal' }) => {
  const colorClass = color === 'white' ? 'text-white' : 'text-purple-300';
  const sizeClass = size === 'small' ? 'lds-ellipsis-small' : 'lds-ellipsis';
  const spinner = <div className={`${sizeClass} ${colorClass}`}><div></div><div></div><div></div><div></div></div>;
  
  if (fullPage) {
    return (
      <div className="min-h-screen bg-white flex  justify-center mt-72">
        <div className="text-center">
          <div className="mb-4">{spinner}</div>
        </div>
      </div>
    );
  }
  
  return spinner;
};

export default Loader;