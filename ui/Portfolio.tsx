import React, { useState } from "react";
import { FormModal } from "../app/components/portfolio/FormModal";
import { AssetsList } from "../app/components/portfolio/AssetsList";
import { usePortfolioStore } from "../store";
import { Modal } from "../app/components/Modal";

export const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Zustand: Only subscribes to portfolio assets
  const getAssets = usePortfolioStore((state) => state.getAssets);
  const hasAssets = getAssets().length > 0;

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <main className="w-full max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-3 sm:px-4 lg:px-6 relative">
      <section className="mt-4">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Your Portfolio
          </h1>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            onClick={() => setIsOpen(true)}
          >
            Add Asset
          </button>
        </div>

        <div>
          {!hasAssets && (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No assets yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Add your first cryptocurrency to start tracking your portfolio
              </p>
              <button
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                onClick={() => setIsOpen(true)}
              >
                Get Started
              </button>
            </div>
          )}
          {hasAssets && (
            <div className="mt-2">
              <AssetsList />
            </div>
          )}
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <FormModal onClose={handleCloseModal} isOpen={isOpen} />
        </Modal>
      </section>
    </main>
  );
};
