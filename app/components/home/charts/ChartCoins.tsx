import React from "react";
import styled from "styled-components";

const conisExample = [
  "Bitcoin (BTC)",
  "Etherium (ETH)",
  "Tether (USDT)",
  "Doge Coin (DGC)",
  "Binance Coin (BNB)",
  "Cardano (ADO)",
  "USD Coin (USDC)",
  "Wrapper Bitcoin (WBTC)",
  "Litcoin (LTC)",
];
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const Li = styled.li`
  text-align: center;
  border: 1px solid #444;
  color: #999;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
`;

export const ChartCoins = () => {
  return (
    <>
      <Ul>
        {conisExample.map((coin, index) => (
          <button key={index}>
            <Li className="hover:bg-indigo-600 hover:text-white">{coin}</Li>
          </button>
        ))}
      </Ul>
    </>
  );
};
