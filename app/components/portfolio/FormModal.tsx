import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useCryptoContext } from "@/app/context/context";
import { getCurrentDate } from "@/app/lib/utils/formatters";
import { TAsset } from "@/app/lib/types";
import { Main, Section } from "../styled";
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
  const { selectedCoinId, addAsset, setErrorMessage } = useCryptoContext();
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
      setErrorMessage(setNotification, "Network error:try again later", 3000);
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
      setErrorMessage(setNotification, "Negative input attempt", 3000);
    } else {
      setAmount(inputValue);
    }
  };

  useEffect(() => {
    if (!hasCoin && hasAmount) {
      setErrorMessage(setNotification, "No Coin Selected", 5000);
    }
    if (!hasAmount && hasCoin) {
      setErrorMessage(setNotification, "Select amount", 5000);
    }
    if (!hasAmount && !hasCoin && wantsToSave) {
      setErrorMessage(setNotification, "Complete the form please.", 5000);
    }
  }, [wantsToSave]);

  return (
    <Main>
      <Section>
        <div className="flex  w-[1000px] h-[80vh]">
          <div className=" w-full flex items-center justify-center h-full">
            <div className="w-full bg-white dark:bg-accent-bg shadow-md p-8 rounded-xl">
              <div className="flex justify-between">
                <h1>Select a coin</h1>
                {notification !== "" && <p>{notification}</p>}
                <button
                  className="w-8 h-8  rounded-full shadow-md bg-gray-100 dark:bg-input-bg hover:bg-indigo-600 hover:text-white"
                  onClick={onClose}
                >
                  X
                </button>
              </div>
              <div className="flex gap-4  py-4">
                <div className="w-1/3  rounded-lg bg-gray-100 dark:bg-input-bg shadow-md flex flex-col items-center justify-center">
                  <div className=" h-20 w-20 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-900">
                    <Image
                      src={
                        selectedCoin?.image ||
                        "https://i.ibb.co/WW7YRBv/Default-bitcoin-thumnail-centred-3.jpg"
                      }
                      height={70}
                      width={70}
                      alt="coin image"
                    />
                  </div>
                  <div>{selectedCoin?.name || "No coin selected"}</div>
                  <div>{`(${
                    selectedCoin?.symbol?.toUpperCase() || " ... "
                  })`}</div>
                </div>
                <div className="w-2/3  flex flex-col gap-6">
                  <div
                    className={`h-12 w-full shadow-md bg-gray-100 dark:bg-input-bg rounded-lg flex items-center
                  ${
                    !hasCoin && wantsToSave
                      ? "border border-pink-600"
                      : "border-0"
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
                  <input
                    className={`h-12 w-full shadow-md rounded-lg pl-2 bg-gray-100 dark:bg-input-bg outline-none
                    ${
                      !hasAmount && wantsToSave
                        ? "border border-pink-600"
                        : "border-0"
                    }
                    `}
                    type="number"
                    placeholder={"Amount"}
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <div className="flex gap-2">
                    <button
                      className=" w-1/2 h-12 bg-pink-700 rounded-lg hover:bg-pink-600 text-gray-200 hover:text-white "
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      className={`w-1/2 h-12 rounded-lg  text-gray-200 ${
                        canAddAsset
                          ? "bg-green-700 text-white hover:bg-green-600"
                          : "bg-indigo-600 hover:bg-input-bg hover:text-white"
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
          </div>
        </div>
      </Section>
    </Main>
  );
};
