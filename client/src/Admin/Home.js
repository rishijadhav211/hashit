import React from 'react'
import {Navbar,Container,Nav} from "react-bootstrap"
import NewRegistered from './NewRegistered'
import {BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Ambulancedata from "./AmbulanceData"
import Profile from "./Profile"
import Logoimg from "./logo.png";
import home from "../Home"

function Home() {
  return (
  <>
  <Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand href="/home">
        <img
          alt=""
          src={Logoimg}
          width="40"
          height="40"
          className="d-inline-block align-top"
        />
        Life
      
      </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/admin/NewRegistered">New Registration</Nav.Link>
      <Nav.Link href="/admin/Ambulancedata">Ambulance Data</Nav.Link>
      <Nav.Link href="/admin/Profile">Profile</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
 <Route path="/admin/NewRegistered"   component={NewRegistered}/>
 <Route path="/admin/Ambulancedata"   component={Ambulancedata}/>
 <Route path="/admin/Profile"   component={Profile}/>




 </>
  )
}

export default Home