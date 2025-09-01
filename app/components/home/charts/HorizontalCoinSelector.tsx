"use client";
import React from "react";
import { useCryptoContext } from "@/app/context/context";
import { SingleCoin } from "../../SingleCoin";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

interface HorizontalCoinSelectorProps {
  coins: any[];
}

export const HorizontalCoinSelector: React.FC<HorizontalCoinSelectorProps> = ({
  coins,
}) => {
  const { setCurrentChart, currentChart } = useCryptoContext();

  const handleChartChange = (obj: any) => {
    setCurrentChart(obj);
  };

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
      {coins.length > 0 ? (
        coins.map((coin) => (
          <button
            key={coin.id}
            onClick={() => handleChartChange(coin)}
            className="flex-shrink-0"
          >
            <div
              className={`hover:bg-indigo-600 shadow-sm hover:text-white border border-gray-300 dark:border-indigo-700 
              text-xs py-3 px-4 rounded-md flex items-center gap-2 transition-colors min-h-[44px] min-w-[200px] ${
                currentChart?.id === coin?.id
                  ? "bg-indigo-700 text-white"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <SingleCoin coin={coin} />
            </div>
          </button>
        ))
      ) : (
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <BlinkingGradientLoader height="44px" width="200px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
