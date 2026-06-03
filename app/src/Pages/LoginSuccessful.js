import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
 import NavComp from "../Components/NavComp"

const LoginSuccessful = () => {
  return (
    <div>
     <NavComp/>
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-cente">
        <div className="display-6 fw-bold text-success text-center mb-4">
          You have successfully logged in.
          <br />
          You can now proceed to the home page.
        </div>

        <Link to="/dashboard" className="text-center">
          <h3>Go to Dashboard </h3>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default LoginSuccessful;
