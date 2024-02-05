import React, { useState } from "react";
import { Input } from "../styled";
import { getCoins } from "../coinsList/coinsSlice";
import { useSelector } from "react-redux";
import { extractKeys } from "@/app/lib/utils/formatters";

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const suggestions = useSelector(getCoins);
  let extractedNames: string[] = extractKeys(suggestions, "name");
  const suggestionfound = extractedNames.includes(inputValue.trim());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    if (inputValue.trim() !== "" && extractedNames.length > 0) {
      const filteredSuggestions = extractedNames.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filteredSuggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="flex">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        {inputValue.trim() !== "" && suggestionfound && (
          <button className="hover:text-indigo-500">Go...</button>
        )}
      </div>
      <div>
        {inputValue.trim() !== "" && (
          <ul className="absolute w-full max-h-64 overflow-y-scroll mt-1 bg-indigo-500 text-white rounded">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className=" w-full p-1 hover:bg-white hover:text-indigo-500  "
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {inputValue.trim() !== "" && !suggestionfound && <p>No suggestion</p>}
      </div>
    </div>
  );
};
