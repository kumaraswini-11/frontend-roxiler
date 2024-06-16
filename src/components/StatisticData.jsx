import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/statistic.css";

function StatisticData() {
  const { selectedMonth } = useSelector((state) => state.transactions);
  const [statistic, setStatistic] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const params = new URLSearchParams({ month: selectedMonth });
        const url = `${baseUrl}/statistics?${params.toString()}`;

        const response = await axios.get(url, { signal });
        setStatistic([response.data]);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [selectedMonth]);

  return (
    <section>
      <p>
        Statistics -{" "}
        {new Date(0, selectedMonth - 1).toLocaleString("en", {
          month: "short",
        })}
        <span> (Selected month)</span>
      </p>

      {statistic.map((el, index) => (
        <div key={index} className="statisticSection">
          <label>
            <span className="statisticText">Total sale</span>{" "}
            <span className="statisticValue">
              {el.totalSaleAmount.toFixed(3)}
            </span>
          </label>
          <label>
            <span className="statisticText">Total sold items</span>{" "}
            <span className="statisticValue">{el.totalSoldItems}</span>
          </label>
          <label>
            <span className="statisticText">Total not sold items</span>{" "}
            <span className="statisticValue">{el.totalNotSoldItems}</span>
          </label>
        </div>
      ))}
    </section>
  );
}

export default StatisticData;
