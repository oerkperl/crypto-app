import React from "react";
import Image from "next/image";
import { useCurrencyStore, useUIStore } from "@/store";
import { Sparkline } from "./Sparkline";
import { Trends } from "./Trends";
import { TrendLabel } from "../../TrendLable";

export const CoinRow: React.FC<{ coins: any[] }> = ({ coins }) => {
  // ✅ Zustand: Only subscribes to currency and viewCoin function
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const viewCoin = useUIStore((state) => state.viewCoin);

  const setTrend = (coin: any): boolean => {
    const trend = coin.price_change_percentage_1h_in_currency < 0;
    return trend;
  };

  return (
    <div className="">
      {coins.map((coin, index) => (
        <div key={coin?.id}>
          {/* Desktop Table Row - Hidden on mobile */}
          <div
            className={`hidden lg:flex bg-white dark:bg-accent-bg mb-1 rounded 
            items-center cursor-pointer hover:bg-indigo-600 hover:text-white text-xs transition-colors`}
            onClick={() => {
              viewCoin(coin?.id);
            }}
          >
            <div className="flex ml-1 items-center gap-1 w-[290px]">
              <span> {index + 1 || "#"}</span>
              <Image
                src={coin.image || ""}
                width={25}
                height={25}
                alt="coin image"
              />{" "}
              <span>{coin.name}</span>
            </div>
            <div className="w-[150px]">
              {selectedCurrency.sym}
              {coin.current_price}
            </div>
            <div className="w-[100px]">
              <TrendLabel
                value={coin?.price_change_percentage_1h_in_currency}
                percentage={true}
              />
            </div>
            <div className="w-[100px]">
              <TrendLabel
                value={coin?.price_change_percentage_24h_in_currency}
                percentage={true}
              />
            </div>
            <div className="w-[100px]">
              <TrendLabel
                value={coin?.price_change_percentage_7d_in_currency}
                percentage={true}
              />
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-[200px]">
                <Trends
                  firstVal={coin.total_volume}
                  secondVal={coin.market_cap}
                  trend={setTrend(coin)}
                />
              </div>
              <div className="w-[200px]">
                <Trends
                  firstVal={coin.circulating_supply}
                  secondVal={coin.total_supply}
                  trend={setTrend(coin)}
                />
              </div>
              <div className="w-[150px] h-16">
                <Sparkline
                  Chartdata={coin.sparkline_in_7d.price}
                  trend={
                    coin.price_change_percentage_7d_in_currency < 0
                      ? "down"
                      : ""
                  }
                />
              </div>
            </div>
          </div>

          {/* Mobile Card Layout - Hidden on desktop */}
          <div
            className={`lg:hidden bg-white dark:bg-accent-bg mb-1 rounded 
            cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors p-4`}
            onClick={() => {
              viewCoin(coin?.id);
            }}
          >
            {/* Header Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  #{index + 1}
                </span>
                <Image
                  src={coin.image || ""}
                  width={32}
                  height={32}
                  alt="coin image"
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-base">{coin.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm uppercase">
                    {coin.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">
                  {selectedCurrency.sym}
                  {coin.current_price}
                </p>
                <TrendLabel
                  value={coin?.price_change_percentage_24h_in_currency}
                  percentage={true}
                />
              </div>
            </div>

            {/* Price Changes Row */}
            <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-gray-500 dark:text-gray-400 text-xs">1h</p>
                <TrendLabel
                  value={coin?.price_change_percentage_1h_in_currency}
                  percentage={true}
                />
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-gray-500 dark:text-gray-400 text-xs">24h</p>
                <TrendLabel
                  value={coin?.price_change_percentage_24h_in_currency}
                  percentage={true}
                />
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-gray-500 dark:text-gray-400 text-xs">7d</p>
                <TrendLabel
                  value={coin?.price_change_percentage_7d_in_currency}
                  percentage={true}
                />
              </div>
            </div>

            {/* Chart Row */}
            <div className="h-12 mb-2">
              <Sparkline
                Chartdata={coin.sparkline_in_7d.price}
                trend={
                  coin.price_change_percentage_7d_in_currency < 0 ? "down" : ""
                }
              />
            </div>

            {/* Market Stats Row */}
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Market Cap:</span>
                <span>
                  {selectedCurrency.sym}
                  {coin.market_cap?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Volume (24h):</span>
                <span>
                  {selectedCurrency.sym}
                  {coin.total_volume?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
