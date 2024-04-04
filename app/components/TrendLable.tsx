import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface TrendLabelProps {
  value: number;
  percentage?: boolean;
}
export const TrendLabel: React.FC<TrendLabelProps> = ({
  value,
  percentage,
}) => {
  return (
    <div className="flex items-center gap-1">
      {value >= 0 && (
        <span className="text-trend-blue">
          <FontAwesomeIcon icon={faCaretUp} />
        </span>
      )}
      {value < 0 && (
        <span className="text-trend-pink">
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
      )}
      <label
        className={`${value >= 0 ? "text-trend-blue" : "text-trend-pink"}`}
      >
        {Math.abs(value).toFixed(2)}
        {percentage && "%"}
      </label>
    </div>
  );
};
