import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCryptoContext } from "@/app/context/context";
import { getNumberOfDays } from "@/app/lib/utils/formatters";
import { TimePeriodButtons } from "../home/charts/TimePeriods";
import { ChartCard } from "../home/charts/ChartCard";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const PriceChart: React.FC<{ coinId: string }> = ({ coinId }) => {
  const [priceData, setPriceData] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1M");
  const [hasError, setHasError] = useState<boolean>(false);
  const { selectedCurrency } = useCryptoContext();
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
        setPriceData(data.prices);
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
  }, [selectedCurrency, selectedPeriod]);
  const randomHeight = () => {
    return Math.floor(Math.random() * (200 - 40 + 1)) + 40;
  };
  return (
    <>
      <div className=" h-full flex flex-col justify-between">
        <div className="">
          {hasError && (
            <div className="mt-2 flex w-full pt-2 overflow-hidden">
              {Array.from({ length: 100 }).map((_, index) => (
                <div
                  key={index}
                  className="mr-2 relative max-h-48  flex flex-col justify-end"
                >
                  <div className=" bottom-item   w-2">
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
            <ChartCard data={priceData} type={"line"} height={185} />
          )}
        </div>
        <div className="flex gap-2">
          {!hasError && (
            <TimePeriodButtons
              thePeriod={selectedPeriod}
              periodHandler={setSelectedPeriod}
            />
          )}
          {hasError && (
            <div className="flex gap-2 px-2">
              <h1 className="text-center">
                Error fetching chart, try again later...
              </h1>
              <button className="hover:underline" onClick={fetchChart}>
                Reload
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
