import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function LineChart({ data, title, id }) {
  //const [chart, setChart] = useState(null);
  useEffect(() => {
    const ctx = document.getElementById("chart" + id).getContext("2d");

    const chart = new Chart(ctx, {
      options: {
        plugins: {
          title: {
            display: true,
            text: title,
          },
        },
        scales: {
          points: {
            type: "linear",
            display: true,
            position: "left",
          },
          speed: {
            type: "linear",
            display: true,
            position: "right",
            reverse: true,
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
      type: "line",
      data: {
        labels: data.map((_item) => ""),
        datasets: [
          {
            label: "Sekonder per fråga",
            data: data.map((item) => item.avgTime / 1000),
            cubicInterpolationMode: "monotone",
            tension: 0.4,
            yAxisID: "speed",
          },
          {
            label: "Poäng",
            data: data.map((item) => item.points),
            cubicInterpolationMode: "monotone",
            tension: 0.4,
            yAxisID: "points",
          },
        ],
      },
    });

    //setChart(chart_);

    return () => {
      chart.destroy();
    };
  }, [data]); // eslint-disable-line

  return <canvas id={"chart" + id}></canvas>;
}
