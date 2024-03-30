import { formatDate, formatMoney } from "@/app/lib/utils/formatters";
import { useCryptoContext } from "@/app/context/context";
import { TrendLabel } from "../../TrendLable";
import { SpinnerContainer } from "../../styled";
export const ChartSummary: React.FC<{ coin: any }> = ({ coin }) => {
  const { selectedCurrency } = useCryptoContext();

  return (
    <div className=" relative bg-white dark:bg-accent-bg rounded flex flex-col px-2 py-1">
      {coin !== undefined ? (
        <>
          <div className="flex justify-between text-sm">
            <h1>All time high:</h1>
            <h1>{formatDate(coin?.ath_date)}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="dark:text-white">
              {selectedCurrency.sym + formatMoney(coin?.ath)}
            </h1>
            <TrendLabel value={coin?.ath_change_percentage} percentage={true} />
          </div>
          <hr className="border-gray-300 dark:border-gray-700 my-2" />
          <div className="flex justify-between text-sm">
            <h1>All time low:</h1>
            <h1>{formatDate(coin?.atl_date)}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="dark:text-white">
              {selectedCurrency.sym + formatMoney(coin?.atl)}
            </h1>
            <TrendLabel value={coin?.atl_change_percentage} percentage={true} />
          </div>
          <hr className="border-gray-300 dark:border-gray-700 my-2" />
          <h1>Price change %</h1>
          <div className="flex justify-between text-sm">
            <h1 className="dark:text-white">1h</h1>
            <TrendLabel
              value={coin?.price_change_percentage_1h_in_currency}
              percentage={true}
            />
          </div>
          <div className="flex justify-between text-sm">
            <h1 className="dark:text-white">24h</h1>
            <TrendLabel
              value={coin?.price_change_percentage_24h_in_currency}
              percentage={true}
            />
          </div>
          <div className="flex justify-between text-sm ">
            <h1 className="dark:text-white">7d</h1>
            <TrendLabel
              value={coin?.price_change_percentage_7d_in_currency}
              percentage={true}
            />
          </div>
          <div className="flex justify-between text-sm ">
            <h1 className="dark:text-white">Market cap rank</h1>
            <h1>{coin?.market_cap_rank}</h1>
          </div>
        </>
      ) : (
        <SpinnerContainer />
      )}
    </div>
  );
};
