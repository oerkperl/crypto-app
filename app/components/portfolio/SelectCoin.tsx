import React, { useState } from "react";
import axios from "axios";
import { SpinnerContainer } from "../styled";
import { useCryptoContext } from "@/app/context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons/faRotateRight";

interface ISelectCoin {
  fetchData: () => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  canSelect: boolean;
  hasError: boolean;
  setCanSelect: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SelectCoin: React.FC<ISelectCoin> = ({
  fetchData,
  query,
  setQuery,
  canSelect,
  hasError,
  setCanSelect,
}) => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");
  const { setSelectedCoinId, setErrorMessage } = useCryptoContext();

  let timeout: any | null = null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (value.trim() !== "") {
        fetchResults(value);
      } else {
        setIsLoading(false);
        setResults([]);
        setCanSelect(false);
      }
    }, 1500);
  };

  const fetchResults = async (query: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );

      if (data) {
        setResults(data.coins);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(setNotification, "Possible server timeout", 3000);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.name);
    setSelectedCoinId(suggestion.id);
    setResults([]);
    setCanSelect(true);
  };

  const clear = () => {
    setResults([]);
  };

  return (
    <>
      <div className="relative">
        <div className={`flex px-2 rounded-md  `}>
          <input
            className="px-1 outline-none bg-transparent"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a coin..."
          />
          {canSelect && query !== "" && (
            <button
              className="hover:text-green-500"
              onClick={() => {
                fetchData();
                setResults([]);
              }}
            >
              {hasError ? (
                <FontAwesomeIcon icon={faRotateRight} />
              ) : (
                <FontAwesomeIcon icon={faCheck} />
              )}
            </button>
          )}
        </div>
        <div>
          {query.trim() && (
            <ul className="absolute z-10 w-full max-h-64 overflow-y-scroll mt-1 bg-white dark:bg-accent-bg dark:text-gray-400 shadow-md rounded">
              {results.length > 0 && (
                <div className="flex justify-end px-2">
                  <button onClick={clear}>x</button>
                </div>
              )}
              {results.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleSuggestionClick(result)}
                  className=" w-full p-1 hover:bg-input-bg hover:text-white  "
                >
                  {result.name}
                </li>
              ))}
            </ul>
          )}
          {isLoading && <SpinnerContainer $size="20px" />}
        </div>
      </div>
      {notification !== "" && <div>{notification}</div>}
    </>
  );
};
