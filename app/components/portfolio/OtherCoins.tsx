import React, { useRef, useEffect, useState } from "react";
import { removeDuplicates } from "@/app/lib/utils/formatters";
import { useSelector } from "react-redux";
import { getCoins } from "../home/coinsList/coinsSlice";
import { SingleCoin } from "../SingleCoin";
import { useCryptoContext } from "@/app/context/context";

export const OtherCoins = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const allCoins = removeDuplicates(useSelector(getCoins), "id");
  const { setViewingCoinId } = useCryptoContext();
  const [autoScrol, setAutoScrol] = useState<boolean>(true);
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
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
        className=" relative overflow-hidden w-full border border-gray-300 dark:border-gray-700 
        bg-gray-100 dark:bg-transparent rounded-lg mt-2 "
        onMouseEnter={() => {
          setAutoScrol(false);
        }}
        onMouseLeave={() => {
          setAutoScrol(true);
        }}
      >
        <div
          ref={containerRef}
          className={`flex gap-2 overflow-x-hidden relative w-full px-8 py-2`}
        >
          <ul className=" flex w-full gap-2">
            {allCoins.map((coin) => (
              <button
                key={coin.id}
                onClick={() => {
                  setViewingCoinId(coin?.id);
                }}
              >
                <li
                  className={`w-80 hover:bg-indigo-600 hover:text-white text-sm rounded-md border border-gray-300 dark:border-gray-700 
                    text-xs py-1 flex gap-1 bg-white dark:bg-transparent
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
              className="absolute top-0 left-0 h-full px-2 z-10 bg-gray-400 dark:bg-gray-800 hover:bg-indigo-600"
              onClick={scrollLeft}
            >
              {"<"}
            </button>
            <button
              className="absolute top-0 right-0 h-full px-2 z-10 bg-gray-400 dark:bg-gray-800 hover:bg-indigo-600"
              onClick={() => {
                scrollRight(350);
              }}
            >
              {">"}
            </button>
          </>
        )}
      </div>
    </>
  );
};
