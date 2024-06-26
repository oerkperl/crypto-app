import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";
import { SpinnerContainer } from "../../styled";
import { useCryptoContext } from "@/app/context/context";

export const Search = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");
  const [canVisit, setCanVisit] = useState<boolean>(false);
  const {
    viewingCoinId,
    setViewingCoinId,
    setErrorMessage,
    isOpen,
    query,
    setQuery,
  } = useCryptoContext();
  const activePath = usePathname();
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
        setCanVisit(false);
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
    setViewingCoinId(suggestion.id);
    setResults([]);
    setCanVisit(true);
    if (activePath === "/coin" && isOpen) {
      setQuery("");
    }
  };

  const clear = () => {
    setResults([]);
  };

  return (
    <div className="relative">
      <div
        className={`flex px-2 rounded-md bg-gray-100 dark:bg-input-bg shadow-md`}
      >
        <input
          className="bg-transparent outline-none h-8"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a coin..."
        />
        {canVisit && activePath !== "/coin" && query !== "" && (
          <button
            className="text-green-500"
            onClick={() => {
              setQuery("");
              setCanVisit(false);
            }}
          >
            <Link href={`/coin?id=${viewingCoinId}`}>Go...</Link>
          </button>
        )}
      </div>
      <div>
        {query.trim() !== "" && (
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
        {notification !== "" && <div>{notification}</div>}
      </div>
    </div>
  );
};
