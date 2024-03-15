import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
import React from "react";
export const LoadingAsset = () => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-xl w-full min-h-16 mt-2 mb-2 relative">
      <div className="flex gap-4">
        <div className="w-1/4 h-48 flex flex-col gap-4 justify-center items-center">
          <BlinkingGradientLoader height="50px" width="50px" />
          <BlinkingGradientLoader height="15px" width="150px" />
          <BlinkingGradientLoader height="10px" width="100px" />
        </div>

        <div className="w-full mt-2 h-48 flex flex-col p-4">
          <h1>Market price</h1>
          <div className="flex justify-between mt-2">
            <div className="flex flex-col items-center gap-2">
              <BlinkingGradientLoader height="10px" width="150px" />
              <BlinkingGradientLoader height="10px" width="100px" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <BlinkingGradientLoader height="10px" width="150px" />
              <BlinkingGradientLoader height="10px" width="100px" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <BlinkingGradientLoader height="10px" width="150px" />
              <BlinkingGradientLoader height="10px" width="100px" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <BlinkingGradientLoader height="10px" width="150px" />
              <BlinkingGradientLoader height="10px" width="100px" />
            </div>
          </div>
          <hr className="mt-4 " />
          <h1 className="mt-2">Your coin</h1>
          <div className="flex justify-between mt-2">
            <div className="flex flex-col items-center gap-2">
              <BlinkingGradientLoader height="10px" width="150px" />
              <BlinkingGradientLoader height="10px" width="100px" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <BlinkingGradientLoader height="10px" width="150px" />
              <BlinkingGradientLoader height="10px" width="100px" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <BlinkingGradientLoader height="10px" width="150px" />
              <BlinkingGradientLoader height="10px" width="100px" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <BlinkingGradientLoader height="10px" width="150px" />
              <BlinkingGradientLoader height="10px" width="100px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
