import React from "react";

const TransactionTable = ({ transactions }) => {
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
        {Array.isArray(transactions) ? (
          transactions.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{index + 1}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
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
