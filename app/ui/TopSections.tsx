"use client";
import { useEffect } from "react";
import { Navabr } from "../components/home/navigation/Navbar";
import { Main, Section } from "../components/styled";
import { MarketData } from "../components/home/navigation/MarketData";
import { FetchCoins } from "../components/home/coinsList/FeatchCoins";
import { useAppDispatch } from "@/app/lib/hooks";
import { fetchChartData } from "../components/home/charts/chartsSlice";
import { useCryptoContext } from "../context/context";

export const TopSection = () => {
  const { chartUrl, selectedPeriod, selectedCurrency, currentChart } =
    useCryptoContext();
  const dispatch = useAppDispatch();
  const fetchData = () => {
    dispatch(fetchChartData(chartUrl));
  };

  useEffect(() => {
    fetchData();
  }, [selectedPeriod, selectedCurrency, currentChart]);
  return (
    <>
      <FetchCoins />
      <Main>
        <Section>
          <Navabr />
          <MarketData />
        </Section>
      </Main>
    </>
  );
};
