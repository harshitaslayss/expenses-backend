import React, { Component } from 'react';
import { Card, CardHeader,CardTitle, CardBody} from "reactstrap";

function CardComp({title, value, color}){
    
    return (
    <Card
    className="my-2"
    color= {color}
    inverse
    style={{
      width: '20rem',
      height: '10rem'
    }}
    >

    <CardBody style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // vertical center
    alignItems: 'flex-start', // left align text
    height: '100%'
  }}>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardTitle tag="h1" style={{textAlign:'center', fontSize:'2.5rem'}}>₹{value}</CardTitle>
    </CardBody>
  </Card>
        );

    }

 export default CardComp;
