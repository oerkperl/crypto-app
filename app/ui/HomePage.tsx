"use client";
import { Charts } from "../components/home/charts/Charts";
import { Main, Section } from "../components/styled";
import { CoinsList } from "../components/home/coinsList/CoinsList";
import { BackToTopButton } from "../lib/utils/components/BackToTopButton";
import { Converter } from "../components/home/converter/Converter";
import { useCryptoContext } from "../context/context";
export const HomePage = () => {
  const { selectedOption } = useCryptoContext();
  return (
    <>
      <Main>
        <Section>
          {selectedOption === "Coins" ? <Charts /> : <Converter />}
        </Section>
        <CoinsList />
        <BackToTopButton />
      </Main>
    </>
  );
};
