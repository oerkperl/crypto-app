// import React, { useState } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
// import { faRotateRight } from "@fortawesome/free-solid-svg-icons/faRotateRight";

// interface ISelectCoin {
//   fetchData: () => void;
//   query: string;
//   setQuery: React.Dispatch<React.SetStateAction<string>>;
//   canSelect: boolean;
//   hasError: boolean;
//   setCanSelect: React.Dispatch<React.SetStateAction<boolean>>;
//   onCoinSelect?: (coinId: string) => void;
// }

// export const SelectCoin: React.FC<ISelectCoin> = ({
//   fetchData,
//   query,
//   setQuery,
//   canSelect,
//   hasError,
//   setCanSelect,
//   onCoinSelect,
// }) => {
//   const [results, setResults] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [notification, setNotification] = useState<string>("");

//   let timeout: any | null = null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       if (value.trim() !== "") {
//         fetchResults(value);
//       } else {
//         setIsLoading(false);
//         setResults([]);
//         setCanSelect(false);
//       }
//     }, 1500);
//   };

//   const fetchResults = async (query: string) => {
//     setIsLoading(true);
//     try {
//       const { data } = await axios(
//         `https://api.coingecko.com/api/v3/search?query=${query}`
//       );

//       if (data) {
//         setResults(data.coins);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       setNotification("Possible server timeout");
//     }
//   };

//   const handleSuggestionClick = (suggestion: any) => {
//     setQuery(suggestion.name);
//     if (onCoinSelect) {
//       onCoinSelect(suggestion.id);
//     }
//     setResults([]);
//     setCanSelect(true);
//   };

//   const clear = () => {
//     setResults([]);
//   };

//   return (
//     <>
//       <div className="relative w-full">
//         <div className="flex px-3 py-2 rounded-md">
//           <input
//             className="px-1 py-1 outline-none bg-transparent flex-1 text-base min-h-[40px] text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
//             type="text"
//             value={query}
//             onChange={handleChange}
//             placeholder="Search for a coin..."
//           />
//           {canSelect && query !== "" && (
//             <button
//               className="ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
//               onClick={() => {
//                 fetchData();
//                 setResults([]);
//               }}
//             >
//               {hasError ? (
//                 <FontAwesomeIcon icon={faRotateRight} className="text-lg" />
//               ) : (
//                 <FontAwesomeIcon icon={faCheck} className="text-lg" />
//               )}
//             </button>
//           )}
//         </div>

//         {/* Results Dropdown */}
//         <div className="relative">
//           {query.trim() && (
//             <ul className="absolute z-50 w-full max-h-64 overflow-y-auto mt-1 bg-white dark:bg-gray-800 shadow-lg rounded border border-gray-200 dark:border-gray-600">
//               {results.length > 0 && (
//                 <div className="flex justify-end px-3 py-2 border-b border-gray-200 dark:border-gray-600">
//                   <button
//                     onClick={clear}
//                     className="min-w-[32px] min-h-[32px] flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
//                   >
//                     ×
//                   </button>
//                 </div>
//               )}
//               {results.map((result) => (
//                 <li
//                   key={result.id}
//                   onClick={() => handleSuggestionClick(result)}
//                   className="w-full px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors min-h-[44px] flex items-center"
//                 >
//                   <span className="text-sm sm:text-base">{result.name}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//           {isLoading && (
//             <div className="absolute top-2 right-2 z-40">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
//             </div>
//           )}
//         </div>
//       </div>
//       {notification !== "" && (
//         <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-sm">
//           {notification}
//         </div>
//       )}
//     </>
//   );
// };
import React, { useState } from "react";
import axios from "axios";
import { SpinnerContainer } from "../styled";
import { useUIStore } from "@/store/uiStore";
import { useUtilsStore } from "@/store/utilsStore";
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
  const setSelectedCoinId = useUIStore((state) => state.setSelectedCoinId);
  const setErrorMessage = useUtilsStore((state) => state.setErrorMessage);

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
      setErrorMessage("Possible server timeout", 3000);
      setNotification("Possible server timeout");
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
      <div className="relative w-full">
        <div className="flex px-3 py-2 rounded-md">
          <input
            className="px-1 py-1 outline-none bg-transparent flex-1 text-base min-h-[40px] text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a coin..."
          />
          {canSelect && query !== "" && (
            <button
              className="ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              onClick={() => {
                fetchData();
                setResults([]);
              }}
            >
              {hasError ? (
                <FontAwesomeIcon icon={faRotateRight} className="text-lg" />
              ) : (
                <FontAwesomeIcon icon={faCheck} className="text-lg" />
              )}
            </button>
          )}
        </div>

        {/* Results Dropdown */}
        <div className="relative">
          {query.trim() && (
            <ul className="absolute z-50 w-full max-h-64 overflow-y-auto mt-1 bg-white dark:bg-gray-800 shadow-lg rounded border border-gray-200 dark:border-gray-600">
              {results.length > 0 && (
                <div className="flex justify-end px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <button
                    onClick={clear}
                    className="min-w-[32px] min-h-[32px] flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
              {results.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleSuggestionClick(result)}
                  className="w-full px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors min-h-[44px] flex items-center"
                >
                  <span className="text-sm sm:text-base">{result.name}</span>
                </li>
              ))}
            </ul>
          )}
          {isLoading && (
            <div className="absolute top-2 right-2 z-40">
              <SpinnerContainer $size="20px" />
            </div>
          )}
        </div>
      </div>
      {notification !== "" && (
        <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-sm">
          {notification}
        </div>
      )}
    </>
  );
};
