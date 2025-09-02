import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchCryptoData, getPage } from "./coinsSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { useCurrencyStore } from "@/app/store/currencyStore";

export const FetchCoins = () => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const page = useSelector(getPage);
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.name.toString()}&order=market_cap_desc&per_page=100&page=${page.toString()}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

  useEffect(() => {
    dispatch(fetchCryptoData(apiUrl));
  }, [selectedCurrency]);

  return null;
};
