import React, { useEffect } from "react";
import Image from "next/image";
import { TChartLables } from "@/lib/types";
import { getCurrentDate, formatMoney } from "@/lib/utils/formatters";
import { useChartStore, useCurrencyStore } from "@/store";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ChartCard } from "../home/charts/ChartCard";
import { LoadingChart } from "../home/charts/LoadingChart";
import { TimePeriodButtons } from "../home/charts/TimePeriods";
import { getCoinById } from "../home/coinsList/coinsSlice";

export const Charts: React.FC = () => {
  const currentChart = useChartStore((state) => state.currentChart);
  const selectedPeriod = useChartStore((state) => state.selectedPeriod);
  const setSelectedPeriod = useChartStore((state) => state.setSelectedPeriod);
  const getChartUrl = useChartStore((state) => state.getChartUrl);
  const fetchChartData = useChartStore((state) => state.fetchChartData);
  const getCurrentChartData = useChartStore(
    (state) => state.getCurrentChartData
  );
  const getCurrentStatus = useChartStore((state) => state.getCurrentStatus);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);

  const chartUrl = getChartUrl(selectedCurrency.name);
  const chartData = getCurrentChartData(chartUrl);
  const chartStatus = getCurrentStatus(chartUrl);

  const bitcoin = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );

  const priceData = chartData?.prices || [];
  const volumeData = chartData?.total_volumes || [];
  const todayDateString: string = getCurrentDate();

  // Auto-fetch data when URL changes
  useEffect(() => {
    if (chartStatus === "idle") {
      fetchChartData(chartUrl);
    }
  }, [chartUrl, chartStatus, fetchChartData]);

  const priceLabels: TChartLables = {
    title: "Price",
    amount: formatMoney(currentChart?.current_price || bitcoin?.current_price),
    date: todayDateString,
  };

  const volumeLabels: TChartLables = {
    title: "Volume 24h",
    amount: formatMoney(currentChart?.total_volume || bitcoin?.total_volume),
    date: todayDateString,
  };

  const fetchData = () => {
    fetchChartData(chartUrl);
  };

  return (
    <>
      <div>
        {chartStatus !== "succeeded" && (
          <div>
            <LoadingChart fetchData={fetchData} status={chartStatus} />
          </div>
        )}

        {chartStatus === "succeeded" && (
          <div className="p-1 sm:p-2">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mb-3">
              <div>
                <div className="flex gap-1 items-center">
                  <h2 className="text-sm sm:text-base font-medium">
                    {(currentChart && currentChart?.name) || "Bitcoin"}
                    {`(${
                      currentChart?.symbol !== undefined
                        ? currentChart?.symbol.toUpperCase()
                        : "BTC"
                    })`}
                  </h2>
                  {currentChart && (
                    <Image
                      src={currentChart?.image || bitcoin?.image}
                      width={20}
                      height={20}
                      className="sm:w-[25px] sm:h-[25px]"
                      alt="coin image"
                    />
                  )}
                </div>
              </div>
              <div className="">
                <TimePeriodButtons
                  thePeriod={selectedPeriod}
                  periodHandler={setSelectedPeriod}
                />
              </div>
            </div>
            <ChartCard
              data={priceData}
              labels={priceLabels}
              type={"line"}
              height={160}
            />
            <ChartCard
              labels={volumeLabels}
              data={volumeData}
              type={"bar"}
              height={160}
            />
          </div>
        )}
      </div>
    </>
  );
};
