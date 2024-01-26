import React from "react";
import { useCryptoContext } from "@/app/context/context";

const timePeriods = ["1D", "7D", "14D", "1M", "3M", "6M", "1Y"];

export const TimePeriodButtons = () => {
  const { selectedPeriod, setSelectedPeriod } = useCryptoContext();
  return (
    <div className="border border-solid border-gray-700 inline-flex p-0.5 mt-4 rounded-lg">
      {timePeriods.map((period) => (
        <button
          key={period}
          onClick={() => setSelectedPeriod(period)}
          className={`${
            period === selectedPeriod
              ? "bg-indigo-600 text-white"
              : "text-gray-400"
          } py-1 px-4 rounded hover:text-white`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};
