import React from "react";
import Image from "next/image";
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
        <div
          key={coin?.id}
          className={`flex bg-white dark:bg-transparent border-b border-gray-300 dark:border-gray-700 
          items-center cursor-pointer hover:bg-indigo-600 hover:text-white text-xs`}
          onClick={() => {
            viewCoin(coin?.id);
          }}
        >
          <div className="flex ml-1 items-center gap-1 w-[290px]">
            <span> {index + 1 || "#"}</span>
            <Image
              src={coin.image || ""}
              width={25}
              height={25}
              alt="coin image"
            />{" "}
            <span>{coin.name}</span>
          </div>
          <div className="w-[150px]">
            {selectedCurrency.sym}
            {coin.current_price}
          </div>
          <div className="w-[100px]">
            <TrendLabel
              value={coin?.price_change_percentage_1h_in_currency}
              percentage={true}
            />
          </div>
          <div className="w-[100px]">
            <TrendLabel
              value={coin?.price_change_percentage_24h_in_currency}
              percentage={true}
            />
          </div>
          <div className="w-[100px]">
            <TrendLabel
              value={coin?.price_change_percentage_7d_in_currency}
              percentage={true}
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[200px]">
              <Trends
                firstVal={coin.total_volume}
                secondVal={coin.market_cap}
                trend={setTrend(coin)}
              />
            </div>
            <div className="w-[200px]">
              <Trends
                firstVal={coin.circulating_supply}
                secondVal={coin.total_supply}
                trend={setTrend(coin)}
              />
            </div>
            <div className="w-[150px] h-16">
              <Sparkline
                Chartdata={coin.sparkline_in_7d.price}
                trend={
                  coin.price_change_percentage_7d_in_currency < 0 ? "down" : ""
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
