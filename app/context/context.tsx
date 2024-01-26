"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { CryptoContextValue } from "@/app/lib/types";

export const CryptoContext = createContext<CryptoContextValue | undefined>(
  undefined
);

const CryptoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  function useLocalState<T>(key: string, initialValue: T) {
    const storedValue = window.localStorage.getItem(key);
    const item = storedValue ? JSON.parse(storedValue) : initialValue;
    const [state, setState] = useState<T>(item);

    const updateState = (value: T) => {
      window.localStorage.setItem(key, JSON.stringify(value));
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

  const [selectedPeriod, setSelectedPeriod] = useState<string>("1M");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const val: CryptoContextValue = {
    setSelectedPeriod,
    setSelectedCurrency,
    selectedPeriod,
    selectedCurrency,
    currencies,
  };

  return (
    <CryptoContext.Provider value={val}>{children}</CryptoContext.Provider>
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
