import React, { Component } from 'react';
import { Navbar,  NavbarBrand ,Nav, NavItem, NavLink, NavbarText, Container} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class NavComp extends Component {
    state = {  } 
    render() { 
      const token = localStorage.getItem("token");

if (!token) {
  return null;
}
        return (
          
    
          <Navbar color='dark' dark='true' expand='md' fixed='top' >
          <NavbarBrand href="/" onClick={()=> {localStorage.removeItem("token")}}> Expenses Tracker</NavbarBrand>
          
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/view-transactions">View Transactions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/add-transaction">Add Transaction</NavLink>
              </NavItem>
              
              </Nav>

              <Nav  navbar>
              <NavItem>
                
                <NavLink
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          
          </Navbar>
     
    
        );
    }
}
 
export default NavComp;