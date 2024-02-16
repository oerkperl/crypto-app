import { Dispatch, SetStateAction } from "react";
export type TChartLables = {
  title: string;
  amount: any;
  date: string;
};
type TCurrency = {
  name: string;
  sym: string;
};
export type CryptoContextValue = {
  setSelectedPeriod: Dispatch<SetStateAction<string>>;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  setViewingCoinId: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentChart: Dispatch<SetStateAction<any>>;
  setSelectedCurrency: Dispatch<SetStateAction<TCurrency>>;
  selectedPeriod: string;
  selectedOption: string;
  isOpen: boolean;
  currentChart: any;
  selectedCurrency: TCurrency;
  currencies: TCurrency[];
  viewingCoinId: string;
};
