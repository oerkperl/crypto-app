"use client";
import { useEffect } from "react";
import { Navabr } from "../app/components/home/navigation/Navbar";
import { MarketData } from "../app/components/home/navigation/MarketData";
import { FetchCoins } from "../app/components/home/coinsList/FeatchCoins";
import { useChartStore, useCurrencyStore } from "@/store";

export const TopSection = () => {
  // ✅ Zustand: Selective subscriptions to only needed state
  const selectedPeriod = useChartStore((state) => state.selectedPeriod);
  const currentChart = useChartStore((state) => state.currentChart);
  const getChartUrl = useChartStore((state) => state.getChartUrl);
  const fetchChartData = useChartStore((state) => state.fetchChartData);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);

  const fetchData = () => {
    // Use computed chartUrl from store and Zustand fetch function
    const chartUrl = getChartUrl(selectedCurrency.name);
    fetchChartData(chartUrl);
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
