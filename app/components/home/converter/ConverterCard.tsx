import React from "react";

interface CoinProps {
  type: string;
  image?: string;
  symbol?: string;
  currency: string;
  amount: number;
  lable: string;
  handler: (e: any) => void;
}
export const ConverterCar: React.FC<CoinProps> = ({
  type,
  image,
  symbol,
  currency,
  amount,
  lable,
  handler,
}) => {
  return (
    <div className="w-1/2 h-full bg-white dark:bg-gray-800 rounded-xl flex items-center pl-8 ">
      <div className="flex flex-col gap-4 text-sm w-4/5">
        <div className="flex items-center gap-2">
          {type === "coin" && (
            <span className=" w-10 h-10 ">
              <img src={image} width={100} height={100} />
            </span>
          )}
          {type === "currency" && (
            <span className="bg-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center">
              {symbol}
            </span>
          )}
          <label>{currency?.toUpperCase()}</label>
        </div>
        <input
          type="number"
          value={amount}
          onChange={handler}
          placeholder={currency}
          className="bg-transparent border-b border-gray-300 pb-2"
        />
        <label>{lable}</label>
      </div>
    </div>
  );
};
