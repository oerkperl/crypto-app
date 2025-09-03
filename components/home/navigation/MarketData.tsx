import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { useCurrencyStore } from "@/store/currencyStore";
import { useCoinsStore } from "@/store";

import { LoadingMarketData } from "./LoadingMarketData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { ProgressBar } from "@/lib/utils/components/ProgressBar";
import { formatMoney } from "@/lib/utils/formatters";

export const MarketData = () => {
  const [marketData, setMarketData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const currencyName = selectedCurrency?.name;
  const { data } = marketData;

  // Use Zustand store instead of Redux
  const getCoinById = useCoinsStore((state) => state.getCoinById);
  const bitcoin = getCoinById("bitcoin");
  const ethereum = getCoinById("ethereum");
  const eth_mc_percentage = Math.round(data?.market_cap_percentage["eth"]);
  const btc_mc_percentage = Math.round(data?.market_cap_percentage["btc"]);

  const fetchMarketDat = async () => {
    try {
      const { data } = await axios("https://api.coingecko.com/api/v3/global");

      setMarketData(data);

      if (data) {
        setIsLoading(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMarketDat();
  }, [selectedCurrency]);

  return (
    <>
      {isLoading && (
        <div>
          <LoadingMarketData fetchMarketData={fetchMarketDat} />
        </div>
      )}

      {!isLoading && (
        <div className="text-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center py-2 text-center gap-2 sm:gap-0 min-w-0">
            {/* Mobile: Show only essential info */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-10 text-xs min-w-0">
              <div className="hidden sm:flex items-center gap-1 min-w-0">
                <FontAwesomeIcon icon={faCoins} />
                <span>Coins: </span>
                <span className="dark:text-white">
                  {data?.active_cryptocurrencies}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 min-w-0">
                <FontAwesomeIcon icon={faClone} />
                <span>Exchange:</span>
                <span className="dark:text-white"> {data?.markets}</span>
              </div>
              <div className="flex items-center gap-1 min-w-0">
                <span className="whitespace-nowrap">Market Cap: </span>
                <span className="dark:text-white font-medium truncate">
                  {selectedCurrency.sym +
                    formatMoney(data?.total_market_cap[currencyName])}
                </span>
              </div>

              <div className="flex items-center gap-1 min-w-0">
                <span className="whitespace-nowrap">24h Vol: </span>
                <span className="dark:text-white font-medium truncate">
                  {selectedCurrency.sym +
                    formatMoney(data?.total_volume[currencyName])}
                </span>
              </div>
            </div>

            {/* Dominance indicators - responsive layout */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 min-w-0">
              <div className="flex items-center gap-1 min-w-0">
                {bitcoin?.image && (
                  <Image
                    src={bitcoin?.image}
                    width={20}
                    height={20}
                    className="sm:w-[25px] sm:h-[25px] flex-shrink-0"
                    alt="bitcoin image"
                  />
                )}
                <span className="text-xs whitespace-nowrap">{btc_mc_percentage}%</span>
                <div className="min-w-0">
                  <ProgressBar
                    progress={btc_mc_percentage.toString()}
                    width="60px"
                    fg="#FE921A"
                    customBg="#666"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 min-w-0">
                {ethereum?.image && (
                  <Image
                    src={ethereum?.image}
                    width={20}
                    height={20}
                    className="sm:w-[25px] sm:h-[25px] flex-shrink-0"
                    alt="ethereum image"
                  />
                )}
                <span className="text-xs whitespace-nowrap">{eth_mc_percentage}%</span>
                <div className="min-w-0">
                  <ProgressBar
                    progress={eth_mc_percentage.toString()}
                    width="60px"
                    fg="#537FEF"
                    customBg="#666"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
