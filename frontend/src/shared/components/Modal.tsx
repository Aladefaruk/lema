import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-none top-48 ">
      <div className="flex items-center justify-center  px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block sm:w-4/5 h-auto max-w-[679px] lg:h-fit overflow-none p-6 my-8 overflow-none text-left align-middle transition-all transform bg-white shadow-xl rounded-[8px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;