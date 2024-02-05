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
  setCurrentChart: Dispatch<SetStateAction<any>>;
  setSelectedCurrency: Dispatch<SetStateAction<TCurrency>>;
  selectedPeriod: string;
  selectedOption: string;
  currentChart: any;
  selectedCurrency: TCurrency;
  currencies: TCurrency[];
};
