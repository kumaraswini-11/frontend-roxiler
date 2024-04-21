import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedMonth,
  setSearchQuery,
} from "../redux/slices/transactionsSlice";

const TransactionFilter = () => {
  const dispatch = useDispatch();
  const { selectedMonth } = useSelector((state) => state.transactions);

  const handleMonthChange = (e) => {
    dispatch(setSelectedMonth(Number(e.target.value)));
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="transactionFilterSection">
      <input
        type="search"
        placeholder="Search transactions"
        onChange={handleSearch}
        className="inputField"
      />
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className="selectField"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <option key={month} value={month}>
            {new Date(0, month - 1).toLocaleString("en", { month: "short" })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TransactionFilter;
