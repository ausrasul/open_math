import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function LineChart({data, title, id}){
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = document.getElementById("chart" + id).getContext("2d");

    const chart = new Chart(ctx, {
        options: {
            plugins: {
              title: {
                display: true,
                text: title,
              }
            }
          },
      type: "line",
      data: {
        labels: data.map(_item => ""),
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
  }, [data]);

  return (
    <canvas id={"chart"+id} ></canvas>
  );
};
