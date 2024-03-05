import React, { ReactNode } from "react";
import Link from "next/link";
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
    <div className="fixed inset-0 z-50 justify-center flex overflow-y-auto outline-none focus:outline-none">
      <div
        className="absolute inset-0 bg-black opacity-50 "
        onClick={handleCloseModal}
      ></div>
      <div className="fixed w-auto  mx-auto my-6 ">
        <div className="relative flex flex-col w-full bg-gray-200 dark:bg-gray-900 border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {activePath === "/" && (
            <div className="top-0 flex gap-2 justify-end p-2 rounded-t items-center ">
              <NavBtn>
                <Search />
              </NavBtn>
              <Link
                href={`/coin?id=${viewingCoinId}`}
                className=" px-4 py-2 hover:bg-indigo-600 rounded-md hover:text-white "
                onClick={() => setIsOpen(false)}
              >
                {expandIcon}
              </Link>
              <button
                className="px-4 py-2 hover:bg-indigo-600 rounded-md hover:text-white "
                onClick={onClose}
              >
                X
              </button>
            </div>
          )}
          <div className="p-2 flex-auto overflow-y-auto max-h-[85vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
