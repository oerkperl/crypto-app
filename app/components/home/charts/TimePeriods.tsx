import React from "react";
const timePeriods = ["1D", "7D", "14D", "1M", "3M", "6M", "1Y"];

export const TimePeriodButtons: React.FC<{
  thePeriod: string;
  periodHandler: any;
}> = ({ thePeriod, periodHandler }) => {
  return (
    <div
      className={`inline-flex py-0.5 rounded-lg  border-gray-300 dark:border-gray-700`}
    >
      {timePeriods.map((period) => (
        <button
          key={period}
          onClick={() => periodHandler(period)}
          className={`${
            period === thePeriod
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
