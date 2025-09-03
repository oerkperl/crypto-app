import { useEffect } from "react";
import { useCoinsStore } from "@/store";
import { useCurrencyStore } from "@/store/currencyStore";

export const FetchCoins = () => {
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const fetchCoins = useCoinsStore((state) => state.fetchCoins);
  
  useEffect(() => {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.name.toString()}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
    fetchCoins(apiUrl);
  }, [selectedCurrency.name]);

  return null;
};
