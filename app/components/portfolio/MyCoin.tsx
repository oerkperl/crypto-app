import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { usePortfolioStore } from "@/app/store/portfolioStore";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
import { calculatPriceChange } from "@/app/lib/utils/formatters";
import { TrendLabel } from "../TrendLable";

export const MyCoin: React.FC<{
  myCoin: any;
  asset: any;
  hasError: boolean;
}> = ({ myCoin, asset, hasError }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [coinAmount, setCoinAmount] = useState<number>(myCoin?.amount);
  const updateAmount = usePortfolioStore((state) => state.updateAmount);
  const removeAsset = usePortfolioStore((state) => state.removeAsset);
  const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
  const checkIcon = <FontAwesomeIcon icon={faCheck} />;
  const value = myCoin?.amount * asset?.current_price;

  const priceChangeSincePurchase = calculatPriceChange(
    myCoin?.priceDuringPurchase,
    asset?.current_price
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (coinAmount >= 0) {
      updateAmount(myCoin?.id, coinAmount);
      setIsEditing((prev) => !prev);
    }
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h1 className="font-medium">Your coin</h1>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 rounded-md hover:bg-indigo-600 hover:text-white transition-colors min-h-[44px] sm:min-h-auto flex items-center justify-center"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {editIcon}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Amount
          </p>
          {!isEditing && (
            <span className="text-[#00B1A7] text-sm font-semibold">
              {" "}
              {myCoin?.amount}
            </span>
          )}
          {isEditing && (
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <input
                type="number"
                className="flex-1 max-w-32 px-2 py-1 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 text-sm min-h-[44px] sm:min-h-auto"
                value={coinAmount}
                onChange={(e: any) => setCoinAmount(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="px-2 py-1 rounded-md hover:bg-green-600 hover:text-white transition-colors min-h-[44px] sm:min-h-auto flex items-center justify-center"
              >
                {checkIcon}
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Value
          </h2>
          <span className="text-[#00B1A7] text-sm font-semibold">
            {hasError ? <BlinkingGradientLoader width="100px" /> : "$" + value}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Price change since purchase
          </h2>
          <span className="text-[#00B1A7] text-sm">
            {hasError ? (
              <BlinkingGradientLoader width="100px" />
            ) : (
              <TrendLabel value={priceChangeSincePurchase} percentage={true} />
            )}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Purchase date
          </h2>
          <span className="text-[#00B1A7] text-sm font-medium">
            {myCoin?.purchaseDate}
          </span>
        </div>
      </div>
    </>
  );
};
