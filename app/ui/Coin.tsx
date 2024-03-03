import React, { useEffect, useState } from "react";
import axios from "axios";
import { Main, Section } from "../components/styled";
import { LinksList } from "../components/coin/LinksList";
import { LoadinSingleCoin } from "../components/coin/LoadinSingleCoin";
import { CoinProfileCard } from "../components/coin/CoinProfileCard";
import { CoinPriceCard } from "../components/coin/CoinPriceCard";
import { CoinStatsCard } from "../components/coin/CoinStatsCard";
import { useCryptoContext } from "../context/context";

export const Coin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coin, setCoin] = useState<any>({});
  const { viewingCoinId, setCanVisit } = useCryptoContext();
  const hasId = viewingCoinId !== "" || viewingCoinId !== undefined;
  const url = `https://api.coingecko.com/api/v3/coins/${viewingCoinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;

  const fetchCoin = async () => {
    try {
      const { data } = await axios(url);
      if (data) {
        setCoin(data);
        setIsLoading(false);
      }
      setCanVisit(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (hasId) {
      fetchCoin();
    }
  }, [viewingCoinId, fetchCoin, hasId]);

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
          <div className="flex justiify-between gap-2 mt-4">
            <div className="w-2/6  min-h-16 ">
              <CoinProfileCard coin={coin} />
            </div>
            <div className="w-2/6  min-h-16 ">
              <CoinPriceCard marketData={coin?.market_data} />
            </div>
            <div className="w-2/6  min-h-16">
              <CoinStatsCard
                statsData={coin?.market_data}
                coinSymbol={coin.symbol}
              />
            </div>
          </div>
          <div className="flex mt-4 justify-between  max-h-72 gap-2 min-w-[1000px]">
            <div className=" w-1/2">
              <h1 className="text-xl ">Description:</h1>
              <div className="h-64 bg-white dark:bg-gray-800 rounded-xl px-4 py-2 overflow-auto mt-2 text-sm">
                {coin?.description?.en === ""
                  ? "No description for this coin"
                  : coin?.description?.en}
              </div>
            </div>
            <div className=" w-1/2 h-full">
              <h1 className="text-xl">Blockchain Links:</h1>
              <div className=" h-64  overflow-auto rounded-xl p-2 mt-2 mb-2 bg-white dark:bg-gray-800">
                <LinksList links={coin?.links?.blockchain_site} />
              </div>
            </div>
          </div>
        </Section>
      )}
    </Main>
  );
};
