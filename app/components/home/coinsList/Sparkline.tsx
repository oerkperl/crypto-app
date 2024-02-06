import React from "react";
import { Line } from "react-chartjs-2";

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

const setChartdata = (charData: any, trend: string): any => {
  const filtered = charData.filter((e: any, i: any) => i % 3 === 0);
  const data = {
    labels: filtered,
    datasets: [
      {
        label: "First dataset",
        data: filtered,
        borderColor: trend === "down" ? "#E91E63" : "#0CF864",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0, "rgba(0, 255, 95, .5)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
          return gradient;
        },
        pointRadius: 0,
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  return data;
};

export const Sparkline: React.FC<{ Chartdata: any; trend: string }> = ({
  Chartdata,
  trend,
}) => {
  const passedData = setChartdata(Chartdata, trend);
  return (
    <Line
      options={options}
      data={passedData}
      style={{ height: "100%", widows: "100%" }}
    />
  );
};
