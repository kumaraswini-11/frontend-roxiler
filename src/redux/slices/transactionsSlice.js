import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMonth: 3,
  searchQuery: "",
  currentPage: 1,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
      state.currentPage = 1;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setSelectedMonth, setSearchQuery, setCurrentPage } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
