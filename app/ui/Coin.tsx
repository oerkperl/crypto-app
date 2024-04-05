import React, { useEffect, useState } from "react";
import axios from "axios";
import { Main, Section } from "../components/styled";
import { LinksList } from "../components/coin/LinksList";
import { LoadinSingleCoin } from "../components/coin/LoadinSingleCoin";
import { CoinProfileCard } from "../components/coin/CoinProfileCard";
import { CoinPriceCard } from "../components/coin/CoinPriceCard";
import { CoinStatsCard } from "../components/coin/CoinStatsCard";
import { useCryptoContext } from "../context/context";
import { Converter } from "../components/home/converter/Converter";
import { PriceChart } from "../components/coin/PriceChart";
import { OtherCoins } from "../components/portfolio/OtherCoins";

export const Coin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coin, setCoin] = useState<any>({});
  const { viewingCoinId, selectedCurrency, setCanVisit, setQuery } =
    useCryptoContext();
  const hasId = !!viewingCoinId;
  const url = `https://api.coingecko.com/api/v3/coins/${viewingCoinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`;
  const baseCoin = {
    image: coin?.image?.small,
    name: coin?.name,
    current_price: coin?.market_data?.current_price[selectedCurrency.name],
  };
  const fetchCoin = async () => {
    try {
      const { data } = await axios(url);
      if (data) {
        setCoin(data);
        setIsLoading(false);
        setQuery("");
      }
      setCanVisit(false);
    } catch (err) {}
  };

  useEffect(() => {
    setIsLoading(true);
    if (hasId) {
      fetchCoin();
    }
  }, [viewingCoinId]);

  return (
    <Main>
      {isLoading && (
        <div>
          <LoadinSingleCoin reload={fetchCoin} />
        </div>
      )}
      {!isLoading && (
        <Section>
          <h1 className="text-xl mt-4">{coin?.name} Summary:</h1>
          <div className="flex flex-col gap-2 mt-2">
            <div className="min-h-16 flex ">
              <CoinProfileCard coin={coin} />
              <CoinPriceCard marketData={coin?.market_data} />
            </div>
            <div className=" rounded">
              <CoinStatsCard
                statsData={coin?.market_data}
                coinSymbol={coin.symbol}
              />
            </div>
            <div className="w-full flex gap-2 mt-2 min-h-16 ">
              <div className="w-3/5 bg-white dark:bg-accent-bg shadow-md rounded-xl">
                <PriceChart coinId={coin?.id} />
              </div>
              <div className=" w-2/5 flex bg-white dark:bg-accent-bg shadow-md px-2 rounded-xl">
                <Converter baseCoin={baseCoin} />
              </div>
            </div>
          </div>
          <div className=" w-full mt-4">
            <h1 className="text-xl">
              About {coin?.name}
              {`(${coin?.symbol?.toUpperCase()})`}
            </h1>
            <div
              className="overflow-auto text-justify text-sm pr-2"
              dangerouslySetInnerHTML={{
                __html:
                  coin?.description?.en === ""
                    ? "No description for this coin"
                    : coin?.description?.en,
              }}
            />
          </div>
          <div className="mt-4">
            <div className="bg-white dark:bg-accent-bg shadow-md rounded-xl h-94">
              <div className=" max-h-52 overflow-auto">
                <LinksList links={coin?.links?.blockchain_site} />
              </div>
            </div>
          </div>
          <hr className="border-gray-300 dark:border-gray-700 my-4" />

          <div className="w-full bg-gray-100 dark:bg-transparent rounded-lg">
            <OtherCoins />
          </div>
        </Section>
      )}
    </Main>
  );
};
