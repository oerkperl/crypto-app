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
    <div className="w-full h-full flex items-center py-2 relative">
      <div className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm w-full">
        <div className="flex items-center gap-2">
          {type === "coin" && (
            <span className="w-5 h-5 sm:w-6 sm:h-6">
              {hasData ? (
                <Image
                  src={image as string}
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  alt="coin image"
                />
              ) : (
                <BlinkingGradientLoader width="24px" height="24px" />
              )}
            </span>
          )}
          {type === "currency" && (
            <span className="bg-indigo-700 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs">
              {symbol}
            </span>
          )}

          <label className="font-medium text-xs sm:text-sm">{title}</label>
        </div>
        <input
          type="number"
          value={amount}
          onChange={handler}
          placeholder={title}
          className="py-2 sm:py-1 px-2 sm:px-1 rounded w-full bg-gray-100 dark:bg-input-bg shadow-md text-sm sm:text-base min-h-[44px] sm:min-h-auto"
        />
        <div className="flex w-full">
          <label className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {hasData ? (
              lable
            ) : (
              <BlinkingGradientLoader width="150px" height="12px" />
            )}
          </label>
        </div>
      </div>
    </div>
  );
};
