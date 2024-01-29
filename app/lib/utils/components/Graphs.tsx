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
import { Line, Bar } from "react-chartjs-2";
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
                  gradient.addColorStop(0, "rgba(169, 169, 169, 0.5)");
                  gradient.addColorStop(1, "rgba(, 0, 0, 0)");
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
        ref={chartContainerRef}
        id="acquisitions"
        width={width || 500}
        height={height || 200}
      ></canvas>
    </div>
  );
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    y: {
      display: false,
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    x: {
      display: false,
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  tension: 0.5,
};

const setChartdata = (charData: any): any => {
  const data = {
    labels: "labled",
    datasets: [
      {
        label: "First dataset",
        data: charData,
        borderColor: "#0CF864",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0, "rgba(0, 255, 95, .5)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
          return gradient;
        },
        pointRadius: 0,
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  return data;
};

export const CoinsListChart: React.FC<{ Chartdata: any }> = ({ Chartdata }) => {
  const passedData = setChartdata(Chartdata);
  return <Line options={options} data={passedData} height={200} />;
};
