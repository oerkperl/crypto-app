import React, { useState, useEffect } from "react";
import axios from "axios";
import { Section } from "../../styled";
import { ChartCard } from "./ChartCard";
import { TChartLables } from "@/app/lib/types";
import { Row, Col } from "../../styled";
import { ChartCoins } from "./ChartCoins";
import { useCryptoContext } from "@/app/context/context";
import { getNumberOfDays, getCurrentDate } from "@/app/lib/utils/formatters";
import { TimePeriodButtons } from "./TimePeriods";
import { useSelector } from "react-redux";
import { getCoinById, getCoins } from "../coinsList/coinsSlice";
import { RootState } from "@/app/store/store";
import { formatMoney } from "@/app/lib/utils/formatters";
import { LoadingChart } from "./LoadingChart";
import { removeDuplicates } from "@/app/lib/utils/formatters";

type DataEntry = [number, number];

export const Charts: React.FC = () => {
  const [priceData, setPriceData] = useState<DataEntry[]>([]);
  const [volumeData, setVolumesData] = useState<DataEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedPeriod, selectedCurrency, currentChart, setCurrentChart } =
    useCryptoContext();
  const days = getNumberOfDays(selectedPeriod).toString();
  const bitcoinData = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );

  const allCoins = removeDuplicates(useSelector(getCoins), "id");
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${
    currentChart?.id || "bitcoin"
  }/market_chart?`;

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

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        vs_currency: selectedCurrency.name,
        days: days,
        interval: "daily",
      });

      const { data } = await axios(`${apiUrl}${params}`);
      setPriceData(data.prices);
      setVolumesData(data.total_volumes);
      if (data) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedPeriod, selectedCurrency, currentChart]);

  return (
    <>
      <Section className="mt-2">
        <div className="mb-2 flex justify-between mt-2">
          <div className="flex">
            <h2 className=" text-xl">
              {(currentChart && currentChart?.name) || "Bitcoin"}
              {`(${
                currentChart?.symbol !== undefined
                  ? currentChart?.symbol.toUpperCase()
                  : "BTC"
              })`}
            </h2>
          </div>
          <div className="flex">
            {currentChart && (
              <img
                className="mr-1"
                src={currentChart?.image || bitcoinData?.image}
                width={25}
                height={25}
              />
            )}
            <h2 className="">Chart</h2>
          </div>
        </div>
        <Row style={{ height: "525px" }}>
          <Col $width="30%" className=" mr-2">
            <div className=" max-h-full overflow-y-scroll pr-2">
              <ChartCoins coins={allCoins} />
            </div>
          </Col>
          <Col $width="70%">
            <div className="">
              {isLoading && (
                <div>
                  <LoadingChart />
                  <button
                    className="border border-gray-500 p-2 mt-2 hover:bg-indigo-600 hover:text-white"
                    onClick={() => {
                      fetchData();
                    }}
                  >
                    Reload
                  </button>
                </div>
              )}
              {!isLoading && (
                <div className="max-h-full">
                  <ChartCard
                    data={priceData}
                    labels={priceLabels}
                    type={"line"}
                    height={100}
                    borderColor="#0CF264"
                    backgroundColor={[0, 0, 0, 350]}
                  ></ChartCard>
                  <ChartCard
                    labels={volumeLabels}
                    data={volumeData}
                    type={"bar"}
                    height={100}
                  ></ChartCard>
                  <TimePeriodButtons />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Section>
    </>
  );
};
