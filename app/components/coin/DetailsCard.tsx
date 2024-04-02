import React from "react";
import { useCryptoContext } from "@/app/context/context";
import { TrendLabel } from "../TrendLable";

export const DetailsCard: React.FC<{ details: any }> = ({ details }) => {
  const { selectedCurrency } = useCryptoContext();
  const symbol = selectedCurrency.sym;
  return (
    <div className="w-1/3 bg-white dark:bg-accent-bg rounded-md p-2 flex shadow-md">
      <div className="flex flex-col text-sm w-full">
        <div className="flex justify-between">
          <p>{details.title}</p>
          <p>{symbol + details.amount.toFixed(8)}</p>
        </div>
        <div className="flex justify-between">
          <TrendLabel value={details.percentage} percentage={true} />
          <p>{details.date}</p>
        </div>
      </div>
    </div>
  );
};
