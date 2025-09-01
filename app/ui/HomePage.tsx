"use client";
import { Dashboard } from "../components/home/charts/Dashboard";
import { CoinsList } from "../components/home/coinsList/CoinsList";
import { BackToTopButton } from "../lib/utils/components/BackToTopButton";
import { useCryptoContext } from "../context/context";
import { Modal } from "../components/Modal";
import { Coin } from "./Coin";
export const HomePage = () => {
  const { isOpen, setIsOpen } = useCryptoContext();
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
