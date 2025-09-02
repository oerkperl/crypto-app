import React, { useState } from "react";
import styled from "styled-components";
import { useChartStore } from "@/app/store/chartStore";
import { SpinnerContainer } from "../../styled";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
import { SingleCoin } from "../../SingleCoin";

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
  const setCurrentChart = useChartStore((state) => state.setCurrentChart);
  const currentChart = useChartStore((state) => state.currentChart);
  const [searchValue, setSearchValue] = useState("");

  const handleChartChange = (obj: any) => {
    setCurrentChart(obj);
    setSearchValue("");
  };

  return (
    <div className="relative pt-2 pr-1">
      <div className="w-full sticky top-1 z-5">
        <input
          className="w-full mb-2 p-2 rounded shadow-md text-xs sm:text-sm bg-gray-100 dark:bg-input-bg"
          placeholder="Search for a coin..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="lg:max-h-[400px] max-h-[200px] overflow-y-auto">
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
                  className="w-full"
                >
                  <Li
                    className={`hover:bg-indigo-600 shadow-sm hover:text-white border-gray-300 dark:border-indigo-700 
                    text-xs py-2 px-2 flex gap-1 transition-colors min-h-[44px] lg:min-h-auto items-center ${
                      currentChart?.id === coin?.id
                        ? "bg-indigo-700 text-white hover:text-white"
                        : "bg-white dark:bg-transparent"
                    }
                  `}
                  >
                    <SingleCoin coin={coin} />
                  </Li>
                </button>
              ))}
          </Ul>
        ) : (
          <div className="relative">
            <SpinnerContainer />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="mt-2">
                <BlinkingGradientLoader height="44px" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
