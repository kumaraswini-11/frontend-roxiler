import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const TransactionTable = ({ transactions }) => {
  const { searchQuery, selectedMonth } = useSelector(
    (state) => state.transactions
  );
  const [highlightedTransactions, setHighlightedTransactions] = useState([]);

  const highlightFields = (fields, searchQuery) => {
    const manipulateResponse = new RegExp(`(${searchQuery})`, "gi");
    const highlightedFields = {};

    for (const [key, value] of Object.entries(fields)) {
      const highlightedValue = String(value).replace(
        manipulateResponse,
        '<span style="color:red; font-weight: bold">$1</span>'
      );
      highlightedFields[key] = highlightedValue;
    }

    return highlightedFields;
  };

  const handleOnClick = async (id) => {
    const deleteURL = `${import.meta.env.VITE_BASE_URL}/delete`;

    try {
      const res = await axios.delete(
        `${deleteURL}/?id=${id}&month=${selectedMonth}`
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  useEffect(() => {
    const updatedTransactions = transactions.map((item) => ({
      ...item,
      ...highlightFields(
        {
          title: item.title,
          description: item.description,
          price: item.price,
        },
        searchQuery
      ),
    }));
    setHighlightedTransactions(updatedTransactions);
  }, [transactions, searchQuery]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Sold</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(highlightedTransactions) &&
        highlightedTransactions.length ? (
          highlightedTransactions.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{index + 1}</td>
              <td dangerouslySetInnerHTML={{ __html: transaction.title }}></td>
              <td
                dangerouslySetInnerHTML={{ __html: transaction.description }}
              ></td>
              <td dangerouslySetInnerHTML={{ __html: transaction.price }}></td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Sold" : "Available"}</td>
              <td>
                <img
                  src={transaction.image}
                  alt={transaction.title}
                  style={{ width: "50px" }}
                />
              </td>
              <td>
                <button onClick={() => handleOnClick(transaction._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">No transactions found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionTable;
