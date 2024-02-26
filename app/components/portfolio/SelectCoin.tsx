import React, { useState } from "react";
import axios from "axios";
import { Input } from "../home/styled";
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
  const { setSelectedCoinId } = useCryptoContext();
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
      console.error("Error fetching data:", error);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.name);
    setSelectedCoinId(suggestion.id);
    setResults([]);
    setCanSelect(true);
  };

  return (
    <div className="relative">
      <div className={`flex px-2 rounded-md bg-white dark:bg-gray-800 `}>
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a coin..."
        />
        {canSelect && (
          <button
            className="hover:text-green-500"
            onClick={() => {
              fetchData();
              setResults([]);
            }}
          >
            {" "}
            {hasError ? (
              <FontAwesomeIcon icon={faRotateRight} />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
          </button>
        )}
      </div>
      <div>
        {query.trim() !== "" && (
          <ul className="absolute z-10 w-full max-h-64 overflow-y-scroll mt-1 bg-indigo-600 text-white rounded">
            {results.map((result) => (
              <li
                key={result.id}
                onClick={() => handleSuggestionClick(result)}
                className=" w-full p-1 hover:bg-white hover:text-indigo-500  "
              >
                {result.name}
              </li>
            ))}
          </ul>
        )}
        {isLoading && (
          <div>
            <SpinnerContainer $size="20px" />
          </div>
        )}
      </div>
    </div>
  );
};
