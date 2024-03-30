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
import { formatMoney } from "@/app/lib/utils/formatters";
import "chartjs-plugin-crosshair";

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
            new Date(entry[0]).toLocaleDateString()
          ),

          datasets: [
            {
              label: "",
              data: chartData.map((entry) => entry[1]),
              fill: true,
              tension: 0.3,
              pointRadius: 0,
              borderColor: theme === "dark" ? "#2B7629" : "#02A299",

              backgroundColor: () => {
                const gradient = ctx.createLinearGradient(
                  0,
                  0,
                  0,
                  ctx.canvas.height
                );
                if (theme === "dark") {
                  gradient.addColorStop(0, "rgba(95, 255, 91, 0.5)");
                  gradient.addColorStop(1, "rgba(95, 255, 91, 0.01)");
                } else {
                  gradient.addColorStop(0, "rgba(1, 241, 227, 1.0)");
                  gradient.addColorStop(1, "rgba(0, 0, 0, 0.05)");
                }
                return gradient;
              },
            },
          ],
        },
        options: {
          responsive: true,
          animation: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          scales: {
            x: {
              display: false,
              grid: {
                display: false,
                drawBorder: false,
              },
            },
            y: {
              display: true,
              grid: {
                display: true,
                drawBorder: false,
                color: "#555",
              },
              ticks: {
                callback: function (value: any, index: number, values: any) {
                  if (value >= 1000) {
                    return formatMoney(value);
                  } else {
                    return value;
                  }
                },
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
  }, [chartData, theme]);

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
