import React from "react";
import Image from "next/image";
import { Section } from "../../styled";
import { ChartCard } from "./ChartCard";
import { TChartLables } from "@/app/lib/types";
import { Row, Col } from "../../styled";
import { ChartCoins } from "./ChartCoins";
import { useCryptoContext } from "@/app/context/context";
import { getCurrentDate } from "@/app/lib/utils/formatters";
import { TimePeriodButtons } from "./TimePeriods";
import { useSelector } from "react-redux";
import { getCoinById, getCoins } from "../coinsList/coinsSlice";
import { RootState } from "@/app/store/store";
import { formatMoney } from "@/app/lib/utils/formatters";
import { LoadingChart } from "./LoadingChart";
import { removeDuplicates } from "@/app/lib/utils/formatters";
import { CoinSwitcher } from "../navigation/CoinSwitcher";
import { Converter } from "../converter/Converter";
import { useAppDispatch } from "@/app/lib/hooks";
import { fetchChartData, getChart, getChartStatus } from "./chartsSlice";

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
      <Section className="mt-2">
        <div className="mb-2 flex justify-between mt-2">
          <div className="flex">
            <CoinSwitcher />
          </div>
          <div className="flex gap-1 items-center">
            <h2 className=" text-xl">
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
        <Row
          className={`${
            selectedOption === "Charts" ? "h-[525px]" : "h-[440px]"
          }`}
        >
          <Col $width="30%" className=" mr-1">
            <div className=" max-h-full overflow-y-scroll pr-1">
              <ChartCoins coins={allCoins} />
            </div>
          </Col>
          <Col $width="70%">
            <div>
              {chartStatus === "failed" && (
                <div>
                  <LoadingChart fetchData={fetchData} option={selectedOption} />
                </div>
              )}
              {chartStatus === "succeeded" && (
                <div className=" min-h-full ">
                  <ChartCard
                    data={priceData}
                    labels={priceLabels}
                    type={"line"}
                    height={160}
                  ></ChartCard>
                  {selectedOption === "Charts" ? (
                    <ChartCard
                      labels={volumeLabels}
                      data={volumeData}
                      type={"bar"}
                      height={160}
                    ></ChartCard>
                  ) : (
                    <div className="my-2 ">
                      <div className="">
                        <Converter baseCoin={baseCoin} height="[235px]" />
                      </div>
                    </div>
                  )}

                  <div className="pb-2 border-b border-gray-300 dark:border-gray-700">
                    <TimePeriodButtons
                      thePeriod={selectedPeriod}
                      periodHandler={setSelectedPeriod}
                    />
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Section>
    </>
  );
};
