import React from "react";
import Image from "next/image";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

type CoinProps = {
  type: string;
  image?: string;
  symbol?: string;
  currency: string;
  amount: number;
  lable: string;
  handler: (e: any) => void;
  hasData: boolean;
};
export const ConverterCard: React.FC<CoinProps> = ({
  type,
  image,
  symbol,
  currency,
  amount,
  lable,
  handler,
  hasData,
}) => {
  return (
    <div className="w-1/2 h-full bg-white dark:bg-gray-800 rounded-xl flex items-center pl-8 ">
      <div className="flex flex-col gap-4 text-sm w-4/5">
        <div className="flex items-center gap-2">
          {type === "coin" && (
            <span className=" w-10 h-10 ">
              {hasData ? (
                <Image
                  src={image as string}
                  width={100}
                  height={100}
                  alt="coin image"
                />
              ) : (
                <BlinkingGradientLoader width="50px" height="40px" />
              )}
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
        <label>
          {hasData ? lable : <BlinkingGradientLoader width="200px" />}
        </label>
      </div>
    </div>
  );
};
