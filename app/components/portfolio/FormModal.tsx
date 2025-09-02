import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useUIStore, usePortfolioStore, useUtilsStore } from "@/store";
import { getCurrentDate } from "@/app/lib/utils/formatters";
import { TAsset } from "@/store";
import { SelectCoin } from "./SelectCoin";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormModal: React.FC<ModalProps> = ({ onClose }) => {
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
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedCoinId}&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

  const fetchData = async () => {
    try {
      const { data } = await axios(url);
      if (data) {
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
    <main>
      <section>
        <div className="w-full max-w-[800px] min-h-[40vh] p-4 sm:p-6">
          <div className="w-full flex items-center justify-center h-full">
            <div className="w-full">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0">
                <h1 className="text-lg sm:text-xl font-semibold">Add Asset</h1>
                <div className="flex items-center gap-3">
                  {notification !== "" && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {notification}
                    </p>
                  )}
                  <button
                    className="w-8 h-8 rounded-full shadow-md bg-gray-100 dark:bg-input-bg hover:bg-indigo-600 hover:text-white transition-colors flex items-center justify-center"
                    onClick={onClose}
                  >
                    ×
                  </button>
                </div>
              </div>

              <hr className="my-4 sm:my-6 border-gray-300 dark:border-gray-700" />

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

              <hr className="my-4 sm:my-6 border-gray-300 dark:border-gray-700" />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-2">
                <button
                  className="w-full sm:w-32 min-h-[44px] bg-pink-700 rounded-md hover:bg-pink-600 text-gray-200 hover:text-white transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className={`w-full sm:w-32 min-h-[44px] rounded-md text-gray-200 transition-colors ${
                    canAddAsset
                      ? "bg-green-700 text-white hover:bg-green-600"
                      : "bg-indigo-600 hover:bg-indigo-700 hover:text-white"
                  }`}
                  onClick={() => {
                    canAddAsset ? addNewAsset() : "";
                  }}
                  onMouseEnter={() => setWantsToSave(true)}
                  onMouseLeave={() => setWantsToSave(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
