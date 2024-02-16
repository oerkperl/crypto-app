"use client";
import { Charts } from "../components/home/charts/Charts";
import { Main, Section } from "../components/styled";
import { CoinsList } from "../components/home/coinsList/CoinsList";
import { BackToTopButton } from "../lib/utils/components/BackToTopButton";
import { Converter } from "../components/home/converter/Converter";
import { useCryptoContext } from "../context/context";
import { CoinModal } from "../components/coin/CoinModal";
import { Coin } from "./Coin";
export const HomePage = () => {
  const { selectedOption, isOpen, setIsOpen } = useCryptoContext();
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
          {selectedOption === "Coins" ? <Charts /> : <Converter />}
        </Section>
        <CoinsList />
        <BackToTopButton />
      </Main>
    </>
  );
};
