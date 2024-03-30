"use client";
import { Dashboard } from "../components/home/charts/Dashboard";
import { Main, Section } from "../components/styled";
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
      <Main>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Coin />
        </Modal>
        <Section>
          <Dashboard />
        </Section>
        <CoinsList />
        <BackToTopButton />
      </Main>
    </>
  );
};
