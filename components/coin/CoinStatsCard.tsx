import React from "react";
import { useCurrencyStore } from "@/store";
import { formatMoney } from "@/lib/utils/formatters";
import { StatRow } from "./StatRow";

export const CoinStatsCard: React.FC<{
  statsData: any;
  coinSymbol: string;
}> = ({ statsData, coinSymbol }) => {
  // ✅ Zustand: Only subscribes to selectedCurrency
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
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
      <div className="bg-white dark:bg-accent-bg rounded py-3 px-2 shadow-md">
        {/* Mobile: Grid Layout */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:hidden gap-4 lg:gap-2">
          <StatRow stat={symbol + formatMoney(marketCap)} title="Market Cap" />
          <StatRow
            stat={symbol + formatMoney(fullyDilutedVal)}
            title="Fully Diluted Valuation"
          />
          <StatRow stat={symbol + formatMoney(volume24hr)} title="Volume 24h" />
          <StatRow stat={volumeToMarket} title="Volume / Market" />
          <StatRow stat={totalVolume} title="Total Volume" />
          <StatRow stat={circulatingSupply} title="Circulating Supply" />
          <StatRow stat={maxSupply} title="Maximum supply" />
        </div> */}

        {/* Desktop: Original Flex Layout */}
        <div className="flex justify-between w-full overflow-x-auto space-x-4 lg:space-x-0 lg:justify-evenly scrollbar-hide">
          <StatRow stat={symbol + formatMoney(marketCap)} title="Market Cap" />
          <StatRow
            stat={symbol + formatMoney(fullyDilutedVal)}
            title="Fully Diluted Valuation"
          />
          <StatRow stat={symbol + formatMoney(volume24hr)} title="Volume 24h" />
          <StatRow stat={volumeToMarket} title="Volume / Market" />

          <StatRow stat={totalVolume} title="Total Volume" />
          <StatRow stat={circulatingSupply} title="Circulating Supply" />
          <StatRow stat={maxSupply} title="Maximum supply" />
        </div>
      </div>
    )
  );
};
