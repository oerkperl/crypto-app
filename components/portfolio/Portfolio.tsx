import React, { useState } from "react";
import { AssetForm } from "./AssetForm";
import { AssetsList } from "./AssetsList";
import { usePortfolioStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Zustand: Subscribe directly to assets array for reactivity
  const assets = usePortfolioStore((state) => state.assets);
  const hasAssets = assets.length > 0;

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <main className="w-full max-w-7xl overflow-x-hidden mx-auto px-3 sm:px-4 lg:px-6 relative">
      <section className="mt-4">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Your Portfolio
          </h1>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
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
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
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

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] bg-gray-100 dark:bg-gray-950 overflow-y-auto border-0">
            <DialogHeader>
              <DialogTitle>Add New Asset</DialogTitle>
              <DialogDescription>
                Add a cryptocurrency to your portfolio to start tracking its
                performance.
              </DialogDescription>
            </DialogHeader>
            <AssetForm onClose={handleCloseModal} />
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
};
