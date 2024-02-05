import React, { useEffect } from "react";
import { Section, SpinnerContainer } from "../../styled";
import { Wrapper, Item, CoinItem } from "../styled";
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
      <Wrapper className="flex">
        <Item>
          <span># </span>
          <span>Name</span>
        </Item>
        <CoinItem $width="150px">Price</CoinItem>
        <CoinItem>1h</CoinItem>
        <CoinItem>24h</CoinItem>
        <CoinItem>7d</CoinItem>
        <Item className="p-1">24h Vol / Market Cap</Item>
        <Item className="p-1">Circulating spy / Total spy</Item>
        <Item className="p-1">Last 7d</Item>
      </Wrapper>
    </>
  );
};

export const CoinsList = () => {
  const dispatch = useAppDispatch();
  let coins = removeDuplicates(useSelector(getCoins), "id");
  const coinsStatus = useSelector(getStatus);
  const { selectedCurrency } = useCryptoContext();
  const page = useSelector(getPage);
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.name.toString()}&order=market_cap_desc&per_page=100&page=${page.toString()}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

  useEffect(() => {
    dispatch(fetchCryptoData(apiUrl));
  }, [selectedCurrency]);

  const handleLoadMore = () => {
    if (coinsStatus === "idle") {
      dispatch(fetchCryptoData(apiUrl));
    }
  };

  return (
    <>
      <Section className="mt-4">
        <div>
          <CoinsTableHead />
        </div>
      </Section>
      <Section>
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
            <h3>"Error: Unable fetch data"</h3>
            <p>Wait a moment please and refresh</p>
            <button
              className="border border-solid border-gray-500 p-2 mt-2 mb-2 hover:bg-indigo-600 hover:text-white"
              onClick={() => dispatch(fetchCryptoData(apiUrl))}
            >
              Try again
            </button>
          </div>
        )}
      </Section>
    </>
  );
};
