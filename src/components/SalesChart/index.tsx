import React from "react";
import { LineChart } from "@mui/x-charts";

const generateData = (numPoints: number) => {
  const data = [];
  for (let i = 1; i <= numPoints; i++) {
    const salesPercentage = Math.floor(Math.random() * 100) + 1; // Random percentage between 1 and 100
    data.push({ x: i * 1000, y: salesPercentage });
  }
  return data;
};

const SalesLineChart: React.FC = () => {
  const dataPoints = generateData(100);

  return (
    <LineChart
      xAxis={[{ data: dataPoints.map((point) => point.x) }]}
      series={[
        {
          data: dataPoints.map((point) => point.y),
          valueFormatter: (value) => `${value}%`,
          showMark: true,
          area: true,
        },
      ]}
      height={300}
      sx={{ width: "100%" }}
    />
  );
};

export default SalesLineChart;
