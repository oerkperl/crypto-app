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
          <h1 className="mt-4 text-xl ">Description:</h1>
          <div className="min-w-[1000px] mt-4 bg-white dark:bg-gray-800 rounded-xl px-4 py-2 max-h-52 overflow-auto text-sm">
            {coin?.description?.en === ""
              ? "No description for this coin"
              : coin?.description?.en}
          </div>
          <h1 className="mt-4 text-xl">Blockchain Links:</h1>
          <div className="max-h-64 overflow-auto mt-4 mb-4 pr-2 border-b border-gray-500">
            <LinksList links={coin?.links?.blockchain_site} />
          </div>
        </Section>
      )}
    </Main>
  );
};
