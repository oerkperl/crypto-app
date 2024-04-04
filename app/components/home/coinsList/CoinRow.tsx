import React from "react";
import Image from "next/image";
import { Wrapper, Item, CoinItem } from "../styled";
import { useCryptoContext } from "@/app/context/context";
import { Sparkline } from "./Sparkline";
import { Trends } from "./Trends";
import { TrendLabel } from "../../TrendLable";

export const CoinRow: React.FC<{ coins: any[] }> = ({ coins }) => {
  const { selectedCurrency, viewCoin } = useCryptoContext();

  const setTrend = (coin: any): boolean => {
    const trend = coin.price_change_percentage_1h_in_currency < 0;
    return trend;
  };

  return (
    <div className="">
      {coins.map((coin, index) => (
        <Wrapper
          key={coin?.id}
          className={`flex  bg-white dark:bg-transparent border-b border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-indigo-600 hover:text-white`}
          onClick={() => {
            viewCoin(coin?.id);
          }}
        >
          <CoinItem $width="235px" className="flex ml-1 items-center gap-1">
            <span> {index + 1 || "#"}</span>
            <Image
              src={coin.image || ""}
              width={25}
              height={25}
              alt="coin image"
            />{" "}
            <span>{coin.name}</span>
          </CoinItem>
          <CoinItem $width="150px">
            {selectedCurrency.sym}
            {coin.current_price}
          </CoinItem>
          <CoinItem>
            <TrendLabel
              value={coin?.price_change_percentage_1h_in_currency}
              percentage={true}
            />
          </CoinItem>
          <CoinItem>
            <TrendLabel
              value={coin?.price_change_percentage_24h_in_currency}
              percentage={true}
            />
          </CoinItem>
          <CoinItem>
            <TrendLabel
              value={coin?.price_change_percentage_7d_in_currency}
              percentage={true}
            />
          </CoinItem>
          <Item className="p-2">
            <Trends
              firstVal={coin.total_volume}
              secondVal={coin.market_cap}
              trend={setTrend(coin)}
            />
          </Item>
          <Item className="p-2">
            <Trends
              firstVal={coin.circulating_supply}
              secondVal={coin.total_supply}
              trend={setTrend(coin)}
            />
          </Item>
          <Item className="max-w-full p-1 h-12">
            <Sparkline
              Chartdata={coin.sparkline_in_7d.price}
              trend={
                coin.price_change_percentage_7d_in_currency < 0 ? "down" : ""
              }
            />
          </Item>
        </Wrapper>
      ))}
    </div>
  );
};
