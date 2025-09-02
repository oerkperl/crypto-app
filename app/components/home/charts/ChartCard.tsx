import { Graph } from "./Graph";
import { useCurrencyStore } from "@/app/store/currencyStore";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const ChartCard: React.FC<{
  labels?: any;
  data: any[];
  type: any;
  width?: number;
  height?: number;
}> = ({ labels, data, type, width, height }) => {
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  return (
    <div className={`rounded`}>
      {labels && (
        <div>
          <span className="text-md">{labels.title}: </span>
          <span className="text-2xl">
            {labels.amount === "undefined" ? (
              <BlinkingGradientLoader width="200px" />
            ) : (
              selectedCurrency.sym + labels.amount
            )}
          </span>
        </div>
      )}

      <div className=" relative">
        {data && (
          <Graph
            data={{
              data: data,
              type: type,
              width: width,
              height: height,
            }}
          />
        )}
      </div>
    </div>
  );
};
