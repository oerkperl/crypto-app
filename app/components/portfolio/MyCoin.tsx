import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useCryptoContext } from "@/app/context/context";
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
  const { UpdateAmount, removeAsset } = useCryptoContext();
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
      UpdateAmount(myCoin?.id, coinAmount);
      setIsEditing((prev) => !prev);
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <h1>Your coin</h1>
        <div className="flex gap-2">
          <button
            className="px-1 rounded-md hover:bg-indigo-600 hover:text-white"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {editIcon}
          </button>
        </div>
      </div>
      <div className="flex justify-between  mt-2">
        <div className="flex flex-col gap-2 w-1/4 ">
          <p className="text-xs">Amount</p>
          {!isEditing && (
            <span className="text-[#00B1A7] text-sm"> {myCoin?.amount}</span>
          )}
          {isEditing && (
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="number"
                className="max-w-32 px-1 rounded-md bg-transparent border border-gray-300"
                value={coinAmount}
                onChange={(e: any) => setCoinAmount(e.target.value)}
              />
              <button
                style={{ marginLeft: ".5rem" }}
                onClick={handleSubmit}
                className="px-1 rounded-md hover:bg-green-600 hover:text-white"
              >
                {checkIcon}
              </button>
            </form>
          )}
        </div>
        <div className="flex flex-col gap-2 w-1/4 ">
          <h2 className="text-xs">Value</h2>
          <span className="text-[#00B1A7] text-sm">
            {hasError ? <BlinkingGradientLoader width="100px" /> : "$" + value}
          </span>
        </div>
        <div className="flex flex-col  gap-2  w-1/4 ">
          <h2 className="text-xs">Price change since purchase</h2>
          <span className="text-[#00B1A7] text-sm">
            {hasError ? (
              <BlinkingGradientLoader width="100px" />
            ) : (
              <TrendLabel value={priceChangeSincePurchase} percentage={true} />
            )}
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/4 ">
          <h2 className="text-xs">Purchase date</h2>
          <span className="text-[#00B1A7] text-sm">{myCoin?.purchaseDate}</span>
        </div>
      </div>
    </>
  );
};
