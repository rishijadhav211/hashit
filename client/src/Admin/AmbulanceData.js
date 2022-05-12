import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap"
import {
    Row,
    Tabs,
    Tab,
    Col,
    Form,
    Button,
    Card,
    Modal,
} from "react-bootstrap";
import Axios from "axios";

function NewRegistered() {


    const [registerAmb,setregisterAmb]= React.useState([]);
    const [text,setText]=React.useState("");


    React.useEffect(() => {

        Axios.get("http://localhost:3002/verifiedAmbulance")
        .then(function (response) {
            console.log(response.data);
            setregisterAmb(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        

    }, []);

    function renderAmb(data) {
        let items = [];

        data.map((item, index) => {
            items.push(
              <Col>
                <Card
                  style={{ width: "20rem", margin: "10px" }}
                 key={index + item.username}
                >
                  <Card.Body>
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col style={{ color: "grey" }}>
                        <i>Name:</i>
                      </Col>
                    </Row>
    
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col>{item.name}</Col>
                    </Row>
    
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col style={{ color: "grey" }}>
                        <i>Address:</i>
                      </Col>
                    </Row>
    
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col>{item.address}</Col>
                    </Row>
    
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col style={{ color: "grey" }}>
                        <i>Ambulance Number:</i>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col>{item.ambNo}</Col>
                    </Row>

                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col style={{ color: "grey" }}>
                        <i>Mobile Number:</i>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col>{item.mobileNo}</Col>
                    </Row>

                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col style={{ color: "grey" }}>
                        <i>Stastus:</i>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col>{item.status?<div style={{color:"green"}}>Available</div>:<div style={{color:"orange"}}>Not Available</div>}</Col>
                    </Row>
    
                    <Row
                      style={{ margin: "20px" }}
                      className="justify-content-md-center"
                    >
                    <Col>
                      <Button
                        variant="danger"
                        //  onClick={() => handleShowfordecline(index, item._id,item.ambNo)}
                      >
                        Decline
                      </Button>
                      </Col>
                      <Col>
                      <Button
                        variant="primary"
                        //  onClick={() => handleShowforverify(index, item.ambID,)}
                      >
                        Verify
                      </Button>
                      </Col>

                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
        });
        return items;
    }
   
  return (
  <>
 <Container>
                <Row md={3}>{renderAmb(registerAmb)}</Row>
            </Container>
            <Row className="justify-content-md-center">
                  <p style={{ color: "red", textAlign: "center" }}>
                    {text}
                  </p>
            </Row>
  </>
  )
}

export default NewRegistered