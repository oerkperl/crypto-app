import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { useCryptoContext } from "@/app/context/context";
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
  const { selectedCurrency } = useCryptoContext();
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
        <div className=" text-xs">
          <div className="flex justify-between items-center py-2 text-center">
            <div className="flex gap-10">
              <div>
                <FontAwesomeIcon icon={faCoins} />
                <span> Coins: </span>
                <span className="dark:text-white">
                  {data?.active_cryptocurrencies}
                </span>
              </div>
              <div>
                <FontAwesomeIcon icon={faClone} />
                <span> Exchange:</span>
                <span className="dark:text-white"> {data?.markets}</span>
              </div>
              <div>
                <span>Market Cap: </span>
                <span className="dark:text-white">
                  {selectedCurrency.sym +
                    formatMoney(data?.total_market_cap[currencyName])}
                </span>
              </div>

              <div>
                <span>24h Volume: </span>
                <span className="dark:text-white">
                  {selectedCurrency.sym +
                    formatMoney(data?.total_volume[currencyName])}
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center gap-1">
                {bitcoin?.image && (
                  <Image
                    src={bitcoin?.image}
                    width={25}
                    height={25}
                    alt="bitcoin image"
                  />
                )}
                {btc_mc_percentage + "%"}
                <ProgressBar
                  progress={btc_mc_percentage.toString()}
                  width="100px"
                  fg="#FE921A"
                  customBg="#666"
                />
              </div>
              <div className="flex items-center gap-1">
                {ethereum?.image && (
                  <Image
                    src={ethereum?.image}
                    width={25}
                    height={25}
                    alt="etherium image"
                  />
                )}
                {eth_mc_percentage + "%"}
                <ProgressBar
                  progress={eth_mc_percentage.toString()}
                  width="100px"
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
