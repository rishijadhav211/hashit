import { NavDropdown, Form, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { Navbar, Container, Nav } from "react-bootstrap"
import Profile from './Profile';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import Home from './Home';


function Dash() {

  let history = useHistory();
  const [profileData, setProfileData] = useState([]);
    function logout() {
        console.log("in logout")
        const url = "http://localhost:3001/api/admin/logout";
    
        axios.get(url, {
          withCredentials: true,
        })
          .then(res => {
            console.log(res);
            console.log(res.status);
    
            if (res.status === 200) {
              document.location.href = 'http://localhost:3000/'
            }
            else {
              window.alert("no")
            }
    
          })
          .catch(error => {
            console.log(error);
            window.alert("backend issue")
          })
      }
    
      function profile() {
        history.push('./profile')
      }    
  return (
    <>
    
    <Navbar style={{ "backgroundColor": "#6c9bc8" }}>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/ambulance/home">Home</Nav.Link>
            <Nav.Link href="/ambulance/profile">Profile</Nav.Link>

          </Nav>
          <div className='user'>
            <NavDropdown title={profileData.name}>
              <NavDropdown.Item onClick={profile}>profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>sign out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Container>

      </Navbar>

    <Route path='/ambulance/profile' component={Profile} />
      <Route path='/ambulance/home' component={Home} />
    </>
  )
}

export default Dash