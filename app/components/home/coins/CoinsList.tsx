import axios from "axios";
import React, { useEffect } from "react";
import { Section } from "../../globalStyled/styled";
import { Wrapper, Item } from "../styled";

const CoinsTableHead = () => {
  return (
    <Wrapper className=" ">
      <Item>#</Item>
      <Item>Name</Item>
      <Item>Price</Item>
      <Item>1h</Item>
      <Item>24h</Item>
      <Item>7d</Item>
      <Item>24h Vol/Market Cap</Item>
      <Item>Circulating/Total sup</Item>
      <Item>Last 7d</Item>
    </Wrapper>
  );
};

export const CoinsList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        console.log(data[1]);
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
      <Section $margin={"1rem 0 0 0"}>CoinsList</Section>
    </>
  );
};
