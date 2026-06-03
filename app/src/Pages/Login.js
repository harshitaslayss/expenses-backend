import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Footer from "../Components/Footer";
import NavComp from "../Components/NavComp";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    setError("");

    const loginData = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        `${process.env.API_URL}/login`,
        loginData,
      );
      localStorage.setItem("token", response.data.token);

      if (response.status === 200) {
        navigate("/login-success");
      }
    } catch (err) {
      const errorData = await err.response.data;
      setError(
        errorData.message || "An unexpected error occured. Please retry.",
      );
    }
  };

  return (
    <div>
      <NavComp />
      <div className="container">
        <div className="mb-3 d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="card shadow p-4" style={{ width: "400px" }}>
            <Link
              to="/"
              className="position-absolute top-0 end-0 m-3 text-decoration-none text-dark fs-4"
            >
              ×
            </Link>
            <h2 className="mb-4 display-6">Login User</h2>
            <form onSubmit={handleLogin} style={{ width: "350px" }}>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Enter registered email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="mb-3  ">
                <label className="form-label fw-bold">
                  Enter password <span className="text-danger">*</span>{" "}
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && <div className="text-danger mb-3">{error}</div>}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
