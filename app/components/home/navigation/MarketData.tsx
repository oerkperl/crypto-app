import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { useCurrencyStore } from "@/app/store/currencyStore";
import { getCoinById } from "../coinsList/coinsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { formatMoney } from "@/app/lib/utils/formatters";
import { LoadingMarketData } from "./LoadingMarketData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-solid-svg-icons";

export const MarketData = () => {
  const [marketData, setMarketData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const currencyName = selectedCurrency?.name;
  const { data } = marketData;
  const bitcoin = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );
  const ethereum = useSelector((state: RootState) =>
    getCoinById(state, "ethereum")
  );
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
        <div className="text-xs">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center py-2 text-center gap-2 sm:gap-0">
            {/* Mobile: Show only essential info */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-10 text-xs">
              <div className="hidden sm:flex items-center gap-1">
                <FontAwesomeIcon icon={faCoins} />
                <span>Coins: </span>
                <span className="dark:text-white">
                  {data?.active_cryptocurrencies}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <FontAwesomeIcon icon={faClone} />
                <span>Exchange:</span>
                <span className="dark:text-white"> {data?.markets}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Market Cap: </span>
                <span className="dark:text-white font-medium">
                  {selectedCurrency.sym +
                    formatMoney(data?.total_market_cap[currencyName])}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span>24h Vol: </span>
                <span className="dark:text-white font-medium">
                  {selectedCurrency.sym +
                    formatMoney(data?.total_volume[currencyName])}
                </span>
              </div>
            </div>

            {/* Dominance indicators - responsive layout */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1">
                {bitcoin?.image && (
                  <Image
                    src={bitcoin?.image}
                    width={20}
                    height={20}
                    className="sm:w-[25px] sm:h-[25px]"
                    alt="bitcoin image"
                  />
                )}
                <span className="text-xs">{btc_mc_percentage}%</span>
                <ProgressBar
                  progress={btc_mc_percentage.toString()}
                  width="60px"
                  fg="#FE921A"
                  customBg="#666"
                />
              </div>
              <div className="flex items-center gap-1">
                {ethereum?.image && (
                  <Image
                    src={ethereum?.image}
                    width={20}
                    height={20}
                    className="sm:w-[25px] sm:h-[25px]"
                    alt="ethereum image"
                  />
                )}
                <span className="text-xs">{eth_mc_percentage}%</span>
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
      )}
    </>
  );
};
