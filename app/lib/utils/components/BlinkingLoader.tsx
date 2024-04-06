import React from "react";

export const BlinkingGradientLoader: React.FC<{
  width?: string;
  height?: string;
}> = ({ width, height }) => {
  return (
    <div className="flex items-center">
      <div
        className="relative overflow-hidden"
        style={{ width: width || "100%", height: height || "5px" }}
      >
        <div className="absolute inset-0 rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-600 animate-gradient"></div>
        </div>
      </div>
    </div>
  );
};
