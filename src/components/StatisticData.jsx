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

    // IIFE
    (async () => {
      try {
        const baseUrl = "http://localhost:9000/api/v1";
        const params = new URLSearchParams({
          month: selectedMonth,
        });
        const url = `${baseUrl}/statistics?${params.toString()}`;

        const response = await axios.get(url, { signal });
        setStatistic([response.data]);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [selectedMonth]);

  return (
    <section>
      <p>
        Statistics - {"  "}
        {new Date(0, selectedMonth - 1).toLocaleString("en", {
          month: "short",
        })}
        <span>{"  "}(Selected month and year from dropdown)</span>
      </p>

      {statistic.map((el, index) => (
        <div key={index + 1} className="statisticSection">
          <label>
            <span className="statisticText">Total sale</span>{" "}
            <span className="statisticValue">
              {el.totalSaleAmount.toFixed(3)}
            </span>
          </label>
          <label>
            <span className="statisticText">Total sold item </span>{" "}
            <span className="statisticValue">{el.totalSoldItems}</span>
          </label>
          <label>
            <span className="statisticText">Total not sold item </span>{" "}
            <span className="statisticValue">{el.totalNotSoldItems}</span>
          </label>
        </div>
      ))}
    </section>
  );
}

export default StatisticData;
