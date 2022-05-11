import React from 'react'
import {Navbar,Container,Nav} from "react-bootstrap"

function Home() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
    <Container>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    homeeeeeeee
    </Container>

  </Navbar>
    </>
  )
}

export default Home