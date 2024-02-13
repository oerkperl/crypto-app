import React from "react";
import { useCryptoContext } from "@/app/context/context";

const timePeriods = ["1D", "7D", "14D", "1M", "3M", "6M", "1Y"];

export const TimePeriodButtons = () => {
  const { selectedPeriod, setSelectedPeriod } = useCryptoContext();
  return (
    <div className={`inline-flex p-0.5 rounded-lg bg-white dark:bg-gray-800`}>
      {timePeriods.map((period) => (
        <button
          key={period}
          onClick={() => setSelectedPeriod(period)}
          className={`${
            period === selectedPeriod
              ? "bg-indigo-600 text-white hover:text-white"
              : ""
          } py-1 px-4 rounded hover:text-indigo-700`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};
