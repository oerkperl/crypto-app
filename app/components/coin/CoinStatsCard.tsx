import React from "react";
import { useCryptoContext } from "@/app/context/context";
import { formatMoney } from "@/app/lib/utils/formatters";
import { StatRow } from "./StatRow";

export const CoinStatsCard: React.FC<{
  statsData: any;
  coinSymbol: string;
}> = ({ statsData, coinSymbol }) => {
  const { selectedCurrency } = useCryptoContext();
  const currency = selectedCurrency.name;
  const symbol = selectedCurrency.sym;
  const hasData = statsData !== undefined;
  const circulatingSupply = `${statsData?.circulating_supply.toFixed()} ${coinSymbol?.toUpperCase()}`;
  const fullyDilutedVal = statsData?.fully_diluted_valuation[currency];
  const marketCap = statsData?.market_cap[currency];
  const marketCapChange =
    statsData?.market_cap_change_percentage_24h_in_currency[currency];
  const maxSupply = `${
    statsData?.max_supply || Infinity
  } ${coinSymbol?.toUpperCase()}`;
  const totalVolume = `${Math.round(
    statsData?.total_volume[currency] / statsData?.current_price[currency]
  )} ${coinSymbol?.toUpperCase()}`;
  const volume24hr = statsData?.total_volume[currency];
  const volumeToMarket =
    (statsData?.total_volume[currency] / statsData?.market_cap[currency] || "")
      .toString()
      .slice(0, 8) + "...";

  return (
    hasData && (
      <div className="bg-white dark:bg-accent-bg rounded-lg py-2 shadow-md">
        <div className="flex justify-between w-full">
          <StatRow stat={symbol + formatMoney(marketCap)} title="Market Cap" />
          <StatRow
            stat={symbol + formatMoney(fullyDilutedVal)}
            title="Fully Diluted Valuation"
          />
          <StatRow stat={symbol + formatMoney(volume24hr)} title="Volume 24h" />
          <StatRow stat={volumeToMarket} title="Volume / Market" />
          <div className="h-full border-l border-gray-300 dark:border-gray-700"></div>
          <StatRow stat={totalVolume} title="Total Volume" />
          <StatRow stat={circulatingSupply} title="Circulating Supply" />
          <StatRow stat={maxSupply} title="Maximum supply" />
        </div>
      </div>
    )
  );
};
