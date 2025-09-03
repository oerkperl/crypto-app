import { useCurrencyStore, useCoinsStore } from "@/store";

export const CurrencyDropdown = () => {
  // ✅ Zustand: Only subscribes to currency-related state
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const currencies = useCurrencyStore((state) => state.currencies);
  const setSelectedCurrency = useCurrencyStore(
    (state) => state.setSelectedCurrency
  );

  // Use Zustand store reset instead of Redux
  const setCoins = useCoinsStore((state) => state.setCoins);
  const setPage = useCoinsStore((state) => state.setPage);
  const setStatus = useCoinsStore((state) => state.setStatus);

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCurrencyObject = currencies.find(
      (currency) => currency.name === event.target.value
    );
    if (selectedCurrencyObject) {
      setSelectedCurrency(selectedCurrencyObject);
    }
    // Reset coins when currency changes
    setCoins([]);
    setPage(1);
    setStatus("idle");
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
