import React, { useState } from "react";
import styled from "styled-components";
import { useCryptoContext } from "@/app/context/context";
import { SpinnerContainer } from "../../styled";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
import { useTheme } from "next-themes";

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const Li = styled.li`
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 0.5rem;
`;

export const ChartCoins: React.FC<{ coins: any[] }> = ({ coins }) => {
  const { setCurrentChart } = useCryptoContext();
  const [searchValue, setSearchValue] = useState("");
  const { theme } = useTheme();
  const handleChartChange = (obj: any) => {
    const { name, symbol, id, current_price, total_volume, image } = obj;
    setCurrentChart({ name, symbol, id, current_price, total_volume, image });
    setSearchValue("");
  };

  return (
    <div className="relative">
      <div className="w-full sticky top-0">
        <input
          className=" w-full border border-gray-700 mb-2 p-2 rounded"
          placeholder="Search coin..."
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
                    className={`hover:bg-indigo-600 hover:text-white text-sm
                    ${
                      theme === "dark"
                        ? "bg-gray-800 bg-opacity-40"
                        : "bg-gray-200 bg-opacity-80"
                    }
                  `}
                  >
                    <span className="flex items-center justify-center ">
                      <img
                        className="mr-1"
                        src={coin?.image}
                        height={20}
                        width={20}
                      />

                      {coin?.name}
                      {`(${coin?.symbol.toUpperCase()})`}
                    </span>
                  </Li>
                </button>
              ))}
          </Ul>
        ) : (
          <div className="relative">
            <SpinnerContainer />
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="mt-2">
                <BlinkingGradientLoader height="50px" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
