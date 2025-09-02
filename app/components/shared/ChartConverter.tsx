import React from "react";
import { PriceChart } from "../coin/PriceChart";
import { Converter } from "../home/converter/Converter";

interface ChartConverterProps {
  coinId?: string;
  baseCoin?: {
    image?: string;
    name?: string;
    current_price?: number;
  };
  showConverter?: boolean;
}

export const ChartConverter: React.FC<ChartConverterProps> = ({
  coinId,
  baseCoin,
  showConverter = true,
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-2 mt-2 min-h-16">
      <div className="w-full lg:w-3/5 bg-white dark:bg-accent-bg shadow-md rounded">
        {coinId && <PriceChart coinId={coinId} />}
      </div>
      {showConverter && baseCoin && (
        <div className="w-full lg:w-2/5 flex bg-white dark:bg-accent-bg shadow-md px-2 rounded">
          <Converter baseCoin={baseCoin} />
        </div>
      )}
    </div>
  );
};
