import React from "react";
import { useCurrencyStore } from "@/app/store/currencyStore";
import { TrendLabel } from "../TrendLable";

export const DetailsCard: React.FC<{ details: any }> = ({ details }) => {
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const symbol = selectedCurrency.sym;
  return (
    <div className="w-full bg-white dark:bg-accent-bg rounded-md p-4 flex shadow-md h-full">
      <div className="flex flex-col items-center justify-center h-full text-center w-full space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {details.title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {symbol}
            {details.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="space-y-2">
          <TrendLabel value={details.percentage} percentage={true} />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {details.date}
          </p>
        </div>
      </div>
    </div>
  );
};
