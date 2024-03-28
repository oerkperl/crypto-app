import React from "react";
import Image from "next/image";
import { Section } from "../../styled";
import { ChartCard } from "./ChartCard";
import { TChartLables } from "@/app/lib/types";
import { Row, Col } from "../../styled";
import { useCryptoContext } from "@/app/context/context";
import { getCurrentDate } from "@/app/lib/utils/formatters";
import { TimePeriodButtons } from "./TimePeriods";
import { useSelector } from "react-redux";
import { getCoinById, getCoins } from "../coinsList/coinsSlice";
import { RootState } from "@/app/store/store";
import { formatMoney } from "@/app/lib/utils/formatters";
import { LoadingChart } from "./LoadingChart";
import { removeDuplicates } from "@/app/lib/utils/formatters";
import { Converter } from "../converter/Converter";
import { useAppDispatch } from "@/app/lib/hooks";
import { fetchChartData, getChart, getChartStatus } from "./chartsSlice";
import { ChartCoins } from "./ChartCoins";

export const Charts: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    currentChart,
    selectedOption,
    chartUrl,
    selectedPeriod,
    setSelectedPeriod,
  } = useCryptoContext();
  let baseCoin = useSelector((state: RootState) =>
    getCoinById(state, currentChart.id)
  );
  const bitcoinData = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );
  const data = useSelector((state: RootState) => getChart(state));
  const chartStatus = useSelector((state: RootState) => getChartStatus(state));
  const priceData = data.prices;
  const volumeData = data.total_volumes;
  const allCoins = removeDuplicates(useSelector(getCoins), "id");
  const todayDateString: string = getCurrentDate();

  const priceLabels: TChartLables = {
    title: "Price",
    amount: formatMoney(
      currentChart?.current_price || bitcoinData?.current_price
    ),
    date: todayDateString,
  };

  const volumeLabels: TChartLables = {
    title: "Volume 24h",
    amount: formatMoney(
      currentChart?.total_volume || bitcoinData?.total_volume
    ),
    date: todayDateString,
  };

  const fetchData = () => {
    dispatch(fetchChartData(chartUrl));
  };

  return (
    <>
      <Section className="">
        <Row className={`mt-2 flex gap-2 h-[525px]`}>
          <Col className=" w-1/4 ">
            <div className=" max-h-full overflow-y-scroll pl-1 rounded  bg-white dark:bg-accent-bg">
              <ChartCoins coins={allCoins} />
            </div>
          </Col>
          <Col className="w-1/2  bg-white dark:bg-accent-bg rounded">
            <div>
              {chartStatus === "failed" && (
                <div>
                  <LoadingChart fetchData={fetchData} option={selectedOption} />
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
                            src={currentChart?.image || bitcoinData?.image}
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
                    height={185}
                  ></ChartCard>
                  {selectedOption === "Charts" ? (
                    <ChartCard
                      labels={volumeLabels}
                      data={volumeData}
                      type={"bar"}
                      height={185}
                    ></ChartCard>
                  ) : (
                    <div className="my-2 ">
                      <div className="">
                        <Converter baseCoin={baseCoin} height="[235px]" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>
          <Col className="w-1/4  ">
            <div className="px-4 bg-white dark:bg-accent-bg rounded">
              <h1>Converter</h1>
              <div className="w-full mt-1 border-t border-gray-300 dark:border-gray-700">
                <Converter baseCoin={baseCoin} height="[235px]" />
              </div>
            </div>
          </Col>
        </Row>
      </Section>
    </>
  );
};
