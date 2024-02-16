import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons/faLayerGroup";
import { useCryptoContext } from "@/app/context/context";
import { formatDate } from "@/app/lib/utils/formatters";
import { DetailsCard } from "./DetailsCard";

export const CoinPriceCard: React.FC<{ marketData: any }> = ({
  marketData,
}) => {
  const { selectedCurrency } = useCryptoContext();
  const currency = selectedCurrency.name;
  const symbol = selectedCurrency.sym;
  const cardIcon = <FontAwesomeIcon icon={faLayerGroup} size="lg" />;
  const hasData = marketData !== undefined;

  const athData = {
    title: "ATH:",
    amount: marketData?.ath[currency],
    percentage: marketData?.ath_change_percentage[currency],
    date: formatDate(marketData?.ath_date[currency]),
  };

  const atlData = {
    title: "ATL:",
    amount: marketData?.atl[currency],
    percentage: marketData?.atl_change_percentage[currency],
    date: formatDate(marketData?.atl_date[currency]),
  };

  return (
    hasData && (
      <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center gap-1">
        <h1 className="text-xl">
          {symbol}
          {marketData?.current_price[currency]}
        </h1>
        <h1>
          {marketData?.price_change_percentage_24h_in_currency[
            currency
          ].toFixed(3) + "%"}
        </h1>
        <p>{cardIcon}</p>
        <div className="flex justify-between  w-full">
          <DetailsCard details={athData} />
          <DetailsCard details={atlData} />
        </div>
      </div>
    )
  );
};
