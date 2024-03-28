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
  return (
    <>
      <div className=" h-full flex flex-col justify-between">
        <div className="">
          {hasError && <BlinkingGradientLoader height="215px" />}
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
