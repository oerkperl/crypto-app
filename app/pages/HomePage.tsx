"use client";
import { Navabr } from "../components/home/navigation/Navbar";
import { Charts } from "../components/home/charts/Charts";
import { Main } from "../components/styled";
import { CoinsList } from "../components/home/coins/CoinsList";
import { MarketData } from "../components/home/navigation/MarketData";
import { Section } from "../components/styled";

export const HomePage = () => {
  return (
    <Main>
      <Section>
        <MarketData />
      </Section>
      <Navabr />
      <Charts />
      <CoinsList />
    </Main>
  );
};
