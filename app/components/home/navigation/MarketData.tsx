import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { Wrapper, Item } from "../styled";
import { useCryptoContext } from "@/app/context/context";
import { getCoinById } from "../coins/coinsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { formatMoney } from "@/app/lib/utils/formatters";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const LoadingMarketData = () => {
  return (
    <>
      <div>
        <Wrapper className="flex justify-between text-center">
          <Item>
            <BlinkingGradientLoader width="100px" />
          </Item>
          <Item>
            <BlinkingGradientLoader width="70px" />
          </Item>
          <Item className="flex items-center">
            <BlinkingGradientLoader width="100px" />
          </Item>
          <Item className="flex items-center">
            <BlinkingGradientLoader width="130px" />
          </Item>
          <Item className="flex items-center">
            <BlinkingGradientLoader width="120px" />
          </Item>
        </Wrapper>
        <hr />
      </div>
    </>
  );
};

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

  useEffect(() => {
    setIsLoading(true);
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

    fetchMarketDat();
  }, [selectedCurrency]);

  return (
    <>
      {isLoading && (
        <div>
          <LoadingMarketData />
        </div>
      )}

      {!isLoading && (
        <div>
          <Wrapper className="flex justify-between text-center">
            <Item>Coins {data?.active_cryptocurrencies}</Item>

            <Item>
              {selectedCurrency.sym}
              {formatMoney(data?.total_market_cap[currencyName])}
            </Item>
            <Item className="flex items-center">
              {selectedCurrency.sym}
              {formatMoney(data?.total_volume[currencyName])}
              <ProgressBar progress="100" width="50" />
            </Item>
            <Item className="flex items-center">
              <img src={bitcoin ? bitcoin?.image : ""} width={25} height={25} />
              {btc_mc_percentage + "%"}
              <ProgressBar progress={btc_mc_percentage.toString()} width="50" />
            </Item>
            <Item className="flex items-center">
              <img
                src={ethereum ? ethereum?.image : ""}
                width={25}
                height={25}
              />
              {eth_mc_percentage + "%"}
              <ProgressBar progress={eth_mc_percentage.toString()} width="50" />
            </Item>
          </Wrapper>
          <hr />
        </div>
      )}
    </>
  );
};
