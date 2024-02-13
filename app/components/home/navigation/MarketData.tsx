import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { Wrapper, Item } from "../styled";
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
    } catch (err) {
      console.error(err);
    }
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
        <div className="border-b border-gray-500">
          <Wrapper className="flex justify-between text-center">
            <Item>
              <p className="text-xl">Logo</p>
            </Item>
            <Item>
              <FontAwesomeIcon icon={faCoins} />
              <span> Coins {data?.active_cryptocurrencies}</span>
            </Item>
            <Item>
              <FontAwesomeIcon icon={faClone} />
              <span> Exchange</span>
            </Item>
            <Item>
              {selectedCurrency.sym}
              {formatMoney(data?.total_market_cap[currencyName])}
            </Item>

            <Item>
              {selectedCurrency.sym}
              {formatMoney(data?.total_volume[currencyName])}
            </Item>
            <Item className="flex justify-center items-center">
              {bitcoin?.image && (
                <img src={bitcoin?.image} width={25} height={25} />
              )}
              {btc_mc_percentage + "%"}
              <ProgressBar
                progress={btc_mc_percentage.toString()}
                width="50px"
              />
            </Item>
            <Item className="flex items-center justify-center">
              {ethereum?.image && (
                <img src={ethereum?.image} width={25} height={25} />
              )}
              {eth_mc_percentage + "%"}
              <ProgressBar
                progress={eth_mc_percentage.toString()}
                width="50px"
              />
            </Item>
          </Wrapper>
        </div>
      )}
    </>
  );
};
