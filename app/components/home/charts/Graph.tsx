import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TData = {
  data: any[];
  type?: any;
  width?: number;
  height?: number;
  backgroundColor?: [number, number, number, number] | [];
  borderColor?: string;
};

export const Graph: React.FC<{ data: TData }> = ({ data }) => {
  const {
    data: chartData,
    type,
    width,
    height,
    backgroundColor,
    borderColor,
  } = data;
  const chartContainerRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  let gradientParams: any;

  useEffect(() => {
    if (backgroundColor && backgroundColor.length !== 0) {
      gradientParams = backgroundColor;
    }
    const canvas = chartContainerRef.current;
    const ctx = canvas?.getContext("2d");
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    if (ctx) {
      chartInstanceRef.current = new Chart(ctx, {
        type: type,
        data: {
          labels: chartData.map((entry) =>
            new Date(entry[0]).toLocaleDateString().substring(0, 2)
          ),

          datasets: [
            {
              label: "",
              data: chartData.map((entry) => entry[1]),
              fill: true,
              tension: 0.5,
              pointRadius: 0,
              borderColor: borderColor || "blue",

              backgroundColor: () => {
                if (gradientParams) {
                  const gradient = ctx.createLinearGradient(
                    gradientParams[0],
                    gradientParams[1],
                    gradientParams[2],
                    gradientParams[3]
                  );

                  gradient.addColorStop(0, "rgba(0, 255, 95, .5)");
                  gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
                  return gradient;
                } else {
                  return "skyblue";
                }
              },
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
                drawBorder: false,
              },
            },
            y: {
              display: false,
              grid: {
                display: false,
                drawBorder: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, type]);

  return (
    <div>
      <canvas
        className="text-white"
        ref={chartContainerRef}
        id="acquisitions"
        width={width || 500}
        height={height || 200}
      ></canvas>
    </div>
  );
};
