import React from "react";
import { BlinkingGradientLoader } from "@/lib/utils/components/BlinkingLoader";

export const LoadingMarketData: React.FC<{ fetchMarketData: () => void }> = ({
  fetchMarketData,
}) => {
  return (
    <div className="py-2">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center text-center gap-2 sm:gap-0 overflow-hidden">
        {/* Mobile: Show fewer items, stack vertically */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-xs min-w-0">
          <div className="hidden sm:block">
            <BlinkingGradientLoader width="100px" height="12px" />
          </div>
          <div className="hidden sm:block">
            <BlinkingGradientLoader width="70px" height="12px" />
          </div>
          <div className="min-w-0">
            <BlinkingGradientLoader width="100px" height="12px" />
          </div>
          <div className="min-w-0">
            <BlinkingGradientLoader width="80px" height="12px" />
          </div>
        </div>
        
        {/* Dominance indicators - responsive */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="hidden sm:block">
            <BlinkingGradientLoader width="60px" height="12px" />
          </div>
          <button
            className="hover:text-indigo-500 text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
            onClick={() => {
              fetchMarketData();
            }}
          >
            Reload
          </button>
        </div>
      </div>
      <hr className="border-gray-300 dark:border-gray-700" />
    </div>
  );
};
