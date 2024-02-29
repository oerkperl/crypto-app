import React, { useEffect, useState } from "react";
import { Section } from "../../styled";
import { useCryptoContext } from "@/app/context/context";
import { getCoinById } from "../coinsList/coinsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { ConverterCar } from "./ConverterCard";
export const Converter = () => {
  const { selectedCurrency, currentChart } = useCryptoContext();

  let baseCoin = useSelector((state: RootState) =>
    getCoinById(state, currentChart.id)
  );

  const bitcoin = useSelector((state: RootState) =>
    getCoinById(state, "bitcoin")
  );
  const [amount1, setAmount1] = useState<number>(1);
  const [amount2, setAmount2] = useState<number>(baseCoin?.current_price);
  const [currency1, setCurrency1] = useState<string>(selectedCurrency.name);
  const [currency2, setCurrency2] = useState<string>(currentChart.name);
  const [conversionRate, setConversionrate] = useState<number>(
    baseCoin?.current_price
  );

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount1(value);
    setAmount2(value * conversionRate);
  };

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount2(value);
    setAmount1(value / conversionRate);
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
    <Section>
      <div className="flex justify between gap-2 mt-2 mb-2 h-[235px] relative">
        <ConverterCar
          type="coin"
          image={baseCoin?.image || bitcoin?.image}
          currency={currency1}
          amount={amount1}
          handler={handleAmount1Change}
          lable={coinToCurrency}
        />
        <ConverterCar
          type="currency"
          symbol={selectedCurrency.sym}
          currency={currency2}
          amount={amount2}
          handler={handleAmount2Change}
          lable={currencyToCoin}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full
        w-12 h-12 bg-gray-200 dark:bg-gray-900 flex items-center justify-center
        "
        >
          <FontAwesomeIcon icon={faRotate} />
        </div>
      </div>
    </Section>
  );
};
