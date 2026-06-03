import React from 'react'
import { useEffect, useState } from "react";
import ExpensePieChart from "../Components/ExpensePieChart";
import ExpenseBarChart  from "../Components/ExpenseBarChart";
import IncomeExpensePieChart from './IncomeExpenseChart';
import '../Pages/Dashboard.css';


export function AnalyticsComp () {
     const [transactions, setTransactions] = useState([]);
      const [categories, setCategories] = useState([]);
    
      const token = localStorage.getItem("token");
    
      useEffect(() => {
        fetch("http://localhost:8080/transactions", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(data => setTransactions(data))
          .catch(err => console.log(err));
      }, [token]);
    
      useEffect(() => {
        fetch("http://localhost:8080/categories", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(data => setCategories(data))
          .catch(err => console.log(err));
      }, [token]);

      
    
      const totalIncome = transactions
        .filter(t => t.income)
        .reduce((sum, t) => sum + Number(t.amount), 0);
    
      const totalExpense = transactions
        .filter(t => !t.income)
        .reduce((sum, t) => sum + Number(t.amount), 0);
    
      const balance = totalIncome - totalExpense;
    
      const chartData = categories
        .map(category => ({
          name: category.name,
          value: transactions
            .filter(
              t =>
                !t.income &&
                t.category?.id === category.id
            )
            .reduce(
              (sum, t) => sum + Number(t.amount),
              0
            )
        }))
        .filter(item => item.value > 0);

        const incomeExpenseData = [
  {
    name: "Income",
    value: totalIncome
  },
  {
    name: "Expense",
    value: totalExpense
  }
];

    const savingsRate =
  totalIncome > 0
    ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1)
    : 0;

    const topCategory =
  chartData.length > 0
    ? chartData.reduce((max, curr) =>
        curr.value > max.value ? curr : max
      )
    : null;

    const ratio =
  totalIncome > 0
    ? ((totalExpense / totalIncome) * 100).toFixed(1)
    : 0;
    
       
  return (
     
    
<>
    <h2 className='text mt-5 display-6 fw-bold'> Expense Analytics </h2>
    <div className="row mt-5">
       <div className="col-md-6">
        <h5 className="text-center">
        Expenses breakdown by category
      </h5>
        <ExpenseBarChart data={chartData}/>
    </div>

    <div className="col-md-6">
      <h5 className="text-center ">
        Expenses visualisation
      </h5>
        <ExpensePieChart data={chartData}/>
    </div>

   

</div>

 <div className="row mt-5">

  {/* Pie Chart */}

    <h2 className='text mt-4 display-6 fw-bold'> Income V/S Expense </h2>

  {/* Metrics Side */}

    <div className="col-md-6">
    <div className=" p-3 h-100">
     

      <IncomeExpensePieChart
        data={incomeExpenseData} 
      />
    </div>
  </div>
    
  <div className="col-md-6">

    <div className="row g-3">

      {/* Savings */}
      <div className="col-md-6 ">
        <div className= "card shadow d-flex justify-content-center align-items-center text-center dashboard-card border-success" style={{ height: "225px" }}>
          <h3>Savings Rate:</h3>
          <h1 className="display-6 fw-bold">{savingsRate}%</h1>
        </div>
      </div>

      {/* Most Used */}
      <div className="col-md-6">
        <div className="card shadow d-flex justify-content-center align-items-center text-center dashboard-card border-danger" style={{ height: "225px" }}>
            
          <h3>Highest Expense in:</h3>

          <h2 className="display-6 fw-bold">
            {topCategory?.name || "N/A"}
          </h2>
        </div>
      </div>

      {/* Transactions - full width */}
      <div className="col-md-12">
        <div className="card shadow d-flex justify-content-center align-items-center text-center dashboard-card border-primary" style={{ height: "225px" }}>
          <h1>Total Transactions:  <div className="display-6 fw-bold">{transactions.length}</div> </h1>
          
        </div>
      </div>

    </div>

  </div>


  

</div>
</>


    
  )
}
