import React from "react";
const timePeriods = ["1D", "7D", "14D", "1M", "3M", "6M", "1Y"];
export const TimePeriodButtons: React.FC<{
  thePeriod: string;
  periodHandler: any;
}> = ({ thePeriod, periodHandler }) => {
  return (
    <div className={`inline-flex  rounded-lg `}>
      {timePeriods.map((period) => (
        <button
          key={period}
          onClick={() => periodHandler(period)}
          className={`${
            period === thePeriod
              ? "bg-indigo-600 text-white hover:text-white"
              : ""
          }  px-3 rounded hover:text-gray-500 dark:hover:text-white`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};
