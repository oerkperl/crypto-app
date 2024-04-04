import React, { ReactNode } from "react";
import Link from "next/link";
import ThemeSwitcher from "./home/navigation/ThemeSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { useCryptoContext } from "@/app/context/context";
import { usePathname } from "next/navigation";
import { NavBtn } from "./home/styled";
import { Search } from "./home/navigation/Search";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const expandIcon = <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />;
  const { viewingCoinId, setIsOpen } = useCryptoContext();
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
    <div className="fixed inset-0 z-50 justify-center flex items-center overflow-y-auto outline-none focus:outline-none">
      <div
        className="absolute inset-0 bg-black opacity-50 flex"
        onClick={handleCloseModal}
      ></div>
      <div className="fixed min-w-[800px] mx-auto my-6 rounded-md">
        <div className="relative flex flex-col w-full border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {activePath === "/" && (
            <div className="top-0 flex gap-2 justify-end p-2 rounded-t items-center bg-white dark:bg-accent-bg">
              <NavBtn>
                <Search />
              </NavBtn>
              <ThemeSwitcher />
              <Link
                href={`/coin?id=${viewingCoinId}`}
                className=" px-4 py-1 hover:bg-indigo-600 rounded-md shadow-md hover:text-white bg-gray-100 dark:bg-input-bg"
                onClick={() => setIsOpen(false)}
              >
                {expandIcon}
              </Link>
              <button
                className="px-4 py-1 hover:bg-indigo-600 shadow-md rounded-md hover:text-white bg-gray-100 dark:bg-input-bg"
                onClick={onClose}
              >
                X
              </button>
            </div>
          )}
          <div className="p-2 flex-auto overflow-y-auto max-h-[85vh] bg-gray-100 dark:bg-gray-950">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
