

import React, { Component, useEffect, useState } from 'react'
import NavComp from '../Components/NavComp';
import CardComp from '../Components/CardComp';
import { Button } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import AddForm from './AddForm';
import Income from '../Graphics/Income';
import Expense from '../Graphics/Expense';
import Balance from '../Graphics/Balance';
import { AnalyticsComp } from '../Components/AnalyticsComp';
import Footer from '../Components/Footer';
import '../Pages/Dashboard.css';


function Dashboard() {
    
    //define constants
    const [data, setData]= useState({
        balance:0,
        income: 0,
        expense: 0
    });

    const[user,setUser]= useState("")
    const location= useLocation();
    

    useEffect(()=>
    {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dashboard Data: ", data);
        setData(data);
      })
      .catch((err) => console.log(err));
    }, [location]);


        return (
          <div>
  <div className="container py-5">
    <NavComp/>
    <h2 className='text-left mb-5 mt-5 display-6 fw-bold'>Account Dashboard</h2>
  <div className="row row-cols-1 row-cols-md-3 g-4">
    <div className="col">
      <div className="card h-100 text-center shadow border-success dashboard-card">
        <div className="card-body">
          <div className="display-4 text-primary mb-2">
           <Income/>
          </div>
          <h2 className="card-title mb-3">₹{Number(data.income).toLocaleString('en-IN')}</h2>
          <p className="card-text ">Income amount</p>
        </div>
      </div>
    </div>
    
    <div className="col">
      <div className="card h-100 text-center shadow border-warning dashboard-card">
        <div className="card-body">
          <div className="display-4 text-success mb-2">
           <Balance/>
          </div>
          <h2 className="card-title mb-3">₹{Number(data.balance).toLocaleString('en-IN')}</h2>
          <p className="card-text ">Current Balance</p>
        </div>
      </div>
    </div>
    
    <div className="col">
      <div className="card h-100 text-center shadow  border-danger dashboard-card">
        <div className="card-body">
          <div className="display-4 text-warning mb-2">
            <Expense/>
          </div>
          <h2 className="card-title mb-3">₹{Number(data.expense).toLocaleString('en-IN')}</h2>
          <p className="card-text">Expenses amount</p>
        </div>
      </div>
    </div>
    

  </div>
  <AnalyticsComp/>
</div>
<Footer/>
</div>
        );
    }

 
export default Dashboard;