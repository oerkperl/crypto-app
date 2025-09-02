import React, { useEffect, useState } from "react";
import { useCurrencyStore, useChartStore, useUtilsStore } from "@/store";
import { getCoinById } from "../coinsList/coinsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { ConverterCard } from "./ConverterCard";

export const Converter: React.FC<{ baseCoin: any; height?: string }> = ({
  baseCoin,
  height,
}) => {
  // ✅ Zustand: Selective subscriptions from multiple stores
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const currentChart = useChartStore((state) => state.currentChart);
  const setErrorMessage = useUtilsStore((state) => state.setErrorMessage);

  const bitcoin = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );
  const hasData = bitcoin || baseCoin;
  const [amount1, setAmount1] = useState<number>(0);
  const [amount2, setAmount2] = useState<number>(0);
  const [currency1, setCurrency1] = useState<string>("");
  const [currency2, setCurrency2] = useState<string>("");
  const [conversionRate, setConversionrate] = useState<number>(0);
  const [notification, setNotification] = useState<string>("");

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount1(value);
    if (value < 0) {
      setErrorMessage("Negative input", 3000);
      setNotification("Negative input");
    } else {
      setAmount2(value * conversionRate);
    }
  };

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount2(value);
    if (value < 0) {
      setErrorMessage("Negative input", 3000);
      setNotification("Negative input");
    } else {
      setAmount1(value / conversionRate);
    }
  };
  const coinToCurrency = `1 ${baseCoin?.name || bitcoin?.name}       
  = ${baseCoin?.current_price || bitcoin?.current_price}
  ${currency2?.toLocaleUpperCase()}`;

  const currencyToCoin = `1 ${selectedCurrency.name.toLocaleUpperCase()}
  = ${(1 / baseCoin?.current_price || 1 / bitcoin?.current_price).toFixed(7)}
   ${baseCoin?.name || bitcoin?.name}`;

  const initialze = (coin: any) => {
    if (coin) {
      setAmount1(1);
      setConversionrate(coin?.current_price);
      setAmount2(coin?.current_price);
      setCurrency2(selectedCurrency.name), setCurrency1(currentChart.name);
    }
  };

  useEffect(() => {
    if (!baseCoin && bitcoin) {
      initialze(bitcoin);
    } else if (baseCoin) {
      initialze(baseCoin);
    }
  }, [baseCoin, bitcoin, selectedCurrency, currentChart]);

  return (
    <section className="w-full">
      <div className={`flex flex-col relative h-${height || "full"} py-2`}>
        <ConverterCard
          type="coin"
          image={baseCoin?.image || bitcoin?.image}
          amount={amount1}
          handler={handleAmount1Change}
          lable={coinToCurrency}
          hasData={hasData}
          notification={notification}
          title={baseCoin?.name || "Bitcoin"}
        />
        <hr className="border-gray-300 dark:border-gray-700 my-2" />
        <ConverterCard
          type="currency"
          symbol={selectedCurrency.sym}
          amount={amount2}
          handler={handleAmount2Change}
          lable={currencyToCoin}
          hasData={hasData}
          notification={notification}
          title={selectedCurrency?.name.toLocaleUpperCase()}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full
        w-6 h-6 sm:w-5 sm:h-5 bg-gray-100 dark:bg-accent-bg flex items-center justify-center shadow-md
        "
        >
          <FontAwesomeIcon icon={faRotate} className="text-xs" />
        </div>
      </div>
    </section>
  );
};
