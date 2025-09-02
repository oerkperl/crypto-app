import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrencyStore } from "@/store";
import { getNumberOfDays } from "@/lib/utils/formatters";
import { TimePeriodButtons } from "../home/charts/TimePeriods";
import { ChartCard } from "../home/charts/ChartCard";
import { BlinkingGradientLoader } from "@/lib/utils/components/BlinkingLoader";

export const PriceChart: React.FC<{ coinId: string }> = ({ coinId }) => {
  const [data, setData] = useState<any>(null);
  const [ChartData, setChartData] = useState<any>(null);
  const [isViewingPriceChart, setIsViewingPriceChart] = useState<boolean>(true);
  const [type, setType] = useState<string>("line");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1M");
  const [hasError, setHasError] = useState<boolean>(false);
  const [chartHeight, setChartHeight] = useState<number>(185); // Default height

  // ✅ Zustand: Only subscribes to selectedCurrency
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);

  const days = getNumberOfDays(selectedPeriod).toString();
  const baseUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?`;
  const params = new URLSearchParams({
    vs_currency: selectedCurrency.name,
    days: days,
    interval: "daily",
  });
  const chartUrl = `${baseUrl}${params}`;

  const fetchChart = async () => {
    try {
      const { data } = await axios(chartUrl);
      if (data) {
        setData(data);
        isViewingPriceChart
          ? setChartData(data.prices)
          : setChartData(data.total_volumes);
        setHasError(false);
      }
    } catch (error) {
      setHasError(true);
    }
  };
  useEffect(() => {
    if (coinId) {
      fetchChart();
    }
  }, [coinId, selectedCurrency, selectedPeriod]);

  // Set chart height based on window size (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateHeight = () => {
        setChartHeight(window.innerWidth < 640 ? 150 : 185);
      };

      updateHeight(); // Initial setting
      window.addEventListener("resize", updateHeight);

      return () => window.removeEventListener("resize", updateHeight);
    }
  }, []);

  const randomHeight = () => {
    return Math.floor(Math.random() * (200 - 40 + 1)) + 40;
  };

  const showVolumeChart = () => {
    setChartData(data.total_volumes);
    setType("bar");
    setIsViewingPriceChart(false);
  };
  const showPriceChart = () => {
    setChartData(data.prices);
    setType("line");
    setIsViewingPriceChart(true);
  };
  return (
    <>
      <div className="h-full flex flex-col p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
          <div className="flex">
            <button
              className={`hover:text-gray-600 dark:hover:text-white px-3 py-2 sm:px-2 sm:py-1 rounded transition-colors min-h-[44px] sm:min-h-auto flex items-center justify-center ${
                isViewingPriceChart ? "text-white bg-indigo-700" : ""
              }`}
              onClick={showPriceChart}
            >
              Price
            </button>
            <button
              className={`hover:text-gray-700 dark:hover:text-white px-3 py-2 sm:px-2 sm:py-1 rounded transition-colors min-h-[44px] sm:min-h-auto flex items-center justify-center ${
                !isViewingPriceChart ? "text-white bg-indigo-700" : ""
              }`}
              onClick={showVolumeChart}
            >
              Volume
            </button>
          </div>
          <div className="flex gap-2 justify-center sm:justify-end">
            {!hasError && (
              <TimePeriodButtons
                thePeriod={selectedPeriod}
                periodHandler={setSelectedPeriod}
              />
            )}
            {hasError && (
              <div className="flex flex-col sm:flex-row gap-2 px-2 text-center sm:text-left">
                <h1 className="text-sm">
                  Error fetching chart, try again later...
                </h1>
                <button
                  className="hover:underline dark:hover:text-white text-indigo-600 dark:text-indigo-400 min-h-[44px] sm:min-h-auto"
                  onClick={fetchChart}
                >
                  Reload
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="">
          {hasError && (
            <div className="mt-2 flex w-full pt-2 overflow-hidden h-32 sm:h-48">
              {Array.from({ length: 50 }).map((_, index) => (
                <div
                  key={index}
                  className="mr-2 relative max-h-48 flex flex-col justify-end"
                >
                  <div className="bottom-item w-2">
                    <BlinkingGradientLoader
                      height={randomHeight() + "px"}
                      width="10px"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!hasError && (
            <ChartCard data={ChartData} type={type} height={chartHeight} />
          )}
        </div>
      </div>
    </>
  );
};
