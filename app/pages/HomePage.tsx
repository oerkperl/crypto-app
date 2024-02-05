"use client";
import { Navabr } from "../components/home/navigation/Navbar";
import { Charts } from "../components/home/charts/Charts";
import { Main } from "../components/styled";
import { CoinsList } from "../components/home/coinsList/CoinsList";
import { MarketData } from "../components/home/navigation/MarketData";
import { Section } from "../components/styled";
import { BackToTopButton } from "../lib/utils/components/BackToTopButton";
import { Converter } from "../components/home/converter/Converter";
import { useCryptoContext } from "../context/context";
export const HomePage = () => {
  const { selectedOption } = useCryptoContext();
  return (
    <Main>
      <Section>
        <MarketData />
      </Section>
      <Navabr />
      <Section>
        {selectedOption === "Coins" ? <Charts /> : <Converter />}
      </Section>
      <CoinsList />
      <BackToTopButton />
    </Main>
  );
};
