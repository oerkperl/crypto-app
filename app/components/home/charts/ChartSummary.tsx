import { formatDate, formatMoney } from "@/app/lib/utils/formatters";
import { useCurrencyStore } from "@/store/currencyStore";
import { TrendLabel } from "../../TrendLable";
import { SpinnerContainer } from "../../styled";
export const ChartSummary: React.FC<{ coin: any }> = ({ coin }) => {
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);

  return (
    <div className="relative bg-white dark:bg-accent-bg rounded shadow-md flex flex-col px-2 sm:px-3 py-2 sm:py-1">
      {coin !== undefined ? (
        <>
          <div className="flex justify-between text-xs sm:text-sm mb-1">
            <h1>All time high:</h1>
            <h1 className="text-gray-600 dark:text-gray-400">
              {formatDate(coin?.ath_date)}
            </h1>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h1 className="dark:text-white text-sm sm:text-base font-medium">
              {selectedCurrency.sym + formatMoney(coin?.ath)}
            </h1>
            <TrendLabel value={coin?.ath_change_percentage} percentage={true} />
          </div>
          <hr className="border-gray-300 dark:border-gray-700 my-2" />

          <div className="flex justify-between text-xs sm:text-sm mb-1">
            <h1>All time low:</h1>
            <h1 className="text-gray-600 dark:text-gray-400">
              {formatDate(coin?.atl_date)}
            </h1>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h1 className="dark:text-white text-sm sm:text-base font-medium">
              {selectedCurrency.sym + formatMoney(coin?.atl)}
            </h1>
            <TrendLabel value={coin?.atl_change_percentage} percentage={true} />
          </div>
          <hr className="border-gray-300 dark:border-gray-700 my-2" />

          <h1 className="text-xs sm:text-sm font-medium mb-2">
            Price change %
          </h1>
          <div className="space-y-1">
            <div className="flex justify-between text-xs sm:text-sm">
              <h1 className="dark:text-white">1h</h1>
              <TrendLabel
                value={coin?.price_change_percentage_1h_in_currency}
                percentage={true}
              />
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <h1 className="dark:text-white">24h</h1>
              <TrendLabel
                value={coin?.price_change_percentage_24h_in_currency}
                percentage={true}
              />
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <h1 className="dark:text-white">7d</h1>
              <TrendLabel
                value={coin?.price_change_percentage_7d_in_currency}
                percentage={true}
              />
            </div>
          </div>
          <hr className="border-gray-300 dark:border-gray-700 my-2" />
          <div className="flex justify-between text-xs sm:text-sm">
            <h1 className="dark:text-white">Market cap rank</h1>
            <h1 className="font-medium">#{coin?.market_cap_rank}</h1>
          </div>
        </>
      ) : (
        <SpinnerContainer />
      )}
    </div>
  );
};
