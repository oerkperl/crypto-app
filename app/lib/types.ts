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

export type TAsset = {
  id: string;
  name: string;
  amount: number;
  purchaseDate: string;
  image: string;
  symbol: string;
  priceDuringPurchase: string;
};

export type CryptoContextValue = {
  setSelectedPeriod: Dispatch<SetStateAction<string>>;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  setViewingCoinId: Dispatch<SetStateAction<string>>;
  setSelectedCoinId: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCanVisit: Dispatch<SetStateAction<boolean>>;
  setCurrentChart: Dispatch<SetStateAction<any>>;
  setSelectedCurrency: Dispatch<SetStateAction<TCurrency>>;
  addAsset: (asset: TAsset) => void;
  UpdateAmount: (id: string, amount: number) => void;
  removeAsset: (asset: TAsset) => void;
  getAssets: () => TAsset[];
  setErrorMessage: (handler: any, message: string, duration: number) => void;
  selectedPeriod: string;
  selectedOption: string;
  isOpen: boolean;
  currentChart: any;
  selectedCurrency: TCurrency;
  currencies: TCurrency[];
  viewingCoinId: string;
  canVisit: boolean;
  selectedCoinId: string;
  assets: TAsset[];
  chartUrl: string;
};
