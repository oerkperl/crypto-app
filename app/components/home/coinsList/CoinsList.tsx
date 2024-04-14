import React from "react";
import { SpinnerContainer } from "../../styled";
import { LoadingCoin } from "./LoadingCoin";
import { useSelector } from "react-redux";
import { fetchCryptoData, getCoins, getStatus, getPage } from "./coinsSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { CoinRow } from "./CoinRow";
import { useCryptoContext } from "@/app/context/context";
import { removeDuplicates } from "@/app/lib/utils/formatters";
const CoinsTableHead = () => {
  return (
    <>
      <div className="flex bg-white text-sm items-center py-2 dark:bg-accent-bg shadow-md">
        <div className="pl-2 w-[290px]">
          <span># </span>
          <span>Name</span>
        </div>
        <div className="w-[150px]">Price</div>
        <div className="w-[100px]">1h</div>
        <div className="w-[100px]">24h</div>
        <div className="w-[100px]">7d</div>
        <div className=" flex gap-2">
          <div className="w-[200px]">24h Vol / Market Cap</div>
          <div className="w-[200px]">Circulating spy / Total spy</div>
          <div className="w-[150px]">Last 7d</div>
        </div>
      </div>
    </>
  );
};

export const CoinsList = () => {
  const dispatch = useAppDispatch();
  let coins = removeDuplicates(useSelector(getCoins), "id");
  const coinsStatus = useSelector(getStatus);
  const { selectedCurrency } = useCryptoContext();
  const page = useSelector(getPage);
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.name.toString()}&order=market_cap_desc&per_page=250&page=${page.toString()}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
  const handleLoadMore = () => {
    if (coinsStatus === "idle") {
      dispatch(fetchCryptoData(apiUrl));
    }
  };

  return (
    <>
      <section className="mt-2 sticky top-20">
        <div>
          <CoinsTableHead />
        </div>
      </section>
      <section>
        <CoinRow coins={coins} />

        {coinsStatus === "idle" && (
          <div>
            <button
              className=" border border-solid border-gray-500 p-2 mt-2 mb-2 hover:bg-indigo-600 hover:text-white"
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
          <div className="mt-4">
            <h3>Error: Unable to fetch data</h3>
            <p>Wait a moment please and refresh</p>
            <button
              className="border border-solid border-gray-500 p-2 mt-2 mb-2 hover:bg-indigo-600 hover:text-white"
              onClick={() => dispatch(fetchCryptoData(apiUrl))}
            >
              Try again
            </button>
          </div>
        )}
      </section>
    </>
  );
};
