import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Product Statistics",
    // },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
    },
  },
};

const BarChartDiagram = () => {
  const { selectedMonth } = useSelector((state) => state.transactions);
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const params = new URLSearchParams({ month: selectedMonth });
        const url = `${baseUrl}/bar-chart-data?${params.toString()}`;

        const response = await axios.get(url, { signal });
        const data = response.data;

        const labels = Object.keys(data);
        const values = Object.values(data);

        setBarChartData({
          labels: labels,
          datasets: [
            {
              label: "Transaction Count",
              backgroundColor: "rgb(18, 170, 170)",
              borderColor: "rgb(18, 170, 170)",
              borderWidth: 2,
              data: values,
            },
          ],
        });
      } catch (error) {
        console.error("ERROR: ", error);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [selectedMonth]);

  return (
    <section>
      <p>
        Bar Chart Stats -{" "}
        {new Date(0, selectedMonth - 1).toLocaleString("en", {
          month: "short",
        })}
        <span>{"  "}(Selected month and year from dropdown)</span>
      </p>

      <div>
        {barChartData && barChartData.labels && barChartData.datasets && (
          <Bar options={options} data={barChartData} width={400} height={200} />
        )}
      </div>
    </section>
  );
};

export default BarChartDiagram;
