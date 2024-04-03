import React from "react";
import { Section } from "../../styled";
import { Row, Col } from "../../styled";
import { useCryptoContext } from "@/app/context/context";
import { useSelector } from "react-redux";
import { getCoinById, getCoins } from "../coinsList/coinsSlice";
import { RootState } from "@/app/store/store";
import { removeDuplicates } from "@/app/lib/utils/formatters";
import { Converter } from "../converter/Converter";
import { ChartCoins } from "./ChartCoins";
import { ChartSummary } from "./ChartSummary";
import { Charts } from "./Charts";

export const Dashboard: React.FC = () => {
  const { currentChart, viewCoin } = useCryptoContext();
  let baseCoin = useSelector((state: RootState) =>
    getCoinById(state, currentChart.id)
  );
  const bitcoin = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );
  const allCoins = removeDuplicates(useSelector(getCoins), "id");
  const coinExist = Object.keys(currentChart).length > 0;

  return (
    <>
      <Section className="">
        <Row className={`mt-2 flex gap-2 h-[525px]`}>
          <Col className=" w-1/4 ">
            <div className=" max-h-full overflow-y-scroll pl-1 rounded shadow-md bg-white dark:bg-accent-bg">
              <ChartCoins coins={allCoins} />
            </div>
          </Col>
          <Col className="w-1/2  bg-white dark:bg-accent-bg rounded shadow-md">
            <Charts />
          </Col>
          <Col className="w-1/4  ">
            <div className="px-2 bg-white dark:bg-accent-bg rounded shadow-md">
              <h1>Converter</h1>
              <div className="w-full mt-1 border-t border-gray-300 dark:border-gray-700">
                <Converter baseCoin={baseCoin} height="[235px]" />
              </div>
            </div>
            <div className="mt-2 mb-auto">
              <ChartSummary coin={coinExist ? currentChart : bitcoin} />
            </div>
            <div className="mt-2">
              <button
                className="border border-gray-300 shadow-md dark:border-indigo-500 w-full rounded py-1 hover:bg-indigo-600 
                bg-white dark:bg-transparent hover:text-white"
                onClick={() => viewCoin(currentChart?.id || bitcoin?.id)}
              >
                View more
              </button>
            </div>
          </Col>
        </Row>
      </Section>
    </>
  );
};
