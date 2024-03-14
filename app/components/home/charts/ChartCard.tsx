import { Graph } from "./Graph";
import { useCryptoContext } from "@/app/context/context";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const ChartCard: React.FC<{
  labels?: any;
  data: any[];
  type: any;
  width?: number;
  height?: number;
  cardHeight?: string;
}> = ({ labels, data, type, width, height, cardHeight }) => {
  const { selectedCurrency } = useCryptoContext();
  return (
    <div
      className={` mb-2 p-2 rounded-xl h-${
        cardHeight || "full"
      } bg-white dark:bg-transparent `}
    >
      {labels && (
        <div>
          <span className="text-md">{labels.title}: </span>
          <span className="text-2xl">
            {labels.amount === "undefinedQd" ? (
              <BlinkingGradientLoader width="200px" />
            ) : (
              selectedCurrency.sym + labels.amount
            )}
          </span>
          <div>{labels.date}</div>
        </div>
      )}

      <div>
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
