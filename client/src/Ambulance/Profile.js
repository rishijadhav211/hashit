import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Component, useState } from "react";
import { Row, Form, Col, Placeholder } from 'react-bootstrap';

import * as CgIcons from 'react-icons/cg';
import { useHistory, withRouter } from "react-router-dom";
import './temp.css';





function Profile() {



  const history = useHistory();

  const url = "http://localhost:3002/updateProfile";


  const [data, setData] = useState({
    email: "",
    name: "",
    mobileNo: "",
    ambNo: "",
    rate: "",
    address: "",
    city: "",
    pincode: ""
  });

  const submit = (e) => {

    e.preventDefault();
    console.log("We r in submit");
    axios.patch(url, {

      email: data.email,
      name: data.name,
      mobileNo: data.mobileNo,
      ambNo: data.ambNo,
      rate: data.rate,
      address: data.address,
      city: data.city,
      pincode: data.pincode,


    })
      .then(res => {

        if (res.status === 200) {
          window.alert("Profile Updated Successfully")
        }
      })
      .catch(error => {
        console.log(error);
        window.alert("Invalid Data")

      })
  }

  function handle(e) {

    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);

  }



  ////////////////// fetching start///////////
  const [profileData, setProfileData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3002/ambulanceProfile").then((response) => {
      console.log(response.data);
      setProfileData(response.data.data)


    });
  }, [])

  ////////////////// fetching End///////////



  return (

    <>
    <h1 style={{"marginLeft": "350px", "marginTop": "30px"}}> Profile</h1>
        <div className="profform">
          <Form onSubmit={(e) => submit(e)}>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  //  id="email"
                  required
                  value={data.email}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.email} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm="2">
                Full Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text"
                  //  id="name" 
                  required
                  value={data.name}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phoneno">
              <Form.Label column sm="2">
                Phone No
              </Form.Label>
              <Col sm="10">
                <Form.Control type="number"
                  //  id="phoneno"
                  required
                  value={data.phoneno}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.phoneno}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="rate">
              <Form.Label column sm="2">
                Rate
              </Form.Label>
              <Col sm="10">
                <Form.Control type="number"
                  //  id="phoneno"
                  required
                  value={data.rate}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.rate}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="ambNo">
              <Form.Label column sm="2">
                Ambulance No
              </Form.Label>
              <Col sm="10">
                <Form.Control type="number"
                  //  id="phoneno"
                  required
                  value={data.ambNo}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.ambNo}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="address">
              <Form.Label column sm="2">
                Address
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text"
                  //  id="name" 
                  required
                  value={data.address}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.address}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="city">
              <Form.Label column sm="2">
                City
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text"
                  //  id="name" 
                  required
                  value={data.city}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.city}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="pinCode">
              <Form.Label column sm="2">
               Pin Code
              </Form.Label>
              <Col sm="10">
                <Form.Control type="number"
                  //  id="phoneno"
                  required
                  value={data.pinCode}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.pinCode}
                />
              </Col>
            </Form.Group>


            <button className="formFieldButton update" type="submit">Update Profile</button>{" "}
          </Form>
        </div>
      





    </>
  )

}

export default Profile;
