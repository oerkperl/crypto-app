import React from "react";
import { Wrapper, Item, CoinItem } from "../styled";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { CoinsListChart } from "@/app/lib/utils/components/Graphs";
import { useCryptoContext } from "@/app/context/context";
import { formatMoney } from "@/app/lib/utils/formatters";

export const CoinEntry: React.FC<{ coin: any; index: number }> = ({
  coin,
  index,
}) => {
  const { selectedCurrency } = useCryptoContext();

  return (
    <Wrapper className="flex border-b border-gray-300">
      <Item className="flex">
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
            ? "text-pink-500"
            : "text-green-500"
        }
      >
        {coin.price_change_percentage_1h_in_currency.toFixed(2) + "%"}
      </CoinItem>
      <CoinItem
        className={
          coin.price_change_percentage_24h_in_currency < 0
            ? "text-pink-500"
            : "text-green-500"
        }
      >
        {coin.price_change_percentage_24h_in_currency.toFixed(2) + "%"}
      </CoinItem>
      <CoinItem
        className={
          coin.price_change_percentage_7d_in_currency < 0
            ? "text-pink-500"
            : "text-green-500"
        }
      >
        {coin.price_change_percentage_7d_in_currency.toFixed(2) + "%"}
      </CoinItem>
      <Item className="p-2">
        <div className="flex justify-between ">
          <span>
            {selectedCurrency.sym}
            {formatMoney(Math.round(coin.total_volume))}
          </span>
          <span>
            {selectedCurrency.sym}
            {formatMoney(Math.round(coin.market_cap))}
          </span>
        </div>
        <div>
          <ProgressBar
            progress={coin.market_cap_change_percentage_24h}
            width=""
          />
        </div>
      </Item>
      <Item className="p-2">
        <div className="flex justify-between">
          <span>{formatMoney(Math.round(coin.circulating_supply))}</span>
          <span>{formatMoney(Math.round(coin.total_supply))}</span>
        </div>
        <div>
          <ProgressBar progress="80" width="" />
        </div>
      </Item>
      <Item className="p-1 h-12">
        <CoinsListChart Chartdata={coin.sparkline_in_7d.price} />
      </Item>
    </Wrapper>
  );
};
