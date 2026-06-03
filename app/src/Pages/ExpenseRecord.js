import React, { Component, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import NavComp from "../Components/NavComp";
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import ExpensePieChart from "../Components/ExpensePieChart";
import Footer from "../Components/Footer";

function ExpenseRecord() {
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const filteredTransactions = transactions.filter((t) => {
    const categoryMatch =
      selectedCategory === "" || t.category?.id === Number(selectedCategory);

    const typeMatch =
      selectedType === "" ||
      (t.income && selectedType === "INCOME") ||
      (selectedType === "EXPENSE" && !t.income);

    return categoryMatch && typeMatch;
  });
  const HandleDelete = (id) => {
    fetch(`${process.env.API_URL}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`${process.env.API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch transactions.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTransactions(data);
      })
      .catch((err) => console.log(err));
  }, [location, token]);

  useEffect(() => {
    fetch(`${process.env.API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, [token]);

  let rows = filteredTransactions.map((transaction) => (
    <tr key={transaction.id} >
      <td>{transaction.description}</td>
      <td   className={
    transaction.income
      ? "text-success fw-bold"
      : "text-danger fw-bold"
  }
>₹{Number(transaction.amount).toLocaleString('en-IN')}</td>
      <td>{transaction.income ? "Income" : "Expense"}</td>
      <td>{transaction.category?.name}</td>
      <td>
        <Link
          className="btn btn-primary btn-md"
          to={`/add-transaction/${transaction.id}`}
        >
          Edit
        </Link>
        {"    "}
        <Button color="danger" onClick={() => HandleDelete(transaction.id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));


  return (
    <div>
    <div className="d-flex flex-column min-vh-100 m-2">
      <NavComp />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "70px",
          marginBottom: "20px",
          
        }}
      >
        <h2 style={{ margin: "0px" }}> Transactions List</h2>
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl sx={{ minWidth: "200px", mb: 2 }}>
            <InputLabel>filter by category</InputLabel>
            <Select
              value={selectedCategory}
              label="Filter Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>

              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: "200px", mb: 2 }}>
            <InputLabel>filter by type</InputLabel>
            <Select
              value={selectedType}
              label="Filter by Type"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="INCOME">Income</MenuItem>
              <MenuItem value="EXPENSE">Expense</MenuItem>
              <MenuItem value="">All types</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Table className="mt-4 table table-striped">
        <thead>
          <tr>
            <th width="20%">Description</th>
            <th width="20%">Amount</th>
            <th width="20%">Type</th>
            <th width="20%">Category</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </Table>
    </div>
   
    <Footer/>
    </div>
  );
}

export default ExpenseRecord;
