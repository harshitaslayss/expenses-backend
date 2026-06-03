import React, { Component } from 'react'
import { Navbar,  NavbarBrand ,Nav, NavItem, NavLink, NavbarText} from 'reactstrap';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Pages/Dashboard';
import {Route, Routes} from 'react-router-dom';
import AddForm from './Pages/AddForm';
import ExpenseRecord from './Pages/ExpenseRecord';
import Registration from './Pages/Registration';
import RegistrationSuccessful from './Pages/RegistrationSuccessful';
import Login from './Pages/Login';
import LoginSuccessful from './Pages/LoginSuccessful';





class App extends Component {
  state = {  } 
  render() { 
    return (
      <div>
        
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/dashboard' element={<Dashboard/>}/>
     
        <Route  path='/add-transaction' element={<AddForm/>}/>
        <Route path='/add-transaction/:id' element={<AddForm/>}/>
        <Route  path='/view-transactions' element={<ExpenseRecord/>}/>
        <Route  path='/register-user' element={<Registration/>}/>
        <Route  path='/registration-success' element={<RegistrationSuccessful/>}/>
        <Route  path='/login-user' element={<Login/>}/>
        <Route  path='/login-success' element={<LoginSuccessful/>}/>
        
        
      </Routes>
      
        
      
      </div>
     
    );
  }
}
 
export default App;
