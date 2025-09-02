import React from "react";
import { useChartStore, useCurrencyStore, useUIStore } from "@/store";
import { useSelector } from "react-redux";
import { getCoinById, getCoins } from "../coinsList/coinsSlice";
import { RootState } from "@/store/store";
//import { removeDuplicates, formatMoney } from "@/app/lib/utils/formatters";
import { HorizontalCoinSelector } from "./HorizontalCoinSelector";
import { ChartConverter } from "../../shared/ChartConverter";
import { TrendLabel } from "../../TrendLable";
import { StatRow } from "../../coin/StatRow";
import { removeDuplicates, formatMoney } from "@/lib/utils/formatters";

export const Dashboard: React.FC = () => {
  // ✅ Zustand: Selective subscriptions to specific stores
  const currentChart = useChartStore((state) => state.currentChart);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const viewCoin = useUIStore((state) => state.viewCoin);

  let baseCoin = useSelector((state: RootState) =>
    getCoinById(state, currentChart.id)
  );
  const bitcoin = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );
  const allCoins = removeDuplicates(useSelector(getCoins), "id");
  const coinExist = Object.keys(currentChart).length > 0;
  const activeCoin = coinExist ? currentChart : bitcoin;

  // Use currentChart.id directly for the chart, or fallback to bitcoin
  const chartCoinId = currentChart?.id || bitcoin?.id || "bitcoin";
  // For baseCoin, prefer the selected coin from context over Redux lookup
  const activeBaseCoin =
    currentChart && Object.keys(currentChart).length > 0
      ? currentChart
      : baseCoin || bitcoin;

  return (
    <section className="">
      <div className="mt-2 flex flex-col gap-2">
        {/* Top Row: Coins List - Horizontal scroll on mobile */}
        <div className="w-full">
          <div className="bg-white dark:bg-accent-bg rounded shadow-md p-3">
            <h2 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
              Select Coin
            </h2>
            <HorizontalCoinSelector coins={allCoins} />
          </div>
        </div>

        {/* Main Chart and Converter */}
        <ChartConverter
          coinId={chartCoinId}
          baseCoin={activeBaseCoin}
          showConverter={true}
        />

        {/* Stats Row - Similar to CoinStatsCard */}
        {activeCoin && (
          <div className="bg-white dark:bg-accent-bg rounded shadow-md p-4">
            <div className="flex justify-between w-full overflow-x-auto space-x-4 lg:space-x-0 lg:justify-evenly scrollbar-hide">
              <StatRow
                stat={
                  selectedCurrency.sym + formatMoney(activeCoin?.market_cap)
                }
                title="Market Cap"
              />
              <StatRow
                stat={
                  selectedCurrency.sym + formatMoney(activeCoin?.current_price)
                }
                title="Current Price"
              />
              <StatRow
                stat={
                  selectedCurrency.sym + formatMoney(activeCoin?.total_volume)
                }
                title="Volume 24h"
              />
              <StatRow
                stat={selectedCurrency.sym + formatMoney(activeCoin?.ath)}
                title="All Time High"
              />
              <StatRow
                stat={selectedCurrency.sym + formatMoney(activeCoin?.atl)}
                title="All Time Low"
              />
              <StatRow
                stat={`#${activeCoin?.market_cap_rank || "N/A"}`}
                title="Market Rank"
              />
            </div>

            {/* View More Button */}
            <div className="mt-4 flex justify-center">
              <button
                className="border border-gray-300 shadow-md dark:border-indigo-500 px-6 py-2 rounded hover:bg-indigo-600 
                  bg-white dark:bg-transparent hover:text-white transition-colors min-h-[44px] text-sm font-medium"
                onClick={() => viewCoin(activeCoin?.id)}
              >
                View {activeCoin?.name} Details
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
