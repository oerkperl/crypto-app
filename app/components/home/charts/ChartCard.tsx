import { TChartLables } from "@/app/lib/types";
import { Graph } from "./Graph";
import { useCryptoContext } from "@/app/context/context";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const ChartCard: React.FC<{
  labels: TChartLables;
  data: any[];
  type: any;
  width?: number;
  height?: number;
  backgroundColor?: [number, number, number, number];
  borderColor?: string;
}> = ({ labels, data, type, width, height, backgroundColor, borderColor }) => {
  const { selectedCurrency } = useCryptoContext();
  return (
    <div
      className={` mb-2 p-2  h-[235px] rounded-md bg-white dark:bg-gray-800`}
    >
      <div>
        <span className="text-md">{labels.title}: </span>
        <span className="text-2xl">
          {selectedCurrency.sym}
          {labels.amount === "undefinedQd" && <BlinkingGradientLoader />}
          {labels.amount !== "undefinedQd" && labels.amount}
        </span>
      </div>
      <div>{labels.date}</div>
      <div>
        {data && (
          <Graph
            data={{
              data: data,
              type: type,
              width: width,
              height: height,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
            }}
          />
        )}
      </div>
    </div>
  );
};
