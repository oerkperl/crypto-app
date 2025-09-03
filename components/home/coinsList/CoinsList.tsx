import React from "react";
import { SpinnerContainer } from "../../styled";
import { LoadingCoin } from "./LoadingCoin";
import { CoinRow } from "./CoinRow";
import { useCurrencyStore, useCoinsStore } from "@/store";

const CoinsTableHead = () => {
  return (
    <>
      {/* Desktop Table Header - Hidden on mobile */}
      <div className="hidden lg:flex bg-white text-sm items-center py-2 dark:bg-accent-bg shadow-md mb-2">
        <div className="pl-2 w-[290px]">
          <span># </span>
          <span>Name</span>
        </div>
        <div className="w-[150px]">Price</div>
        <div className="w-[100px]">1h</div>
        <div className="w-[100px]">24h</div>
        <div className="w-[100px]">7d</div>
        <div className="flex gap-2">
          <div className="w-[200px]">24h Vol / Market Cap</div>
          <div className="w-[200px]">Circulating spy / Total spy</div>
          <div className="w-[150px]">Last 7d</div>
        </div>
      </div>

      {/* Mobile Header - Simple title */}
      <div className="lg:hidden bg-white dark:bg-accent-bg shadow-md py-3 px-4">
        <h2 className="text-lg font-semibold">Cryptocurrencies</h2>
      </div>
    </>
  );
};

export const CoinsList = () => {
  // ✅ Zustand: Use coins store instead of Redux
  const coins = useCoinsStore((state) => state.coins);
  const coinsStatus = useCoinsStore((state) => state.status);
  const page = useCoinsStore((state) => state.page);
  const fetchCoins = useCoinsStore((state) => state.fetchCoins);
  const incrementPage = useCoinsStore((state) => state.incrementPage);

  // ✅ Zustand: Only subscribes to selectedCurrency
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);

  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.name.toString()}&order=market_cap_desc&per_page=250&page=${page.toString()}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

  const handleLoadMore = async () => {
    if (coinsStatus === "idle") {
      incrementPage();
      const nextPageUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.name.toString()}&order=market_cap_desc&per_page=250&page=${
        page + 1
      }&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
      await fetchCoins(nextPageUrl);
    }
  };

  return (
    <>
      <section className="mt-2 sticky top-16 sm:top-20 z-5">
        <div>
          <CoinsTableHead />
        </div>
      </section>
      <section>
        <CoinRow coins={coins} />

        {coinsStatus === "idle" && (
          <div className="flex justify-center py-4">
            <button
              className="border border-solid border-gray-500 px-6 py-3 sm:px-4 sm:py-2 mt-2 mb-2 rounded-md hover:bg-indigo-600 hover:text-white transition-colors min-h-[44px] sm:min-h-auto"
              onClick={handleLoadMore}
            >
              {coins.length === 0 ? "Reload" : "Load more..."}
            </button>
          </div>
        )}

        {coinsStatus === "loading" && (
          <div className="relative">
            <SpinnerContainer />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <LoadingCoin />
              </div>
            ))}
          </div>
        )}

        {coinsStatus === "failed" && (
          <div className="mt-4 text-center px-4">
            <h3 className="text-lg mb-2">Error: Unable to fetch data</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wait a moment please and refresh
            </p>
            <button
              className="border border-solid border-gray-500 px-6 py-3 sm:px-4 sm:py-2 mt-2 mb-2 rounded-md hover:bg-indigo-600 hover:text-white transition-colors min-h-[44px] sm:min-h-auto"
              onClick={() => fetchCoins(apiUrl)}
            >
              Try again
            </button>
          </div>
        )}
      </section>
    </>
  );
};
