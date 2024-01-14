import axios from "axios";
import React, { useEffect, useState } from "react";
import { Section, SpinnerContainer } from "../../styled";
import { Wrapper, Item, CoinItem } from "../styled";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { LoadingCoin } from "./LoadingCoin";

const CoinsTableHead = () => {
  return (
    <Wrapper className="flex">
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

const CoinEntry: React.FC<{ coin: any; index: number }> = ({ coin, index }) => {
  return (
    <Wrapper className="flex border-b border-gray-300">
      <Item className="flex">
        {index + 1 || "#"}
        <img src={coin.image || ""} width={25} height={25} /> {coin.name}
      </Item>
      <CoinItem $width="150px">{coin.current_price}</CoinItem>
      <CoinItem>
        {coin.price_change_percentage_1h_in_currency.toFixed(2) + "%"}
      </CoinItem>
      <CoinItem>
        {coin.price_change_percentage_24h_in_currency.toFixed(2) + "%"}
      </CoinItem>
      <CoinItem>
        {coin.price_change_percentage_7d_in_currency.toFixed(2) + "%"}
      </CoinItem>
      <Item className="p-2">
        <div className="flex justify-between ">
          <span>24h V</span>
          <span>MC</span>
        </div>
        <div>
          <ProgressBar progress="50" width="" />
        </div>
      </Item>
      <Item className="p-2">
        <div className="flex justify-between">
          <span>Circ</span>
          <span>TS</span>
        </div>
        <div>
          <ProgressBar progress="80" width="" />
        </div>
      </Item>
      <Item className="p-1"></Item>
    </Wrapper>
  );
};

export const CoinsList = () => {
  const [coinsList, setCoinsList] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        setCoinsList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Section $margin={"1rem 0 0 0"}>
        <div>
          <CoinsTableHead />
          <hr className="color-gray-600" />
        </div>
      </Section>
      <Section>
        {coinsList.length === 0 && (
          <div className="relative">
            <SpinnerContainer />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <LoadingCoin />
              </div>
            ))}
          </div>
        )}
        {coinsList &&
          coinsList.map((coin, index) => (
            <CoinEntry key={coin?.id} coin={coin} index={index} />
          ))}
      </Section>
    </>
  );
};
