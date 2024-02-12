"use client";
import { Navabr } from "../components/home/navigation/Navbar";
import { Main, Section } from "../components/styled";
import { MarketData } from "../components/home/navigation/MarketData";
import { FetchCoins } from "../components/home/coinsList/FeatchCoins";

export const TopSection = () => {
  return (
    <>
      <FetchCoins />
      <Main>
        <Section>
          <MarketData />
        </Section>
        <Navabr />
      </Main>
    </>
  );
};
