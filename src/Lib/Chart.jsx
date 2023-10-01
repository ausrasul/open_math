import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function LineChart(props){
  const [chart, setChart] = useState(null);

  const data = props.data
  const title = props.title

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map(_ => ""),
        datasets: [
          {
            label: "Sekonder per fråga",
            data: data.map(item => item.avgTime/1000),
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
          {
            label: "Poäng",
            data: data.map(item => item.points),
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
        ],
      },
    });

    setChart(chart);

    return () => {
      chart.destroy();
    };
  }, data);

  return (
    <canvas id="myChart"></canvas>
  );
};
