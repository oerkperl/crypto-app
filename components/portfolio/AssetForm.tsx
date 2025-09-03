import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useUIStore, usePortfolioStore, useUtilsStore } from "@/store";
import { TAsset } from "@/store";
import { SelectCoin } from "./SelectCoin";
import { getCurrentDate } from "@/lib/utils/formatters";
import { apiHelpers } from "@/lib/api/coingecko";

interface AssetFormProps {
  onClose: () => void;
}

export const AssetForm: React.FC<AssetFormProps> = ({ onClose }) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wantsToSave, setWantsToSave] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<any>({});
  const [canSelect, setCanSelect] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  // ✅ Zustand: Selective subscriptions to portfolio and UI stores
  const selectedCoinId = useUIStore((state) => state.selectedCoinId);
  const addAsset = usePortfolioStore((state) => state.addAsset);
  const setErrorMessage = useUtilsStore((state) => state.setErrorMessage);

  const hasCoin: boolean = Object.entries(selectedCoin).length !== 0;
  const hasAmount: boolean = amount !== undefined && amount >= 0;
  const canAddAsset: boolean = hasAmount && hasCoin;

  const date: string = getCurrentDate();

  const fetchData = async () => {
    try {
      const data = await apiHelpers.getCoinMarkets({
        ids: selectedCoinId,
        perPage: 1,
      });
      if (data && data[0]) {
        setIsLoading(false);
        setSelectedCoin(data[0]);
        setHasError(false);
        setCanSelect(false);
      }
    } catch (error) {
      setErrorMessage("Network error:try again later", 3000);
      setNotification("Network error:try again later");
      setHasError(true);
    }
  };

  const addNewAsset = () => {
    const asset: TAsset = {
      id: selectedCoin?.id,
      name: selectedCoin?.name,
      amount: amount !== undefined ? amount : 0,
      purchaseDate: date,
      image: selectedCoin?.image,
      symbol: selectedCoin?.symbol,
      priceDuringPurchase: selectedCoin?.current_price,
    };
    if (canAddAsset) {
      addAsset(asset);
      setSelectedCoin({});
      setAmount(0);
      setQuery("");
      onClose();
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);
    if (inputValue < 0) {
      setErrorMessage("Negative input attempt", 3000);
      setNotification("Negative input attempt");
    } else {
      setAmount(inputValue);
    }
  };

  useEffect(() => {
    if (!hasCoin && hasAmount) {
      setNotification("Select a coin");
    }
    if (!hasAmount && hasCoin) {
      setNotification("Choose amount");
    }
    if (!hasAmount && !hasCoin) {
      setNotification("Complete the form please");
    }
    if (wantsToSave === false) {
      setNotification("");
    }
  }, [wantsToSave]);

  return (
    <div className="w-full">
      {/* Error/Notification Display */}
      {notification !== "" && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-red-600 dark:text-red-400 text-sm">
            {notification}
          </p>
        </div>
      )}

      {/* Form Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Fields */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Coin Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-1/5">
              <label className="text-sm font-medium">Coin</label>
            </div>
            <div
              className={`min-h-[44px] w-full sm:w-4/5 shadow-md bg-white dark:bg-input-bg rounded flex items-center
              ${
                !hasCoin && wantsToSave
                  ? "border-2 border-pink-600"
                  : "border border-gray-300 dark:border-gray-600"
              }`}
            >
              <SelectCoin
                fetchData={fetchData}
                query={query}
                setQuery={setQuery}
                canSelect={canSelect}
                setCanSelect={setCanSelect}
                hasError={hasError}
              />
            </div>
          </div>

          {/* Amount Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-1/5">
              <label className="text-sm font-medium">Amount</label>
            </div>
            <div className="w-full sm:w-4/5">
              <input
                className={`min-h-[44px] w-full shadow-md rounded px-3 bg-white dark:bg-input-bg outline-none text-base
                ${
                  !hasAmount && wantsToSave
                    ? "border-2 border-pink-600"
                    : "border border-gray-300 dark:border-gray-600"
                }
                `}
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>
        </div>

        {/* Coin Preview */}
        <div className="w-full lg:w-1/3 rounded flex flex-col gap-3 items-center justify-center bg-gray-50 dark:bg-gray-800 p-4 min-h-[120px]">
          <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center rounded-md bg-gray-300 dark:bg-gray-900">
            <Image
              src={
                selectedCoin?.image ||
                "https://i.ibb.co/WW7YRBv/Default-bitcoin-thumnail-centred-3.jpg"
              }
              height={60}
              width={60}
              className="w-12 h-12 sm:w-[70px] sm:h-[70px]"
              alt="coin image"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm sm:text-base font-medium">
              {selectedCoin?.name || "No coin selected"}
            </p>
            {hasCoin && (
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {`(${selectedCoin?.symbol?.toUpperCase()})`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full sm:w-32 min-h-[44px] bg-gray-500 hover:bg-gray-600 rounded-md text-white transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={`w-full sm:w-32 min-h-[44px] rounded-md text-white transition-colors ${
            canAddAsset
              ? "bg-green-600 hover:bg-green-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          onClick={() => {
            canAddAsset ? addNewAsset() : "";
          }}
          onMouseEnter={() => setWantsToSave(true)}
          onMouseLeave={() => setWantsToSave(false)}
        >
          Save Asset
        </button>
      </div>
    </div>
  );
};
