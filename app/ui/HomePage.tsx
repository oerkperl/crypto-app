"use client";
import { Charts } from "../components/home/charts/Charts";
import { Main, Section } from "../components/styled";
import { CoinsList } from "../components/home/coinsList/CoinsList";
import { BackToTopButton } from "../lib/utils/components/BackToTopButton";
import { useCryptoContext } from "../context/context";
import { CoinModal } from "../components/coin/CoinModal";
import { Coin } from "./Coin";
export const HomePage = () => {
  const { isOpen, setIsOpen } = useCryptoContext();
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Main>
        <CoinModal isOpen={isOpen} onClose={handleClose}>
          <Coin />
        </CoinModal>
        <Section>
          <Charts />
        </Section>
        <CoinsList />
        <BackToTopButton />
      </Main>
    </>
  );
};
