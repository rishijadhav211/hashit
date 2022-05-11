import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap"
import Profile from './Profile';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from 'axios';

function Home() {

  const [notification, setnotification] = useState([]);

  useEffect(() => {
      axios.get("http://localhost:3001/api/users/login/notify").then((response) => {
          console.log(response.data);
          setnotification(response.data.data)


      });
  }, [])


  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/ambulance">Home</Nav.Link>
            <Nav.Link href="/ambulance/profile">Profile</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      {/* {
        amb.map(amb => (
          <div className="row">
            <div className="column">
              <div className="mard">
                <div>
                  <Card.Body>
                    <Card.Title>Ambulance No: {amb.ambNo}</Card.Title>
                    <Card.Subtitle className="">:  {amb.date}</Card.Subtitle>
                    <Card.Text>Source: {amb.source} </Card.Text>
                    <Card.Text>Destination: {amb.destination} </Card.Text>

                  </Card.Body>
                </div>
              </div>
            </div>
          </div>
        ))
      } */}



      <Route path='/ambulance/profile' component={Profile} />

    </>
  )
}

export default Home