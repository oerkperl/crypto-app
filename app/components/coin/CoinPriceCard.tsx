import React from "react";
import { useCryptoContext } from "@/app/context/context";
import { formatDate } from "@/app/lib/utils/formatters";
import { DetailsCard } from "./DetailsCard";
import { TrendLabel } from "../TrendLable";
import { Sparkline } from "../home/coinsList/Sparkline";

export const CoinPriceCard: React.FC<{ marketData: any }> = ({
  marketData,
}) => {
  const { selectedCurrency } = useCryptoContext();
  const currency = selectedCurrency.name;
  const symbol = selectedCurrency.sym;
  const hasData = marketData !== undefined;

  const athData = {
    title: "All time high:",
    amount: marketData?.ath[currency],
    percentage: marketData?.ath_change_percentage[currency],
    date: formatDate(marketData?.ath_date[currency]),
  };

  const atlData = {
    title: "All time low:",
    amount: marketData?.atl[currency],
    percentage: marketData?.atl_change_percentage[currency],
    date: formatDate(marketData?.atl_date[currency]),
  };

  return (
    <>
      {hasData && (
        <div className="flex   w-full items-center gap-2">
          <div className=" w-1/3 border px-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent rounded-md flex">
            <div>
              <h1 className="text-xl">
                {symbol}
                {marketData?.current_price[currency].toFixed(7)}
              </h1>
              <TrendLabel
                value={
                  marketData?.price_change_percentage_24h_in_currency[currency]
                }
                percentage={true}
              />
            </div>
            <div className="w-1/3 h-10 my-auto ml-auto">
              <Sparkline
                Chartdata={marketData?.sparkline_7d.price}
                trend={
                  marketData?.price_change_percentage_7d_in_currency[
                    selectedCurrency.name
                  ] < 0
                    ? "down"
                    : ""
                }
              />
            </div>
          </div>
          <DetailsCard details={athData} />
          <DetailsCard details={atlData} />
        </div>
      )}
    </>
  );
};
