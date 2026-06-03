import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import NavComp from "../Components/NavComp";
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("passwords do not match!");
      return;
    }

    setError("");
    try {
      const response = await axios.post(
      `${process.env.API_URL}/register`,
        formData,
      );
      if (response.status === 201) {
        navigate("/registration-success");
      } else {
        const errorText = response.data?.message || "Registration Failed";
        setError(errorText);
      }
    } catch (err) {
      setError("An unexpected error occured during registration.");
    }
  };

  return (
    <div>
      <NavComp />
      <div className="container">
        <div className="mb-3 d-flex align-items-center justify-content-center vh-100 flex-column">
          <div className="card shadow p-4" style={{ width: "400px" }}>
            <Link
              to="/"
              className="position-absolute top-0 end-0 m-3 text-decoration-none text-dark fs-4"
            >
              ×
            </Link>
            <h2 className="mb-4 display-6">Registration Details</h2>
            <form onSubmit={handleSubmit} style={{ width: "350px" }}>
              <div className="mb-3">
                <label className="form-label mb-2  fw-bold">
                  Enter your Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label mb-2  fw-bold">
                  Enter your email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="test@email.com"
                  required
                />
              </div>{" "}
              <div className="mb-3">
                <label className="form-label mb-2  fw-bold">
                  Set password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </div>{" "}
              <div className="mb-4">
                <label className="form-label mb-2  fw-bold">
                  Confirm password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control mb-3"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
              {error && <div className="text-danger mb-3">{error}</div>}
              <button type="submit" className="btn btn-primary w-100">
                Register User
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
