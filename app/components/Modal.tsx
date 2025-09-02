import React, { ReactNode } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { useUIStore } from "@/app/store";
import { usePathname } from "next/navigation";
import { Search } from "./home/navigation/Search";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const expandIcon = <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />;

  // ✅ Zustand: Only subscribes to UI state
  const viewingCoinId = useUIStore((state) => state.viewingCoinId);
  const setIsOpen = useUIStore((state) => state.setIsOpen);

  const activePath = usePathname();

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
      className="fixed inset-0 z-50 justify-center flex items-center overflow-y-auto outline-none focus:outline-none"
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
      <div className="fixed inset-4 sm:inset-6 md:relative md:inset-auto md:min-w-[800px] md:mx-auto md:my-6 rounded-md">
        <div className="relative flex flex-col w-full h-full md:h-auto border-0 rounded shadow-lg outline-none focus:outline-none">
          {/* Modal Header - Home page only */}
          {activePath === "/" && (
            <div className="top-0 flex flex-row gap-2 justify-between p-3 sm:p-2 rounded-t items-center bg-white dark:bg-accent-bg">
              {/* Search - flexible width */}
              <div className="flex-1 min-w-0 mr-2">
                <Search />
              </div>

              {/* Action buttons - compact */}
              <div className="flex gap-2 flex-shrink-0">
                <Link
                  href={`/coin?id=${viewingCoinId}`}
                  className="min-h-[44px] min-w-[44px] px-3 py-2 hover:bg-indigo-600 rounded-md shadow-md hover:text-white bg-gray-100 dark:bg-input-bg flex items-center justify-center transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="View full coin page"
                >
                  {expandIcon}
                </Link>
                <button
                  className="min-h-[44px] min-w-[44px] px-3 py-2 hover:bg-indigo-600 shadow-md rounded-md hover:text-white bg-gray-100 dark:bg-input-bg transition-colors"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Modal Content */}
          <div className="p-3 sm:p-2 flex-auto overflow-y-auto h-full md:max-h-[85vh] bg-gray-100 dark:bg-gray-950">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
