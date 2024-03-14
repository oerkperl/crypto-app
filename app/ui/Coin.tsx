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
  const { viewingCoinId, setCanVisit, setQuery, selectedCurrency } =
    useCryptoContext();
  const hasId = viewingCoinId !== "" || viewingCoinId !== undefined;
  const url = `https://api.coingecko.com/api/v3/coins/${viewingCoinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`;
  let baseCoin = {
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
          <h1 className="text-xl mt-4">Your Summary:</h1>
          <div className="flex flex-col gap-2 mt-4">
            <div className="min-h-16 flex ">
              <CoinProfileCard coin={coin} />
              <CoinPriceCard marketData={coin?.market_data} />
            </div>
            <div className="w-full min-h-16  flex gap-2">
              <div className="w-1/2">
                <CoinStatsCard
                  statsData={coin?.market_data}
                  coinSymbol={coin.symbol}
                />
              </div>
              <div className="w-1/2 ">
                <PriceChart coinId={coin?.id} />
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
          <div className="flex gap-2 mt-4 mb-2">
            <div className=" w-4/6 flex">
              <Converter baseCoin={baseCoin} />
            </div>
            <div className=" w-2/6 border p-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent rounded-xl h-94">
              <div className=" max-h-40 overflow-auto pr-1 ">
                <LinksList links={coin?.links?.blockchain_site} />
              </div>
            </div>
          </div>

          <div className="w-full my-2">
            <h1>Other Coins:</h1>
            <OtherCoins />
          </div>
        </Section>
      )}
    </Main>
  );
};
