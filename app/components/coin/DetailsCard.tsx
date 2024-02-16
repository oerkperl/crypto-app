import React from "react";
import { useCryptoContext } from "@/app/context/context";

export const DetailsCard: React.FC<{ details: any }> = ({ details }) => {
  const { selectedCurrency } = useCryptoContext();
  const symbol = selectedCurrency.sym;
  return (
    <div className="w-1/2 pl-2 flex justify-center ">
      <div className="flex flex-col gap-1 text-sm">
        <p>{details.title}</p>
        <p>{symbol + details.amount.toFixed(8)}</p>
        <p>{details.percentage.toFixed(2) + "%"}</p>
        <p>{details.date}</p>
      </div>
    </div>
  );
};
