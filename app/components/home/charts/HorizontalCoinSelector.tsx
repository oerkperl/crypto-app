"use client";
import React, { useRef, useState } from "react";
import { useChartStore } from "@/app/store";
import { SingleCoin } from "../../SingleCoin";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface HorizontalCoinSelectorProps {
  coins: any[];
}

export const HorizontalCoinSelector: React.FC<HorizontalCoinSelectorProps> = ({
  coins,
}) => {
  // ✅ Zustand: Only subscribes to chart-related state
  const currentChart = useChartStore((state) => state.currentChart);
  const setCurrentChart = useChartStore((state) => state.setCurrentChart);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const handleChartChange = (obj: any) => {
    setCurrentChart(obj);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowScrollButtons(true)}
      onMouseLeave={() => setShowScrollButtons(false)}
    >
      {/* Left Scroll Button - Desktop only */}
      {showScrollButtons && (
        <button
          onClick={scrollLeft}
          className="hidden lg:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 
            bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
            border border-gray-300 dark:border-gray-600 rounded-full w-10 h-10 
            items-center justify-center shadow-lg transition-all duration-200"
          aria-label="Scroll left"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-12 lg:px-6"
      >
        {coins.length > 0 ? (
          coins.map((coin) => (
            <button
              key={coin.id}
              onClick={() => handleChartChange(coin)}
              className="flex-shrink-0"
            >
              <div
                className={`hover:bg-indigo-600 shadow-sm hover:text-white border border-gray-300 dark:border-indigo-700 
                text-xs py-3 px-4 rounded-md flex items-center gap-2 transition-colors min-h-[44px] min-w-[200px] ${
                  currentChart?.id === coin?.id
                    ? "bg-indigo-700 text-white"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <SingleCoin coin={coin} />
              </div>
            </button>
          ))
        ) : (
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <BlinkingGradientLoader height="44px" width="200px" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Scroll Button - Desktop only */}
      {showScrollButtons && (
        <button
          onClick={scrollRight}
          className="hidden lg:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 
            bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
            border border-gray-300 dark:border-gray-600 rounded-full w-10 h-10 
            items-center justify-center shadow-lg transition-all duration-200"
          aria-label="Scroll right"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>
      )}
    </div>
  );
};
