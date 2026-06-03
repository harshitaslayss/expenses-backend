import React from 'react'
import {Container, Box, Typography} from '@mui/material'
import NavComp from '../Components/NavComp'
import Footer from '../Components/Footer'
import {Link} from 'react-router-dom'
export default function 
() {
  return (
    <div>
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-cente">
        <div className="display-6 fw-bold text-success text-center mb-4">
          You have successfully logged in.
          <br />
          You can now proceed to login.
        </div>

        <Link to="/login-user" className="text-center">
          <h3>Go to Login </h3>
        </Link>
      </div>
      <Footer />
    </div>
    
  )
}
