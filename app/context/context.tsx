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
  const currencies = [
    { name: "usd", sym: "$" },
    { name: "gbp", sym: "£" },
    { name: "eur", sym: "€" },
    { name: "btc", sym: "₿" },
    { name: "eth", sym: "Ξ" },
  ];
  const [assets, setAssets] = useState<TAsset[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1M");
  const [currentChart, setCurrentChart] = useState<any>({});
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedOption, setSelectedOption] = useState("Charts");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewingCoinId, setViewingCoinId] = useState<string>("");
  const [selectedCoinId, setSelectedCoinId] = useState<string>("");
  const [canVisit, setCanVisit] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
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

  const setErrorMessage = (handler: any, message: string, duration: number) => {
    handler(message);
    setTimeout(function () {
      handler("");
    }, duration);
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
    setErrorMessage,
    setQuery,
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
    query,
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
