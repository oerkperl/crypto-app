import React from "react";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const LoadingChart = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-2 ">
        <BlinkingGradientLoader height="30px" width="40%" />
        <BlinkingGradientLoader height="20px" width="30%" />
        <BlinkingGradientLoader height="125px" />
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <BlinkingGradientLoader height="30px" width="40%" />
        <BlinkingGradientLoader height="20px" width="30%" />
        <BlinkingGradientLoader height="125px" />
      </div>
      <BlinkingGradientLoader height="40px" width="50%" />
    </div>
  );
};
