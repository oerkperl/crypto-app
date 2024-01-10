import React from "react";
import styled from "styled-components";
import { ProgressBar } from "@/app/utilities/components";

const marketDataExample = {
  active_coins: 7888,
  exchange: 622,
  total_market_cap: "$1.32T",
  tota_volume: "$42.00B",
  market_cap_change_percentage: "44%",
  market_cap_percentage: "21%",
};

const {
  active_coins,
  exchange,
  total_market_cap,
  tota_volume,
  market_cap_change_percentage,
  market_cap_percentage,
} = marketDataExample;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #888;
  border-bottom: 1px solid #888;
  padding: 0.5rem 0;
  color: #777;
`;

const Item = styled.div`
  display: flex;
  //justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
`;

export const MarketData = () => {
  return (
    <Wrapper className=" ">
      <Item>Coins {active_coins}</Item>
      <Item>Exchange {exchange}</Item>
      <Item>{total_market_cap}</Item>
      <Item>
        {tota_volume}
        <ProgressBar progress="100" width="50" />
      </Item>
      <Item>
        {market_cap_change_percentage}
        <ProgressBar progress="44%" width="50" />
      </Item>
      <Item>
        {market_cap_percentage}
        <ProgressBar progress="21%" width="50" />
      </Item>
    </Wrapper>
  );
};
