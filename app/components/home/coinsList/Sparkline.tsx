import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";

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

const setChartdata = (charData: any, trend: string, theme: string): any => {
  const filtered = charData.filter((e: any, i: any) => i % 4 === 0);
  const data = {
    labels: filtered,
    datasets: [
      {
        label: "First dataset",
        data: filtered,
        borderColor:
          trend === "down"
            ? "#E323FF"
            : theme === "dark"
            ? "#2B7629"
            : "#02A299",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            context.chart.height
          );
          if (trend !== "down") {
            if (theme === "dark") {
              gradient.addColorStop(0, "rgba(95, 255, 91, 1.0)");
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
            } else {
              gradient.addColorStop(0, "rgba(1, 241, 227, 1.0)");
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
            }
          } else {
            gradient.addColorStop(0, "rgba(228, 35, 255, 1.0)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
          }
          return gradient;
        },
        pointRadius: 0,
        borderWidth: 2,
        fill: true,
      },
    ],
  };
  return data;
};

export const Sparkline: React.FC<{ Chartdata: any; trend: string }> = ({
  Chartdata,
  trend,
}) => {
  const { theme } = useTheme();
  const passedData = setChartdata(Chartdata, trend, theme as string);
  return <Line options={options} data={passedData} />;
};
