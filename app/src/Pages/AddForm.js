import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Nav } from "reactstrap";
import NavComp from "../Components/NavComp";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import {
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@mui/material";

function AddForm() {
  const { id } = useParams();

  const [info, setInfo] = useState({
    description: "",
    amount: 0,
    isIncome: false,
    category: {
      id: "",
    },
  });

  const method = id ? "PUT" : "POST";
  const url = id ? `/transactions/${id}` : `/transactions`;
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`${process.env.API_URL}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setInfo({
            description: data.description,
            amount: data.amount,
            isIncome: data.income,
            category: data.category || { id: "" },
          });
        })
        .catch((err) => console.log(err));
    }
  }, [id, token]);

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

  const handleSubmit = (isIncomeType) => {
    if (!info.description || info.amount === 0) {
      alert("Please fill all fields");
      return;
    }
    const payload = {
      description: info.description,
      amount: Number(info.amount),
      isIncome: id ? info.isIncome : isIncomeType,
      category: info.category,
    };

    fetch(`${process.env.API_URL}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save transaction");
        }

        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    if (value === "new") {
      const name = prompt("Enter category name: ");

      if (!name) return;

      const response = await fetch(`${process.env.API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      const newCategory = await response.json();
      setCategories((prev) => [...prev, newCategory]);

      setInfo({
        ...info,
        category: {
          id: newCategory.id,
        },
      });
      return;
    }

    setInfo({
      ...info,
      category: {
        id: value,
      },
    });
  };

  return (
    <div>
      
    <div className="container">
      <NavComp/>
      <div className="mb-3 d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ width: "400px" }}>
          <h2 className="mb-4 display-6"> {id ? "Edit Transaction" : "Add Transaction"}</h2>
          <form style={{ width: "350px" }}>
            <div className="mb-3">
              <label className="form-label fw-bold">
                Add transaction description{" "}
                <span className="text-danger ">*</span>
              </label>
              <input
                type="text"
                className="form-control "
                name="description"
                value={info.description}
                onChange={handleChange}
                placeholder="eg. Shopping weekly groceries"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">
                Add transaction amount <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={info.amount}
                onChange={handleChange}
                placeholder="eg. 2000"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">
                Add transaction category <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={info.category?.id || ""}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option value="new">+ Add New Category</option>
              </select>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleSubmit(false)}
              >
                Add Expense
              </button>

              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleSubmit(true)}
              >
                Add Income
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
     <Footer/>
    </div>
  );
}

export default AddForm;
