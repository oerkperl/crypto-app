import { useCryptoContext } from "@/app/context/context";
import { useAppDispatch } from "@/app/lib/hooks";
import { reset } from "../coinsList/coinsSlice";

export const CurrencyDropdown = () => {
  const { selectedCurrency, setSelectedCurrency, currencies } =
    useCryptoContext();
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
      className="bg-indigo-500 rounded text-white  focus:outline-none focus:border-blue-500 h-9"
    >
      {currencies.map((currency) => (
        <option key={currency.name} value={currency.name}>
          {currency.name.toUpperCase()} - {currency.sym}
        </option>
      ))}
    </select>
  );
};
