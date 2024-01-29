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
import { getCoinById } from "../coins/coinsSlice";
import { RootState } from "@/app/store/store";
import { formatMoney } from "@/app/lib/utils/formatters";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

type DataEntry = [number, number];

export const Charts: React.FC = () => {
  const [priceData, setPriceData] = useState<DataEntry[]>([]);
  const [volumeData, setVolumesData] = useState<DataEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedPeriod, selectedCurrency } = useCryptoContext();
  const days = getNumberOfDays(selectedPeriod).toString();
  const bitcoinData = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );
  const todayDateString: string = getCurrentDate();

  const priceLabels: TChartLables = {
    title: "Price",
    amount: formatMoney(bitcoinData?.current_price),
    date: todayDateString,
  };

  const volumeLabels: TChartLables = {
    title: "Volume 24h",
    amount: formatMoney(bitcoinData?.total_volume),
    date: todayDateString,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          vs_currency: selectedCurrency.name,
          days: days,
          interval: "daily",
        });

        const { data } = await axios(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?${params}`
        );
        setPriceData(data.prices);
        setVolumesData(data.total_volumes);
        if (data) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedPeriod, selectedCurrency]);

  return (
    <>
      <Section $margin="1rem 0 0 0">
        <div className="mb-4">
          <h2>Chart</h2>
        </div>
        <Row>
          <Col $width="30%" className=" mr-4">
            <ChartCoins />
          </Col>
          <Col $width="70%" className="">
            <div className="">
              {isLoading && (
                <div>
                  <BlinkingGradientLoader height="175px" />
                  <hr />
                  <BlinkingGradientLoader height="175px" />
                </div>
              )}
              {!isLoading && (
                <div>
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
                </div>
              )}

              <TimePeriodButtons />
            </div>
          </Col>
        </Row>
      </Section>
    </>
  );
};
