import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { Wrapper } from "../styled";
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
        <div className="border-b border-t border-gray-400 mt-2 text-sm">
          <Wrapper className="flex justify-between text-center">
            <div>
              <FontAwesomeIcon icon={faCoins} />
              <span> Coins {data?.active_cryptocurrencies}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faClone} />
              <span> Exchange</span>
            </div>
            <div>
              {selectedCurrency.sym}
              {formatMoney(data?.total_market_cap[currencyName])}
            </div>

            <div>
              {selectedCurrency.sym}
              {formatMoney(data?.total_volume[currencyName])}
            </div>
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
                width="50px"
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
                width="50px"
                fg="#537FEF"
                customBg="#666"
              />
            </div>
          </Wrapper>
        </div>
      )}
    </>
  );
};
