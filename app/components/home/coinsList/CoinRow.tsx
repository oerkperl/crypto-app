import React from "react";
import Link from "next/link";
import { Wrapper, Item, CoinItem } from "../styled";
import { useCryptoContext } from "@/app/context/context";
import { Sparkline } from "./Sparkline";
import { Trends } from "./Trends";
import { useTheme } from "next-themes";

export const CoinRow: React.FC<{ coins: any[] }> = ({ coins }) => {
  const { selectedCurrency } = useCryptoContext();
  const { theme } = useTheme();

  const setTrend = (coin: any): boolean => {
    const trend = coin.price_change_percentage_1h_in_currency < 0;
    return trend;
  };

  return (
    <div className="">
      {coins.map((coin, index) => (
        <Link key={coin?.id} href={`/coin?=${coin.id}`}>
          <Wrapper
            className={`flex mb-1 bg-white dark:bg-gray-800 hover:bg-indigo-900 hover:text-white`}
          >
            <Item className="flex px-1">
              {index + 1 || "#"}
              <img src={coin.image || ""} width={25} height={25} /> {coin.name}
            </Item>
            <CoinItem $width="150px">
              {selectedCurrency.sym}
              {coin.current_price}
            </CoinItem>
            <CoinItem
              className={
                coin.price_change_percentage_1h_in_currency < 0
                  ? "text-trend-pink"
                  : theme === "dark"
                  ? "text-accent-green"
                  : "text-trend-blue"
              }
            >
              {coin.price_change_percentage_1h_in_currency?.toFixed(2) + "%"}
            </CoinItem>
            <CoinItem
              className={
                coin?.price_change_percentage_24h_in_currency < 0
                  ? "text-trend-pink"
                  : theme === "dark"
                  ? "text-accent-green"
                  : "text-trend-blue"
              }
            >
              {coin?.price_change_percentage_24h_in_currency?.toFixed(2) + "%"}
            </CoinItem>
            <CoinItem
              className={
                coin.price_change_percentage_7d_in_currency < 0
                  ? "text-trend-pink"
                  : theme === "dark"
                  ? "text-accent-green"
                  : "text-trend-blue"
              }
            >
              {coin?.price_change_percentage_7d_in_currency?.toFixed(2) + "%"}
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
            <Item className="p-1 h-12">
              <Sparkline
                Chartdata={coin.sparkline_in_7d.price}
                trend={
                  coin.price_change_percentage_7d_in_currency < 0 ? "down" : ""
                }
              />
            </Item>
          </Wrapper>
        </Link>
      ))}
    </div>
  );
};
