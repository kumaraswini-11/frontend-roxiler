import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/slices/transactionsSlice";
import { TransactionFilter, TransactionTable } from "./index.js";
import "../styles/Transaction.css";

const TransactionDashboard = () => {
  const dispatch = useDispatch();
  const { selectedMonth, searchQuery, currentPage } = useSelector(
    (state) => state.transactions
  );
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // IIFE
    (async () => {
      setLoading(true);
      try {
        const baseUrl = "http://localhost:9000/api/v1";
        const params = new URLSearchParams({
          month: selectedMonth,
          searchText: searchQuery,
          page: currentPage,
          perPage: perPage,
        });
        const url = `${baseUrl}/all-transactions?${params.toString()}`;

        const response = await axios.get(url, { signal });
        setTransactions(response.data.data);
      } catch (error) {
        console.log("ERROR:: ", error);
      } finally {
        setLoading(false);
      }
    })();

    // cleanup
    return () => {
      controller.abort();
    };
  }, [selectedMonth, searchQuery, currentPage, perPage]);

  const totalPages = Math.ceil(transactions.length / perPage);

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
