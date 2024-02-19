import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Input } from "../styled";
import { SpinnerContainer } from "../../styled";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
import { useCryptoContext } from "@/app/context/context";

export const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canvisit, setCanVisit] = useState<boolean>(false);
  const { viewingCoinId, setViewingCoinId } = useCryptoContext();
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
      console.error("Error fetching data:", error);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.name);
    setViewingCoinId(suggestion.id);
    setResults([]);
    setCanVisit(true);
    if (activePath !== "/") {
      setQuery("");
    }
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
        {canvisit && activePath === "/" && (
          <button
            className="hover:text-indigo-500"
            onClick={() => {
              setQuery("");
            }}
          >
            <Link href={`/coin?id=${viewingCoinId}`}>Go...</Link>
          </button>
        )}
      </div>
      <div>
        {query.trim() !== "" && (
          <ul className="absolute w-full max-h-64 overflow-y-scroll mt-1 bg-indigo-600 text-white rounded">
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
          <div className="relative mt-2">
            <SpinnerContainer $size="20px" />
            <BlinkingGradientLoader height="40px" />
          </div>
        )}
      </div>
    </div>
  );
};
