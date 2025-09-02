import React from "react";
import { useCurrencyStore } from "@/app/store";
import { formatDate } from "@/app/lib/utils/formatters";
import { DetailsCard } from "./DetailsCard";
import { TrendLabel } from "../TrendLable";
import { Sparkline } from "../home/coinsList/Sparkline";

export const CoinPriceCard: React.FC<{ marketData: any }> = ({
  marketData,
}) => {
  // ✅ Zustand: Only subscribes to selectedCurrency
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
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
        <>
          <DetailsCard details={athData} />
          <DetailsCard details={atlData} />
        </>
      )}
    </>
  );
};
