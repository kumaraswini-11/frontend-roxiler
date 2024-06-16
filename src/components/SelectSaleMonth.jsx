import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSelectedMonth,
  setCurrentPage,
} from "../redux/slices/transactionsSlice";

const FilterOperations = () => {
  const dispatch = useDispatch();
  const { availableMonths, selectedMonth } = useSelector(
    (state) => state.transactions
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
    dispatch(setCurrentPage(1));
  };

  const handleMonthChange = (e) => {
    const selectedMonthValue = Number(e.target.value);
    dispatch(setSelectedMonth(selectedMonthValue));
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search transaction"
        onChange={handleSearch}
      />
      <select onChange={handleMonthChange} value={selectedMonth}>
        {availableMonths.map((month, index) => (
          <option key={month} value={index + 1}>
            {new Date(0, month - 1).toLocaleString("en", { month: "short" })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOperations;
