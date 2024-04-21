import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../redux/slices/transactionsSlice.js";

const FilterOperatons = () => {
  const dispatch = useDispatch();
  const { availableMonths, selectedMonth } = useSelector(
    (state) => state.transactions
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
    dispatch(setCurrentPageNumber(1));
  };

  const handleMonthChange = (e) => {
    const selectedMonthValue = Number(e.target.value);
    dispatch(setSelectedMonth(selectedMonthValue));
  };

  return (
    <div>
      {/*  Search */}
      <input
        type="search"
        placeholder="Search transaction"
        onChange={handleSearch}
      />
      {/*   Select month */}
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

export default FilterOperatons;
