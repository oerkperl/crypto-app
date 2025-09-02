import React from "react";

import { useCurrencyStore } from "@/store/currencyStore";
import { ProgressBar } from "@/lib/utils/components/ProgressBar";
import { formatMoney } from "@/lib/utils/formatters";

export const Trends: React.FC<{
  firstVal: number;
  secondVal: number;
  trend?: boolean;
}> = ({ firstVal, secondVal, trend }) => {
  const percenatge = (firstVal / secondVal) * 100;
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
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
