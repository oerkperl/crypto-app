import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { TrendLabel } from "@/components/TrendLable";
import { usePortfolioStore } from "@/store";
import { BlinkingGradientLoader } from "@/lib/utils/components/BlinkingLoader";
import { ProgressBar } from "@/lib/utils/components/ProgressBar";

export const MyAsset: React.FC<{
  myCoin: any;
  asset: any;
  fetchAsset: () => void;
  hasError: boolean;
}> = ({ myCoin, asset, fetchAsset, hasError }) => {
  const removeAsset = usePortfolioStore((state) => state.removeAsset);

  const marketCapVolume =
    asset?.total_volume && asset?.market_cap
      ? Math.round((asset.total_volume / asset.market_cap) * 100)
      : 0;

  const circulatingVtotalSupply =
    asset?.circulating_supply && asset?.total_supply
      ? Math.round((asset.circulating_supply / asset.total_supply) * 100)
      : 0;

  const priceChange = asset?.price_change_percentage_24h || 0;

  return (
    <div className="p-4 h-full">
      {/* Header with actions */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Market Data
        </h3>
        <div className="flex gap-2">
          {hasError && (
            <button
              className="px-3 py-1.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-2 text-sm"
              onClick={fetchAsset}
            >
              <FontAwesomeIcon icon={faRotateRight} className="text-xs" />
              Retry
            </button>
          )}
          <button
            className="px-3 py-1.5 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2 text-sm"
            onClick={() => {
              console.log("Delete clicked for coin:", myCoin?.id);
              removeAsset(myCoin?.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
            Remove
          </button>
        </div>
      </div>

      {/* Price data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Current Price
          </p>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {hasError ? (
              <BlinkingGradientLoader width="80px" />
            ) : (
              `$${asset?.current_price?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}`
            )}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            24h Change
          </p>
          <div className="text-lg font-bold">
            {hasError ? (
              <BlinkingGradientLoader width="80px" />
            ) : (
              <TrendLabel value={priceChange} percentage={true} />
            )}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Market Cap vs Volume
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {hasError ? "" : `${marketCapVolume}%`}
            </span>
            <div className="flex-1 min-w-0">
              <ProgressBar
                progress={hasError ? "0" : marketCapVolume.toString()}
                width="100%"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Circulating vs Total Supply
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {hasError ? "" : `${circulatingVtotalSupply}%`}
            </span>
            <div className="flex-1 min-w-0">
              <ProgressBar
                progress={hasError ? "0" : circulatingVtotalSupply.toString()}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
