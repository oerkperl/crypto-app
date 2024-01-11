"use client";
import { Navabr } from "./Navbar";
import { Charts } from "./charts/Charts";
import { Main } from "../globalStyled/styled";
import { CoinsList } from "./coins/CoinsList";
import { MarketData } from "./MarketData";
import { Section } from "../globalStyled/styled";

export const HomePage = () => {
  return (
    <>
      <Main>
        <Section>
          <MarketData />
        </Section>
        <Navabr />
        <Charts />
        <CoinsList />
      </Main>
    </>
  );
};
