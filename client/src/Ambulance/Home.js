import React, { useState, useEffect } from 'react';

import { Card } from 'react-bootstrap';
import axios from 'axios';
import { NavDropdown, Form, Col, Row, Button } from 'react-bootstrap';
import { useHistory, withRouter } from "react-router-dom";

function Home() {

  const [notification, setnotification] = useState([]);
 
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:3001/api/users/login/notify").then((response) => {
      console.log(response.data);
      setnotification(response.data.data)


    });
  }, [])

 

//////////////////////////////Availability////////////////
const [isChecked, setIsChecked] = useState({
  isAvailable: false,
})
const isAvailable= isChecked.isAvailable ? 1 : 0;

console.log(isAvailable);
const url = "http//localhost:3001/api/admin/handleforms";

const submit = (e) => {

    e.preventDefault();

    console.log("in submit")

    axios.post(url, {
        form1: isAvailable,
       
    })
        .then(res => {
            if (res.status === 200) {
                window.alert("Form set Successfully!!")
            }
        })
        .catch(error => {
            console.log(error);
            window.alert("Theres Some Error while posting the notice")
        })
}

const handle = (e) => {
    const newdata = { ...isChecked };
    newdata[e.target.id] = (e.target.checked);
    setIsChecked(newdata);

}

  /////////Go TO Profile ////////

 
  return (
    <>

     

      <Form>
        <Row style={{ "marginTop": "30px", "marginLeft": "50px", "width": "500px" }}>
         
          <Col>
            <Form.Check
              type="checkbox"
              id="isAvailable"
              name="isform1"
              checked={isChecked.isAvailable}
              onChange={(e) => handle(e)}
              label="Make Ambulance Availbale"
            />
          </Col>
          <Col>
          <Button style={{"marginLeft": "-20px"}} onClick={(e) => submit(e)} className="formFieldButton hanldeForm">Set Availability</Button>

          </Col>
        </Row>
      </Form>

       {/* ambulance showcase */}

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


{/* <Route path='/ambulance' component={Ambulance} /> */}
 


    </>
  )
}

export default Home