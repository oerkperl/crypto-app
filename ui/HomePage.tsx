"use client";
import { Dashboard } from "../app/components/home/charts/Dashboard";
import { CoinsList } from "../app/components/home/coinsList/CoinsList";
import { BackToTopButton } from "../app/lib/utils/components/BackToTopButton";
import { useUIStore } from "../store";
import { Modal } from "../app/components/Modal";
import { Coin } from "./Coin";

export const HomePage = () => {
  // ✅ Zustand: Only subscribes to modal state
  const isOpen = useUIStore((state) => state.isOpen);
  const setIsOpen = useUIStore((state) => state.setIsOpen);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <main className="w-full max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2 sm:px-4 lg:px-6">
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Coin />
        </Modal>
        <section>
          <Dashboard />
        </section>
        <CoinsList />
        <BackToTopButton />
      </main>
    </>
  );
};
