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
  setSelectedCurrency: Dispatch<SetStateAction<TCurrency>>;
  selectedPeriod: string;
  selectedCurrency: TCurrency;
  currencies: TCurrency[];
};
