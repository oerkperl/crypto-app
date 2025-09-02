import React from "react";
import { ProgressBar } from "@/app/lib/utils/components/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
import { TrendLabel } from "@/app/components/TrendLable";
import { usePortfolioStore } from "@/store/portfolioStore";

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
    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Market Data
        </h2>
        <div className="flex gap-2">
          {hasError && (
            <button
              className="px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors flex items-center gap-2"
              onClick={fetchAsset}
            >
              <FontAwesomeIcon icon={faRotateRight} className="text-sm" />
              <span className="text-sm font-medium">Retry</span>
            </button>
          )}
          {!hasError && (
            <button
              className="px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2"
              onClick={() => removeAsset(myCoin?.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
              <span className="text-sm font-medium">Remove</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3">
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

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3">
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

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Market Cap vs Volume
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {hasError ? "" : `${marketCapVolume}%`}
            </span>
            <ProgressBar
              progress={hasError ? "0" : marketCapVolume.toString()}
              width="60px"
            />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Circulating vs Total Supply
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {hasError ? "" : `${circulatingVtotalSupply}%`}
            </span>
            <ProgressBar
              progress={hasError ? "0" : circulatingVtotalSupply.toString()}
              width="60px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
