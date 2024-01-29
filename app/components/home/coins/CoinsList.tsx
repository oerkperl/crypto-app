import React, { useEffect } from "react";
import { Section, SpinnerContainer } from "../../styled";
import { Wrapper, Item, CoinItem } from "../styled";
import { LoadingCoin } from "./LoadingCoin";
import { useSelector } from "react-redux";
import { fetchCryptoData, getCoins, getStatus } from "./coinsSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { CoinEntry } from "./CoinEntry";
import { useCryptoContext } from "@/app/context/context";

const CoinsTableHead = () => {
  return (
    <Wrapper className="flex border-b border-gray-300">
      <Item>
        <span># </span>
        <span>Name</span>
      </Item>
      <CoinItem $width="150px">Price</CoinItem>
      <CoinItem>1h</CoinItem>
      <CoinItem>24h</CoinItem>
      <CoinItem>7d</CoinItem>
      <Item className="p-1">24h Vol/Market Cap</Item>
      <Item className="p-1">Circulating/Total sup</Item>
      <Item className="p-1">Last 7d</Item>
    </Wrapper>
  );
};

export const CoinsList = () => {
  const dispatch = useAppDispatch();
  const coins = useSelector(getCoins);
  const coinsStatus = useSelector(getStatus);
  const { selectedCurrency } = useCryptoContext();
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.name.toString()}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

  useEffect(() => {
    dispatch(fetchCryptoData(apiUrl));
  }, [selectedCurrency]);

  let content;
  if (coinsStatus === "loading") {
    content = (
      <div className="relative">
        <SpinnerContainer />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <LoadingCoin />
          </div>
        ))}
      </div>
    );
  } else if (coinsStatus === "succeeded") {
    content = coins.map((coin, index) => (
      <CoinEntry key={coin?.name} coin={coin} index={index} />
    ));
  } else if (coinsStatus === "failed") {
    content = (
      <div className="mt-4">
        <h3>"Error:Unable fetch data"</h3>
        <p>Wait a moment please and refresh</p>
        <button
          className="border border-solid border-gray-500 p-2 mt-4"
          onClick={() => dispatch(fetchCryptoData(apiUrl))}
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <>
      <Section $margin={"1rem 0 0 0"}>
        <div>
          <CoinsTableHead />
        </div>
      </Section>
      <Section>{content}</Section>
    </>
  );
};
