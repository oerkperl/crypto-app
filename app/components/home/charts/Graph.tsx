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
import { useTheme } from "next-themes";

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
  const { data: chartData, type, width, height } = data;
  const chartContainerRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
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
              borderColor: theme === "dark" ? "#2B7629" : "#3D3892",

              backgroundColor: () => {
                const gradient = ctx.createLinearGradient(
                  0,
                  0,
                  0,
                  ctx.canvas.height
                );
                if (theme === "dark") {
                  gradient.addColorStop(0, "rgba(95, 255, 91, 1.0)");
                  gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
                } else {
                  gradient.addColorStop(0, "rgba(80, 70, 229, 1.0)");
                  gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
                }
                return gradient;
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
  }, [chartData, type, theme]);

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
