"use client";
import { useEffect } from "react";
import { Navabr } from "../components/home/navigation/Navbar";
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
      <main className="w-full max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto sticky top-0 bg-gray-100 dark:bg-gray-950 z-10 px-1 sm:px-4 lg:px-6">
        <section className="pb-1">
          <MarketData />
          <Navabr />
        </section>
      </main>
    </>
  );
};
