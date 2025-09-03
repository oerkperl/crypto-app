import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { LinksList } from "./LinksList";
import { LoadinSingleCoin } from "./LoadinSingleCoin";
import { CoinProfileCard } from "./CoinProfileCard";
import { CoinPriceCard } from "./CoinPriceCard";
import { CoinStatsCard } from "./CoinStatsCard";
import { useCurrencyStore, useUIStore } from "../../store";
import { PriceChart } from "./PriceChart";
import { OtherCoins } from "../portfolio/OtherCoins";
import { TrendLabel } from "../TrendLable";
import { Sparkline } from "../home/coinsList/Sparkline";
import { ChartConverter } from "../shared/ChartConverter";
import { LoadingSpinner } from "@/lib/utils/components/Spinner";

export const Coin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coin, setCoin] = useState<any>({});
  const searchParams = useSearchParams();

  // Get coin ID from URL parameter first, fallback to store state
  const urlCoinId = searchParams.get("id");
  const storeCoinId = useUIStore((state) => state.viewingCoinId);
  const currentCoinId = urlCoinId || storeCoinId;

  // ✅ Zustand: Selective subscriptions to only needed state
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const setCanVisit = useUIStore((state) => state.setCanVisit);
  const setQuery = useUIStore((state) => state.setQuery);
  const setViewingCoinId = useUIStore((state) => state.setViewingCoinId);

  const hasId = !!currentCoinId;
  const url = `https://api.coingecko.com/api/v3/coins/${currentCoinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`;
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
        // Update store state to keep it in sync
        if (urlCoinId) {
          setViewingCoinId(urlCoinId);
        }
      }
      setCanVisit(false);
    } catch (err) {
      console.error("Failed to fetch coin data:", err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (hasId) {
      fetchCoin();
    }
  }, [currentCoinId]); // Changed dependency to currentCoinId

  return (
    <main className="w-full max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2 sm:px-4 lg:px-6">
      {isLoading && (
        <div className="min-h-[50vh] flex items-center justify-center">
          <LoadingSpinner message="Loading coin data..." size="lg" />
        </div>
      )}
      {!isLoading && (
        <section>
          <h1 className="text-lg sm:text-xl mt-1 px-4 py-2 rounded bg-white dark:bg-accent-bg">
            {coin?.name} Summary:
          </h1>
          <div className="flex flex-col gap-2 mt-2">
            {/* 4-Card Grid: 2x2 on mobile, 1x4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {/* Card 1: Profile Card */}
              <div className="h-full">
                <CoinProfileCard coin={coin} />
              </div>

              {/* Card 2: Current Price Card */}
              <div className="h-full px-4 py-4 bg-white dark:bg-accent-bg rounded-md shadow-md">
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Current Price
                    </h2>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {coin?.market_data?.current_price && (
                        <>
                          {selectedCurrency.sym}
                          {coin.market_data.current_price[
                            selectedCurrency.name
                          ]?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 7,
                          })}
                        </>
                      )}
                    </h1>
                    <div>
                      {coin?.market_data
                        ?.price_change_percentage_24h_in_currency && (
                        <TrendLabel
                          value={
                            coin.market_data
                              .price_change_percentage_24h_in_currency[
                              selectedCurrency.name
                            ]
                          }
                          percentage={true}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-full h-12">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-12">
                        <div className="w-4 h-4 border-2 border-gray-200 border-t-indigo-600 rounded-full animate-spin dark:border-gray-700 dark:border-t-indigo-400" />
                      </div>
                    ) : coin?.market_data?.sparkline_7d?.price ? (
                      <Sparkline
                        Chartdata={coin.market_data.sparkline_7d.price}
                        trend={
                          coin.market_data
                            .price_change_percentage_7d_in_currency?.[
                            selectedCurrency.name
                          ] < 0
                            ? "down"
                            : ""
                        }
                      />
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Cards 3 & 4: ATH and ATL Cards */}
              <CoinPriceCard marketData={coin?.market_data} />
            </div>
          </div>

          <div className="rounded my-2">
            <CoinStatsCard
              statsData={coin?.market_data}
              coinSymbol={coin.symbol}
            />
          </div>

          <ChartConverter
            coinId={currentCoinId}
            baseCoin={baseCoin}
            showConverter={true}
          />
          <div className="w-full mt-2 px-4 py-2 bg-white dark:bg-accent-bg rounded">
            <h1 className="text-lg sm:text-xl mb-2">
              About {coin?.name}
              {`(${coin?.symbol?.toUpperCase()})`}
            </h1>
            <div
              className="overflow-auto text-justify text-sm sm:text-base leading-relaxed pr-2"
              dangerouslySetInnerHTML={{
                __html:
                  coin?.description?.en === ""
                    ? "No description for this coin"
                    : coin?.description?.en,
              }}
            />
          </div>

          <LinksList links={coin?.links?.blockchain_site} />

          <hr className="border-gray-300 dark:border-gray-700 my-2" />

          <div className="w-full bg-gray-100 dark:bg-transparent rounded">
            <OtherCoins />
          </div>
        </section>
      )}
    </main>
  );
};
