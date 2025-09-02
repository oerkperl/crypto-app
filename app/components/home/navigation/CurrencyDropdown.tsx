import { useCurrencyStore } from "@/app/store";
import { useAppDispatch } from "@/app/lib/hooks";
import { reset } from "../coinsList/coinsSlice";

export const CurrencyDropdown = () => {
  // ✅ Zustand: Only subscribes to currency-related state
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const currencies = useCurrencyStore((state) => state.currencies);
  const setSelectedCurrency = useCurrencyStore((state) => state.setSelectedCurrency);
  
  const dispatch = useAppDispatch();

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCurrencyObject = currencies.find(
      (currency) => currency.name === event.target.value
    );
    if (selectedCurrencyObject) {
      setSelectedCurrency(selectedCurrencyObject);
    }
    dispatch(reset());
  };

  return (
    <select
      id="currency"
      value={selectedCurrency.name}
      onChange={handleCurrencyChange}
      className="bg-gray-100 dark:bg-input-bg rounded dark:text-white focus:outline-none min-h-[44px] sm:h-8 px-2 sm:px-1 shadow-md text-sm sm:text-xs w-full sm:w-auto"
    >
      {currencies.map((currency) => (
        <option key={currency.name} value={currency.name}>
          {currency.name.toUpperCase()} - {currency.sym}
        </option>
      ))}
    </select>
  );
};
