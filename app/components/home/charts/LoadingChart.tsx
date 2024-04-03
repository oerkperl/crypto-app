import React from "react";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
export const LoadingChart: React.FC<{
  fetchData: () => void;
  status: "idle" | "loading" | "succeeded" | "failed";
}> = ({ fetchData, status }) => {
  const randomHeight = () => {
    return Math.floor(Math.random() * (200 - 40 + 1)) + 40;
  };

  return (
    <div className="px-2">
      <div className="mt-2">
        Price:
        <div className="mt-2 flex w-full pt-2 overflow-hidden">
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={index}
              className="mr-2 relative max-h-48  flex flex-col justify-end"
            >
              <div className=" bottom-item   w-2">
                <BlinkingGradientLoader
                  height={randomHeight() + "px"}
                  width="10px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 ">
        Volume:
        <div className="mt-2 flex w-full pt-2 overflow-hidden ">
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={index}
              className="mr-2 relative max-h-48  flex flex-col justify-end"
            >
              <div className=" bottom-item   w-2">
                <BlinkingGradientLoader
                  height={randomHeight() + "px"}
                  width="10px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {status === "failed" && (
        <div className="mt-2 w-full flex items-center gap-2">
          <button
            className="border dark:border-indigo-500 shadow-md rounded px-2 py-1 hover:bg-indigo-600 hover:text-white"
            onClick={fetchData}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};
