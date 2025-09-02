import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Currency = {
  name: string;
  sym: string;
};

interface CurrencyState {
  currencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  devtools(
    (set) => ({
      currencies: [
        { name: "usd", sym: "$" },
        { name: "gbp", sym: "£" },
        { name: "eur", sym: "€" },
        { name: "btc", sym: "₿" },
        { name: "eth", sym: "Ξ" },
      ],
      selectedCurrency: { name: "usd", sym: "$" },
      setSelectedCurrency: (currency) =>
        set({ selectedCurrency: currency }, false, 'setSelectedCurrency'),
    }),
    {
      name: 'currency-store',
    }
  )
);
