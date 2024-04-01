import React from "react";
import Image from "next/image";
import { ChartCard } from "./ChartCard";
import { TChartLables } from "@/app/lib/types";
import { useCryptoContext } from "@/app/context/context";
import { getCurrentDate } from "@/app/lib/utils/formatters";
import { TimePeriodButtons } from "./TimePeriods";
import { useSelector } from "react-redux";
import { getCoinById } from "../coinsList/coinsSlice";
import { RootState } from "@/app/store/store";
import { formatMoney } from "@/app/lib/utils/formatters";
import { LoadingChart } from "./LoadingChart";
import { useAppDispatch } from "@/app/lib/hooks";
import { fetchChartData, getChart, getChartStatus } from "./chartsSlice";

export const Charts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentChart, chartUrl, selectedPeriod, setSelectedPeriod } =
    useCryptoContext();

  const bitcoin = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );
  const data = useSelector((state: RootState) => getChart(state));
  const chartStatus = useSelector((state: RootState) => getChartStatus(state));
  const priceData = data.prices;
  const volumeData = data.total_volumes;
  const todayDateString: string = getCurrentDate();

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
    dispatch(fetchChartData(chartUrl));
  };

  return (
    <>
      <div>
        {chartStatus !== "succeeded" && (
          <div>
            <LoadingChart fetchData={fetchData} />
          </div>
        )}

        {chartStatus === "succeeded" && (
          <div className=" p-1  ">
            <div className="flex justify-between">
              <div>
                <div className="flex gap-1 ">
                  <h2 className="">
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
                      width={25}
                      height={25}
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
              height={210}
            />
            <ChartCard
              labels={volumeLabels}
              data={volumeData}
              type={"bar"}
              height={210}
            />
          </div>
        )}
      </div>
    </>
  );
};
