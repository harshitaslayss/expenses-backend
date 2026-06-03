import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, NavLink } from "reactstrap";
import Dashboard from "./Dashboard";
import { Stack } from "@mui/material";
import Cards from "../Graphics/Cards";
import Footer from "../Components/Footer.js";
import NavComp from "../Components/NavComp.js";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
       
        <div className="container vh-100 d-flex align-items-center">
          <div className="row w-100 align-items-center">
            <div
              className="col-md-6"
              style={{ maxWidth: "800px", transform: "translateY(-25px)" }}
            >
              <h1 className="display-3 fw-bold ">
                Your Daily Expenses Manager
              </h1>

              <p className="fs-3 mt-3">Track your finances easily</p>

              <Link to="/login-user" className="btn btn-primary me-3 btn-lg ">
                Login
              </Link>
              <Link
                to="/register-user"
                className="btn btn-outline-primary btn-lg"
              >
                Register User
              </Link>
            </div>

            <div className="col-md-5 d-flex justify-content-center">
              <Cards />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
