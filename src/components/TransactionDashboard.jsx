import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/slices/transactionsSlice";
import TransactionFilter from "./TransactionFilter";
import TransactionTable from "./TransactionTable";
import "../styles/Transaction.css";

const TransactionDashboard = () => {
  const dispatch = useDispatch();
  const { selectedMonth, searchQuery, currentPage } = useSelector(
    (state) => state.transactions
  );
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      setLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const params = new URLSearchParams({
          month: selectedMonth,
          searchText: searchQuery,
          page: currentPage,
          perPage: perPage,
        });
        const url = `${baseUrl}/all-transactions?${params.toString()}`;

        const response = await axios.get(url, { signal });
        setTransactions(response.data.data);
        setTotalTransactions(response.data.totalRecords);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching transactions:", error);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [selectedMonth, searchQuery, currentPage, perPage]);

  const totalPages = Math.ceil(totalTransactions / perPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <>
      <header className="header">
        <h1>Transaction Dashboard</h1>
      </header>

      <section className="transactionSection">
        <TransactionFilter />

        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TransactionTable transactions={transactions} />
          )}
        </div>

        <div className="tableLabels">
          <label>
            Page No: {currentPage} / {totalPages}
          </label>
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>{" "}
            -{" "}
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
          Per Page: {perPage}
        </div>
      </section>
    </>
  );
};

export default TransactionDashboard;
