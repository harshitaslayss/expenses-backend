import React from 'react'

const Footer = () => {
  return (
<footer className="bg-dark border-top py-4 mt-5">
  <div className="container text-center">
    <p className="mb-1 fw-semibold text-light">
       Thank you for using Expense Manager <>{"<3"}</>
    </p>

    <small className="text-light">
      Built with React, Spring Boot, MySQL 
    </small>
  </div>
</footer>

  )
}

export default Footer

