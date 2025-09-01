import React, { useState } from "react";
import { FormModal } from "../components/portfolio/FormModal";
import { AssetsList } from "../components/portfolio/AssetsList";
import { useCryptoContext } from "../context/context";
import { Modal } from "../components/Modal";

export const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getAssets } = useCryptoContext();
  const hasAssets = getAssets().length > 0;

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <main className="w-full max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2 sm:px-4 lg:px-6 relative">
      <section className="">
        <div className="flex flex-col sm:flex-row sm:justify-between mt-2 items-start sm:items-center gap-2 sm:gap-0">
          <h1 className="text-lg sm:text-xl">Your Assets</h1>
          <button
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add Asset
          </button>
        </div>
        <div>
          {!hasAssets && (
            <div className="mt-14">
              <p className="text-center">
                You have no assets in your portfolio.
              </p>
            </div>
          )}
          {hasAssets && (
            <div className="mt-2">
              <AssetsList />
            </div>
          )}
        </div>
        <div>
          <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <FormModal onClose={handleCloseModal} isOpen={isOpen} />
          </Modal>
        </div>
      </section>
    </main>
  );
};
