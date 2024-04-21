import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TransactionTable = ({ transactions }) => {
  const { searchQuery } = useSelector((state) => state.transactions);
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

  useEffect(() => {
    const updatedTransactions = transactions.map((item) => {
      return {
        ...item,
        ...highlightFields(
          {
            title: item.title,
            description: item.description,
            price: item.price,
          },
          searchQuery
        ),
      };
    });
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
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No transactions found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionTable;
