import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { useCryptoContext } from "@/app/context/context";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const MyCoin: React.FC<{
  myCoin: any;
  asset: any;
  hasError: boolean;
}> = ({ myCoin, asset, hasError }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [coinAmount, setCoinAmount] = useState<number>(myCoin?.amount);
  const { UpdateAmount } = useCryptoContext();
  const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
  const checkIcon = <FontAwesomeIcon icon={faCheck} />;
  const value = myCoin?.amount * asset?.current_price;

  const calculatPriceChange = (oldVal: number, newVal: number): number => {
    return ((newVal - oldVal) / oldVal) * 100;
  };

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
      <div className="flex justify-between mt-2">
        <h1>Your coin</h1>
        <button
          className="px-1 rounded-md hover:bg-indigo-600"
          onClick={() => {
            setIsEditing((prev) => !prev);
          }}
        >
          {editIcon}
        </button>
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
                className="max-w-24 px-1"
                value={coinAmount}
                onChange={(e: any) => setCoinAmount(e.target.value)}
              />
              <button style={{ marginLeft: ".5rem" }} onClick={handleSubmit}>
                {checkIcon}
              </button>
            </form>
          )}
        </div>
        <div className="flex flex-col gap-2 w-1/4 ">
          <h2 className="text-xs">Value</h2>
          <span className="text-[#00B1A7] text-sm">
            {" "}
            {hasError ? <BlinkingGradientLoader width="70px" /> : "$" + value}
          </span>
        </div>
        <div className="flex flex-col  gap-2  w-1/4 ">
          <h2 className="text-xs">Price change since purchase</h2>
          <span className="text-[#00B1A7] text-sm">
            {hasError ? (
              <BlinkingGradientLoader width="100px" />
            ) : (
              priceChangeSincePurchase.toFixed(2) + "%"
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