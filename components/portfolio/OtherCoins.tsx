import React, { useRef, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { getCoins } from "../home/coinsList/coinsSlice";
import { SingleCoin } from "../SingleCoin";
import { useUIStore } from "@/store/uiStore";
import { useChartStore } from "@/store/chartStore";
import { removeDuplicates } from "@/lib/utils/formatters";

export const OtherCoins: React.FC<{ switchCart?: boolean }> = ({
  switchCart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const allCoins = removeDuplicates(useSelector(getCoins), "id");
  const setViewingCoinId = useUIStore((state) => state.setViewingCoinId);
  const setCurrentChart = useChartStore((state) => state.setCurrentChart);
  const [autoScrol, setAutoScrol] = useState<boolean>(true);
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const handleChartChange = (obj: any) => {
    const { name, symbol, id, current_price, total_volume, image } = obj;
    setCurrentChart({ name, symbol, id, current_price, total_volume, image });
  };

  const scrollRight = (space: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollBy({
        left: space || 5,
        behavior: "smooth",
      });
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "auto" });
      }
    }
  };

  useEffect(() => {
    if (autoScrol) {
      const intervalId = setInterval(scrollRight, 50);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [autoScrol]);

  return (
    <>
      <div
        className=" relative overflow-hidden w-full mb-2 "
        onMouseEnter={() => {
          setAutoScrol(false);
        }}
        onMouseLeave={() => {
          setAutoScrol(true);
        }}
      >
        <div
          ref={containerRef}
          className={`flex gap-2 overflow-x-hidden relative w-full px-8`}
        >
          <ul className=" flex w-full gap-2">
            {allCoins.map((coin) => (
              <button
                key={coin.id}
                onClick={() => {
                  switchCart
                    ? handleChartChange(coin)
                    : setViewingCoinId(coin?.id);
                }}
              >
                <li
                  className={`w-80 hover:bg-indigo-600 hover:text-white text-sm rounded-md  shadow-md border border-gray-300 dark:border-0
                    text-xs py-1 flex gap-1 bg-white dark:bg-accent-bg
                  `}
                >
                  <SingleCoin coin={coin} />
                </li>
              </button>
            ))}
          </ul>
        </div>
        {!autoScrol && (
          <>
            <button
              className="absolute top-1/2 left-1 transform -translate-y-1/2 min-w-[44px] min-h-[44px] z-10 bg-gray-400/90 dark:bg-gray-800/90 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm transition-colors"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              {"<"}
            </button>
            <button
              className="absolute top-1/2 right-1 transform -translate-y-1/2 min-w-[44px] min-h-[44px] z-10 bg-gray-400/90 dark:bg-gray-800/90 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm transition-colors"
              onClick={() => {
                scrollRight(350);
              }}
              aria-label="Scroll right"
            >
              {">"}
            </button>
          </>
        )}
      </div>
    </>
  );
};
