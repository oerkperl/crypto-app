import Image from "next/image";
import { TrendLabel } from "./TrendLable";
import { useCryptoContext } from "../context/context";
import { Sparkline } from "./home/coinsList/Sparkline";
export const SingleCoin: React.FC<{ coin: any }> = ({ coin }) => {
  const { selectedCurrency } = useCryptoContext();
  return (
    <>
      <div className=" w-1/6 flex items-center justify-center ml-1 rounded-md bg-gray-300 dark:bg-gray-800">
        <Image
          className=""
          src={coin?.image}
          height={30}
          width={30}
          alt="coin image"
        />
      </div>
      <div className=" flex flex-col  w-1/2">
        <div className="flex w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
          <label>{coin?.name}</label>
          <label>{`(${coin?.symbol.toUpperCase()})`}</label>
        </div>
        <TrendLabel
          value={coin?.price_change_percentage_24h}
          percentage={true}
        />
        <div className="flex">
          <span>{selectedCurrency.sym}</span>
          <span>{coin?.current_price}</span>
        </div>
      </div>
      <div className=" w-2/6 flex items-center">
        <div className="h-10 w-full p-0.5">
          <Sparkline
            Chartdata={coin.sparkline_in_7d.price}
            trend={
              coin.price_change_percentage_7d_in_currency < 0 ? "down" : ""
            }
          />
        </div>
      </div>
    </>
  );
};
