import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { usePortfolioStore } from "@/store";
//import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
//import { calculatPriceChange } from "@/app/lib/utils/formatters";
import { TrendLabel } from "@/components/TrendLable";
import { BlinkingGradientLoader } from "@/lib/utils/components/BlinkingLoader";
import { calculatPriceChange } from "@/lib/utils/formatters";

export const MyCoin: React.FC<{
  myCoin: any;
  asset: any;
  hasError: boolean;
}> = ({ myCoin, asset, hasError }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [coinAmount, setCoinAmount] = useState<number>(myCoin?.amount);
  const updateAmount = usePortfolioStore((state) => state.updateAmount);

  const currentPrice = asset?.current_price || 0;
  const purchasePrice = myCoin?.priceDuringPurchase || 0;
  const amount = myCoin?.amount || 0;

  const currentValue = amount * currentPrice;
  const investedValue = amount * purchasePrice;
  const totalGainLoss = currentValue - investedValue;

  const priceChangeSincePurchase = calculatPriceChange(
    purchasePrice,
    currentPrice
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Edit submitted:', { coinId: myCoin?.id, newAmount: coinAmount });
    if (coinAmount >= 0) {
      updateAmount(myCoin?.id, coinAmount);
      setIsEditing((prev) => !prev);
    }
  };

  return (
    <div className="p-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate mr-2">
          Your Holdings
        </h3>
        <button
          className="px-3 py-1.5 rounded bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 flex-shrink-0"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
          <span className="text-sm">Edit</span>
        </button>
      </div>

      {/* Holdings Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Amount */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 min-w-0">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Amount Owned
          </p>
          {!isEditing ? (
            <div className="text-lg font-bold text-gray-900 dark:text-white break-words">
              {myCoin?.amount} {myCoin?.symbol?.toUpperCase()}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <input
                type="number"
                step="any"
                className="flex-1 min-w-0 px-3 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={coinAmount}
                onChange={(e: any) =>
                  setCoinAmount(parseFloat(e.target.value) || 0)
                }
                placeholder="Enter amount"
              />
              <button
                type="submit"
                className="bg-green-600 text-white rounded px-3 py-2 hover:bg-green-700 transition-colors flex-shrink-0"
              >
                <FontAwesomeIcon icon={faCheck} className="text-sm" />
              </button>
            </form>
          )}
        </div>

        {/* Current Value */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 min-w-0">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Current Value
          </p>
          <div className="text-lg font-bold text-gray-900 dark:text-white break-words">
            {hasError ? (
              <BlinkingGradientLoader width="80px" />
            ) : (
              `$${
                isFinite(currentValue)
                  ? currentValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"
              }`
            )}
          </div>
        </div>
      </div>

      {/* Performance & Purchase Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Total P&L */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 min-w-0">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Total P&L
          </p>
          <div
            className={`text-lg font-bold break-words ${
              totalGainLoss >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {hasError ? (
              <BlinkingGradientLoader width="80px" />
            ) : (
              <>
                {totalGainLoss >= 0 ? "+" : ""}$
                {isFinite(totalGainLoss)
                  ? Math.abs(totalGainLoss).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"}
                <div className="text-sm font-medium mt-1">
                  <TrendLabel
                    value={priceChangeSincePurchase}
                    percentage={true}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Purchase Info */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 min-w-0">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Purchase Price
          </p>
          <div className="text-lg font-bold text-gray-900 dark:text-white break-words">
            $
            {isFinite(purchasePrice)
              ? purchasePrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                })
              : "0.00"}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
            {myCoin?.purchaseDate || "Date unknown"}
          </div>
        </div>
      </div>
    </div>
  );
};
