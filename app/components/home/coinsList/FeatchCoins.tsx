import { useEffect } from "react";
//import { Section, SpinnerContainer } from "../../styled";
//import { Wrapper, Item, CoinItem } from "../styled";
//import { LoadingCoin } from "./LoadingCoin";
import { useSelector } from "react-redux";
import { fetchCryptoData, getCoins, getStatus, getPage } from "./coinsSlice";
import { useAppDispatch } from "@/app/lib/hooks";
//import { CoinRow } from "./CoinRow";
import { useCryptoContext } from "@/app/context/context";
//import { removeDuplicates } from "@/app/lib/utils/formatters";

export const FetchCoins = () => {
  const dispatch = useAppDispatch();
  //let coins = removeDuplicates(useSelector(getCoins), "id");
  const coinsStatus = useSelector(getStatus);
  const { selectedCurrency } = useCryptoContext();
  const page = useSelector(getPage);
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.name.toString()}&order=market_cap_desc&per_page=100&page=${page.toString()}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

  useEffect(() => {
    dispatch(fetchCryptoData(apiUrl));
  }, [selectedCurrency]);

  return null;
};
