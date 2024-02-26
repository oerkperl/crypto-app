import React from "react";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const MyAsset: React.FC<{
  asset: any;
  fetchAsset: () => void;
  hasError: boolean;
}> = ({ asset, fetchAsset, hasError }) => {
  const refeshIcon = <FontAwesomeIcon icon={faRotateRight} />;

  const marketCapVvolume = Math.round(
    (asset?.total_volume / asset?.market_cap) * 100
  );

  const circulatingVtotalSupply = Math.round(
    (asset?.circulating_supply / asset?.total_supply) * 100
  );

  return (
    <>
      <div className="flex justify-between">
        <h1>Market price</h1>

        {hasError && (
          <button
            className="px-1 rounded-md hover:bg-indigo-600 hover:text-white"
            onClick={() => {
              fetchAsset();
            }}
          >
            {refeshIcon}
          </button>
        )}
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex flex-col gap-2 w-1/4 ">
          <p className="text-xs">Current price</p>
          <span className="text-[#00B1A7] text-sm">
            {hasError ? (
              <BlinkingGradientLoader width="100px" />
            ) : (
              "$" + asset?.current_price
            )}
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/4 ">
          <h2 className="text-xs">Price change 24h</h2>
          <span className="text-[#00B1A7] text-sm">
            {hasError ? (
              <BlinkingGradientLoader width="100px" />
            ) : (
              " $" + asset?.price_change_percentage_24h
            )}
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/4 ">
          <h2 className="text-xs">Market Cap vs Volume</h2>
          <div className="text-[#00B1A7] text-sm flex items-center  gap-2">
            {hasError ? "" : marketCapVvolume + "%"}
            <ProgressBar progress={marketCapVvolume.toString()} width="50px" />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-1/4 ">
          <h2 className="text-xs">Circulatin supply vs Total supply</h2>
          <div className="text-[#00B1A7] text-sm flex items-center  gap-2">
            {hasError ? "" : circulatingVtotalSupply + "%"}
            <ProgressBar
              progress={circulatingVtotalSupply.toString()}
              width="50px"
            />
          </div>
        </div>
      </div>
    </>
  );
};
