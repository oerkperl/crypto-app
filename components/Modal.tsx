import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 justify-center flex items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black opacity-50 flex"
        onClick={handleCloseModal}
        aria-label="Close modal"
      ></div>

      {/* Mobile-first responsive modal container */}
      <div className="fixed inset-4 sm:inset-6 md:relative md:inset-auto md:min-w-[600px] md:max-w-[800px] md:mx-auto md:my-6 rounded-md max-w-full">
        <div className="relative flex flex-col w-full h-full md:h-auto border-0 rounded shadow-lg outline-none focus:outline-none bg-white dark:bg-gray-800 overflow-hidden">
          {/* Modal Content */}
          <div className="p-3 sm:p-4 flex-auto overflow-y-auto overflow-x-hidden h-full md:max-h-[85vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
