import { TChartLables } from "@/app/lib/types";
import { Graph } from "@/app/lib/utils/components/Graphs";

export const ChartCard: React.FC<{
  labels: TChartLables;
  data: any[];
  type: any;
  width?: number;
  height?: number;
  backgroundColor?: [number, number, number, number];
  borderColor?: string;
}> = ({ labels, data, type, width, height, backgroundColor, borderColor }) => {
  return (
    <>
      <div className=" text-gray-400">
        <div>
          <span className="text-md">{labels.title}: </span>
          <span className="text-xl">{labels.price}</span>
        </div>
        <div>{labels.date}</div>
        <div>
          <Graph
            data={{
              data: data,
              type: type,
              width: width,
              height: height,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
            }}
          ></Graph>
        </div>
      </div>
    </>
  );
};
