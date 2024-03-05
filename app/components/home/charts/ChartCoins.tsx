import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useCryptoContext } from "@/app/context/context";
import { SpinnerContainer } from "../../styled";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
import { TrendLabel } from "../../TrendLable";

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const Li = styled.li`
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

export const ChartCoins: React.FC<{ coins: any[] }> = ({ coins }) => {
  const { setCurrentChart, selectedCurrency } = useCryptoContext();
  const [searchValue, setSearchValue] = useState("");

  const handleChartChange = (obj: any) => {
    const { name, symbol, id, current_price, total_volume, image } = obj;
    setCurrentChart({ name, symbol, id, current_price, total_volume, image });
    setSearchValue("");
  };

  return (
    <div className="relative">
      <div className="w-full sticky top-0 z-10">
        <input
          className={`w-full  mb-2 p-2 rounded border text:xs`}
          placeholder="Search for a coin..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="">
        {coins.length > 0 ? (
          <Ul>
            {coins
              .filter((coin) => coin.name.toLowerCase().includes(searchValue))
              .map((coin) => (
                <button
                  key={coin.id}
                  onClick={() => {
                    handleChartChange(coin);
                  }}
                >
                  <Li
                    className={`hover:bg-indigo-600 hover:text-white text-sm bg-white dark:bg-gray-800 py-1 flex gap-1
                  `}
                  >
                    <div className=" w-1/4 flex items-center justify-center">
                      <Image
                        className=""
                        src={coin?.image}
                        height={30}
                        width={30}
                        alt="coin image"
                      />
                    </div>
                    <div className="">
                      <div className="">
                        <div className="flex items-center gap-1 ">
                          <label>{coin?.name}</label>
                          <label>{`(${coin?.symbol.toUpperCase()})`}</label>
                        </div>
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center gap-4 ">
                          <label>
                            {selectedCurrency.sym}
                            {coin?.current_price}
                          </label>
                          <TrendLabel
                            value={coin?.price_change_percentage_24h}
                            percentage={true}
                          />
                        </div>
                      </div>
                    </div>
                  </Li>
                </button>
              ))}
          </Ul>
        ) : (
          <div className="relative">
            <SpinnerContainer />
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="mt-2">
                <BlinkingGradientLoader height="40px" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
