import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";
import { SpinnerContainer } from "../../styled";
import { useUIStore, useUtilsStore } from "@/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { apiHelpers } from "@/lib/api/coingecko";

export const Search = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");
  const [canVisit, setCanVisit] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);

  // ✅ Zustand: Selective subscriptions to only needed state
  const viewingCoinId = useUIStore((state) => state.viewingCoinId);
  const setViewingCoinId = useUIStore((state) => state.setViewingCoinId);
  const query = useUIStore((state) => state.query);
  const setQuery = useUIStore((state) => state.setQuery);
  const setErrorMessage = useUtilsStore((state) => state.setErrorMessage);

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
      const data = await apiHelpers.searchCoins(query);

      if (data) {
        setResults(data.coins);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Search failed - possible timeout", 3000);
      setNotification("Possible server timeout");
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.name);
    setViewingCoinId(suggestion.id);
    setResults([]);
    setCanVisit(true);
    // Simple: always show confirmation, regardless of route
  };

  const clear = () => {
    setResults([]);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    // Small delay to allow navigation to complete before clearing state
    setTimeout(() => {
      setQuery("");
      setResults([]);
      setCanVisit(false);
      setNotification("");
    }, 100);
  };

  const resetSearch = () => {
    setCanVisit(false);
    setQuery("");
    setViewingCoinId("");
    setResults([]);
    setNotification("");

    // Focus back on the input after state reset
    setTimeout(() => {
      const input = document.querySelector(
        'input[placeholder="Search for a coin..."]'
      ) as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 100);
  };

  return (
    <>
      {/* Desktop Search - always visible on sm+ screens */}
      <div className="relative w-full hidden sm:block">
        <div
          className={`flex px-3 py-2 rounded-md bg-gray-100 dark:bg-input-bg shadow-md w-full`}
        >
          <input
            className="bg-transparent outline-none flex-1 min-w-0 text-sm sm:text-base"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a coin..."
          />
          {canVisit && query !== "" && (
            <button
              className="text-green-500 ml-2 px-2 py-1 text-xs sm:text-sm whitespace-nowrap hover:bg-green-50 dark:hover:bg-green-900 rounded"
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
          {query.trim() !== "" && results.length > 0 && (
            <ul className="absolute z-10 w-full max-h-48 sm:max-h-64 overflow-y-scroll mt-1 bg-white dark:bg-accent-bg dark:text-gray-400 shadow-lg rounded border border-gray-200 dark:border-gray-700">
              <div className="flex justify-end px-3 py-1 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={clear}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  ×
                </button>
              </div>
              {results.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleSuggestionClick(result)}
                  className="w-full p-3 sm:p-2 hover:bg-gray-100 dark:hover:bg-input-bg hover:text-gray-900 dark:hover:text-white cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 text-sm sm:text-base"
                >
                  {result.name}
                </li>
              ))}
            </ul>
          )}
          {isLoading && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
              <SpinnerContainer $size="20px" />
            </div>
          )}
          {notification !== "" && (
            <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded text-sm">
              {notification}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Icon - only visible on mobile */}
      <button
        onClick={() => setIsMobileSearchOpen(true)}
        className="sm:hidden min-h-[44px] min-w-[44px] bg-gray-100 dark:bg-input-bg rounded-md shadow-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Open search"
      >
        <FontAwesomeIcon
          icon={faSearch}
          className="text-gray-600 dark:text-gray-400"
        />
      </button>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 sm:hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={closeMobileSearch}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close search"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-gray-600 dark:text-gray-400"
                />
              </button>
              <div className="flex-1">
                <input
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded outline-none text-base"
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search for a coin..."
                  autoFocus
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto">
              {query.trim() !== "" && results.length > 0 && !canVisit && (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((result) => (
                    <li
                      key={result.id}
                      onClick={() => handleSuggestionClick(result)}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <span className="text-base text-gray-900 dark:text-gray-100">
                        {result.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Selection Feedback - Always show regardless of route */}
              {canVisit && query !== "" && (
                <div className="p-6 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {query} Selected
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Ready to view detailed information about {query}
                    </p>
                    <button
                      onClick={resetSearch}
                      className="text-blue-600 dark:text-blue-400 text-sm hover:underline transition-colors px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900"
                    >
                      Search for a different coin
                    </button>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-center p-8">
                  <SpinnerContainer $size="30px" />
                </div>
              )}

              {notification !== "" && (
                <div className="p-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded text-sm">
                    {notification}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Button - Always show regardless of route */}
            {canVisit && query !== "" && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <Link
                  href={`/coin?id=${viewingCoinId}`}
                  onClick={closeMobileSearch}
                  className="w-full bg-green-600 text-white py-4 px-4 rounded-lg text-center font-semibold hover:bg-green-700 transition-colors block text-lg"
                >
                  See {query} Details →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
