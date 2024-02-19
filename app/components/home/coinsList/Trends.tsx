import React from "react";
import { formatMoney } from "@/app/lib/utils/formatters";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { useCryptoContext } from "@/app/context/context";

export const Trends: React.FC<{
  firstVal: number;
  secondVal: number;
  trend?: boolean;
}> = ({ firstVal, secondVal, trend }) => {
  const percenatge = (firstVal / secondVal) * 100;
  const { selectedCurrency } = useCryptoContext();
  return (
    <div>
      <div className="flex justify-between">
        <span>
          {selectedCurrency.sym}
          {formatMoney(Math.round(firstVal))}
        </span>
        <span>
          {selectedCurrency.sym}
          {formatMoney(Math.round(secondVal))}
        </span>
      </div>
      <div>
        <ProgressBar progress={percenatge.toString()} downTrend={trend} />
      </div>
    </div>
  );
};
