import React from "react";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const LoadingChart: React.FC<{ fetchData: () => void }> = ({
  fetchData,
}) => {
  return (
    <>
      <div className="mt-2">
        <BlinkingGradientLoader height="225px" />
      </div>
      <div className="mt-2">
        <BlinkingGradientLoader height="225px" />
      </div>

      <div className="mt-2 w-full flex items-center gap-2">
        <BlinkingGradientLoader height="40px" width="300px" />
        <button
          className="border border-gray-500 px-2 py-1 hover:bg-indigo-600 hover:text-white"
          onClick={fetchData}
        >
          Reload
        </button>
      </div>
    </>
  );
};
