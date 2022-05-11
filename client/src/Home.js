import React from "react";
import { useState } from "react";
import axios from 'axios';
import { NavDropdown, Button } from 'react-bootstrap';
import { useHistory, withRouter } from "react-router-dom";
import { useEffect } from 'react';

import {
  Form,
  Navbar,
  Tabs,
  Tab,
  Row,
  Col,
  Card,
  Container,
  Nav,
} from "react-bootstrap";

function Home() {
  const [text, settext] = useState("");
  const [Resmsg, setResmsg] = React.useState(null);
  const [validated, setValidated] = React.useState(false);
  const [key, setKey] = React.useState("Search");
  const [mailplaceholder, setmailplaceholder] = useState("Password");

  function resetPass() { }
  function resetform() {
    setResmsg(null);
    setValidated(false);
    document.getElementById("addassetform").reset();
  }
  function handleLogin(e) { }
  async function handleSubmit(event) { }

  const [amb, setamb] = useState([]);
  const[pincode, setPinCode] = useState("");

  console.log(pincode);

  useEffect(() => {
    axios.get("http://localhost:3001/api/users/login/notify",{
      pinCode: pincode
    }).then((response) => {
      console.log(response.data);
      setamb(response.data.data)



    });
  }, [])
  function handle(e) {
    const newdata = { ...pincode };
    newdata[e.target.id] = e.target.value;
    setPinCode(newdata);
    // console.log(newdata);
}

  return (
    <>
      <div style={{ textAlign: "center", height: "75px" }}>
        <h1 style={{ backgroundColor: "#6c9bc8", height: "75px" }}>Ambulance Aggregator</h1>
      </div>

      <div style={{ margin: "30px" }}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Login" title="Request Ambulance">

            <Form>
              <Row>
                <Col>
                  <Form.Control style ={{"width" : "500px"}} id="pincode" onChange={(e) => handle(e)} name="name" placeholder="Enter Pin Code" />
                </Col>
                <Col>
                <Button style={{"marginLeft": "-200px"}} className="formFieldButton hanldeForm">Search Ambulances</Button>

                </Col>
              </Row>
            </Form>
            {/* {amb.map(amb => (
           <div className="row">
             <div className="column">
               <div className="mard">
                 <div>
                   <Card.Body>
                     <Card.Title>Ambulance No: </Card.Title>
                     <Card.Subtitle className="">:  </Card.Subtitle>
                     <Card.Text>Source:  </Card.Text>
                     <Card.Text>Destination: </Card.Text>

                 </Card.Body>
               </div>
             </div>
           </div>
         </div>
       ))} */}
            <div className="row">
              <div className="column">
                <div className="mard">
                  <div>
                    <Card.Body>
                      <Card.Title style={{ "textAlign": "center" }}>Ambulance No: </Card.Title>
                      <Card.Text style={{ "textAlign": "center" }}>Provider Name:  </Card.Text>
                      <Card.Text style={{ "textAlign": "center" }}>Current Location:  </Card.Text>
                      <Card.Text style={{ "textAlign": "center" }}>Phone No: </Card.Text>
                      {/* <Card.Text style={{"textAlign":"center"}}>Patient Phone No: </Card.Text> */}

                    </Card.Body>
                  </div>
                </div>
              </div>
            </div>


          </Tab>
          <Tab eventKey="Search" title=" Register Ambulance">
            <Row style={{ margin: 0, padding: 0 }}>
              <h3
                style={{
                  textAlign: "center",
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginRight: "0",
                }}
              >
                Register Ambulance
              </h3>
              <hr style={{ margin: 0, padding: 0 }} />
            </Row>
            <Row>
              <Form
                className="formRow"
                id="addassetform"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <Row style={{ padding: "10px" }}>
                  <Col md="6" style={{ padding: 0, margin: 0 }}>
                    <Row style={{ padding: 0, margin: 0 }}>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Name"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder="Email"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col md="6" style={{ padding: 0, margin: 0 }}>
                    <Row style={{ padding: 0, margin: 0 }}>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Rate per Km.</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Rate"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Mobile Number"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <Row style={{ padding: "10px" }}>
                  <Col md="6" style={{ padding: 0, margin: 0 }}>
                    <Row style={{ padding: 0, margin: 0 }}>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Ambulance No</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Ambulance No"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Adress</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Address"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col md="6" style={{ padding: 0, margin: 0 }}>
                    <Row style={{ padding: 0, margin: 0 }}>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          required
                          type="City"
                          placeholder="City"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Pincode"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <Row style={{ padding: "10px" }}>
                  <Col md="6" style={{ padding: 0, margin: 0 }}>
                    <Row style={{ padding: 0, margin: 0 }}>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          placeholder="PAssword"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col md="6" style={{ padding: 0, margin: 0 }}>
                    <Row style={{ padding: 0, margin: 0 }}>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Confirm Password"
                        // onChange={(e) => setMake(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>
                <hr className="hrline" />
                <br />
                <p style={{ textAlign: "center" }}>{Resmsg}</p>
                <div style={{ textAlign: "center" }}>
                  <button className="lanButton" onClick={resetform}>
                    Reset
                  </button>
                  <button className="lanButton" type="submit">
                    Save And Next
                  </button>
                </div>
              </Form>
            </Row>
          </Tab>
          <Tab eventKey="aboutus" title="Admin Login">
            <div style={{ textAlign: "center" }}>
              <form>
                <Row style={{ margin: 0, padding: 0 }}>
                  <h3
                    style={{
                      textAlign: "center",
                      paddingLeft: "0",
                      paddingRight: "0",
                      marginRight: "0",
                    }}
                  >
                    Admin Login
                  </h3>
                </Row>
                <input
                  spellCheck={false}
                  type="email"
                  // onChange={(e) => setEmail(e.target.value)}
                  className="email"
                  placeholder="Email"
                />
                <br />
                <input
                  type="password"
                  className="password"
                  // onChange={(e) => setPass(e.target.value)}
                  placeholder={mailplaceholder}
                />
                <br />
                <button
                  id="signinbtn"
                  onClick={handleLogin}
                  className="lanButton"
                >
                  Sign In
                </button>
                <button
                  id="forgetpassbtn"
                  onClick={resetPass}
                  className="lanButton"
                >
                  Forgot Password
                </button>
                <br />
                <p>{text}</p>
              </form>
            </div>
          </Tab>
        </Tabs>
      </div>
      {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Reister Ambulance</Nav.Link>
            <Nav.Link href="#features">Request Ambulance</Nav.Link>
            <Nav.Link href="#pricing">Admin Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
      {/* <Row style={{ margin: 0, padding: 0 }}>
        <h1
          style={{
            textAlign: "center",
            paddingLeft: "0",
            paddingRight: "0",
            marginRight: "0",
          }}
        >
          Request Ambulance
        </h1>
        <hr style={{ margin: 0, padding: 0 }} />
      </Row>
      <Row>
        <Col>2of 1</Col>
      </Row>
      <Row style={{ margin: 0, padding: 0 }}>
        <h1
          style={{
            textAlign: "center",
            paddingLeft: "0",
            paddingRight: "0",
            marginRight: "0",
          }}
        >
          Admin Login
        </h1>
        <hr style={{ margin: 0, padding: 0 }} />
      </Row>
      <Row>
        <Col>3 of 1</Col>
      </Row> */}
    </>
  );
}

export default Home;
