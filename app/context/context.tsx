"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { CryptoContextValue, TAsset } from "@/app/lib/types";
import { GlobalStyle } from "../components/styled";
import { ThemeProvider } from "next-themes";
import { getNumberOfDays } from "../lib/utils/formatters";

export const CryptoContext = createContext<CryptoContextValue | undefined>(
  undefined
);

const CryptoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  function useLocalState<T>(key: string, initialValue: T) {
    const storedValue = localStorage.getItem(key);
    const item = storedValue ? JSON.parse(storedValue) : initialValue;
    const [state, setState] = useState<T>(item);

    const updateState = (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    };

    return [state, updateState] as const;
  }
  const currencies = [
    { name: "usd", sym: "$" },
    { name: "gbp", sym: "£" },
    { name: "eur", sym: "€" },
    { name: "btc", sym: "₿" },
    { name: "eth", sym: "Ξ" },
  ];
  const [assets, setAssets] = useLocalState<TAsset[]>("assets", []);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1M");
  const [currentChart, setCurrentChart] = useState<any>({});
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedOption, setSelectedOption] = useState("Coins");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewingCoinId, setViewingCoinId] = useState<string>("");
  const [selectedCoinId, setSelectedCoinId] = useState<string>("");
  const [canVisit, setCanVisit] = useState<boolean>(false);
  const days = getNumberOfDays(selectedPeriod).toString();
  const baseUrl = `https://api.coingecko.com/api/v3/coins/${
    currentChart?.id || "bitcoin"
  }/market_chart?`;
  const params = new URLSearchParams({
    vs_currency: selectedCurrency.name,
    days: days,
    interval: "daily",
  });
  const chartUrl = `${baseUrl}${params}`;

  const addAsset = (asset: TAsset) => {
    if (assets.some((existingAsset) => existingAsset.id === asset.id)) return;
    setAssets([...assets, asset]);
  };
  const getAssets = () => {
    return assets;
  };
  const removeAsset = (asset: TAsset) => {
    const filtered = assets.filter((a) => a.id !== asset.id);
    setAssets(filtered);
  };

  const UpdateAmount = (id: string, newAmount: number) => {
    const filtered = assets.map((a) =>
      a.id === id ? { ...a, amount: newAmount } : a
    );
    setAssets(filtered);
  };

  const val: CryptoContextValue = {
    setSelectedPeriod,
    setSelectedCurrency,
    setCurrentChart,
    setSelectedOption,
    setViewingCoinId,
    setIsOpen,
    setCanVisit,
    setSelectedCoinId,
    addAsset,
    getAssets,
    removeAsset,
    UpdateAmount,
    currentChart,
    selectedPeriod,
    selectedCurrency,
    currencies,
    selectedOption,
    isOpen,
    viewingCoinId,
    canVisit,
    selectedCoinId,
    assets,
    chartUrl,
  };

  return (
    <CryptoContext.Provider value={val}>
      <ThemeProvider attribute="class">
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </CryptoContext.Provider>
  );
};

const useCryptoContext = (): CryptoContextValue => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error(
      "useCryptoContext must be used within a CryptoContextProvider"
    );
  }
  return context;
};

export { CryptoContextProvider, useCryptoContext };
