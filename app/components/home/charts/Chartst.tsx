import React, { useState, useEffect } from "react";
import axios from "axios";
import { Section } from "../../globalStyled/styled";
import { ChartCard } from "../../charts/Graphs";
import { TChartLables } from "@/app/utilities/types";
import { Row, Col } from "../../globalStyled/styled";
import { Coins } from "./Coins";

type DataEntry = [number, number];
const priceLabels: TChartLables = {
  title: "Price",
  price: "$44.27 ths",
  date: "Septembet 23, 2023",
};

const volumeLabels: TChartLables = {
  title: "Volume 24h",
  price: "$17.34 bln",
  date: "Septembet 23, 2023",
};

const timePeriods = ["1D", "7D", "14D", "1M", "1Y", "5Y"];

const TimePeriodButtons = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1D");
  return (
    <div className="border border-solid border-gray-700 inline-flex p-1 mt-4 rounded-lg">
      {timePeriods.map((period, index) => (
        <button
          key={index}
          onClick={() => setSelectedPeriod(period)}
          className={`${
            period === selectedPeriod
              ? "bg-indigo-600 text-white"
              : "text-gray-500"
          } py-1 px-4 rounded hover:text-yellow-600`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

export const Charts: React.FC = () => {
  const [priceData, setPriceData] = useState<DataEntry[]>([]);
  const [volumeData, setVolumesData] = useState<DataEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          vs_currency: "usd",
          days: "180",
          interval: "daily",
        });

        const { data } = await axios(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?${params}`
        );
        setPriceData(data.prices);
        setVolumesData(data.total_volumes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Section $margin="1rem 0 0 0">
        <div className="mb-4">
          <h2>Chart</h2>
        </div>
        <Row>
          <Col $width="30%" className=" mr-4">
            <Coins />
          </Col>
          <Col $width="70%" className="">
            <div className="">
              <ChartCard
                data={priceData}
                labels={priceLabels}
                type={"line"}
                width={400}
                height={100}
                borderColor="#0CF864"
                backgroundColor={[0, 0, 0, 350]}
              ></ChartCard>
              <ChartCard
                labels={volumeLabels}
                data={volumeData}
                type={"bar"}
                width={600}
                height={100}
                borderColor=""
                backgroundColor={[]}
              ></ChartCard>
              <TimePeriodButtons />
            </div>
          </Col>
        </Row>
      </Section>
    </>
  );
};
