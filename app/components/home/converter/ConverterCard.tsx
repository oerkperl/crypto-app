import React from "react";
import Image from "next/image";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

type CoinProps = {
  type: string;
  image?: string;
  symbol?: string;
  amount: number;
  lable: string;
  handler: (e: any) => void;
  hasData: boolean;
  notification: string;
  title: string;
};
export const ConverterCard: React.FC<CoinProps> = ({
  type,
  image,
  symbol,
  amount,
  lable,
  handler,
  hasData,
  title,
}) => {
  return (
    <div className="w-full h-full flex items-center  py-2  relative">
      <div className="flex flex-col gap-3 text-sm w-full ">
        <div className="flex items-center gap-2">
          {type === "coin" && (
            <span className=" w-5 h-5 ">
              {hasData ? (
                <Image
                  src={image as string}
                  width={50}
                  height={50}
                  alt="coin image"
                />
              ) : (
                <BlinkingGradientLoader width="50px" height="20px" />
              )}
            </span>
          )}
          {type === "currency" && (
            <span className="bg-indigo-700 text-white w-5 h-5 rounded-full flex items-center justify-center">
              {symbol}
            </span>
          )}

          <label>{title}</label>
        </div>
        <input
          type="number"
          value={amount}
          onChange={handler}
          placeholder={title}
          className="py-0.5 px-1 rounded w-full bg-gray-100 dark:bg-input-bg shadow-md"
        />
        <div className="flex w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
          <label>
            {hasData ? lable : <BlinkingGradientLoader width="200px" />}
          </label>
        </div>
      </div>
    </div>
  );
};
