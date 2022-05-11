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
    const [lefttabtext, setLefttabtext] = React.useState("");
    const [registerAmb,setregisterAmb]= React.useState([1,2,3,4,5]);

    React.useEffect(() => {


        Axios.get("http://localhost:3002/getalladmin")
            .then(function (response) {
                // const res = response.data[0];
                if (response.status == 201) {
                    setregisterAmb(response.data.users);
                } else {
                    setLefttabtext("Data not found");
                }
            })
            .catch(function (error) {
                console.log(error);
                setLefttabtext("Data not found");
            })
            .catch(function (error) {
                console.log(error);
                setLefttabtext("Data not found");
            });

    }, []);

    function renderAmb(data) {
        let items = [];

        data.map((item, index) => {
            items.push(
              <Col>
                <Card
                  style={{ width: "20rem", margin: "10px" }}
                //   key={index + item.username}
                >
                  <Card.Body>
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col style={{ color: "grey" }}>
                        <i>Username:</i>
                      </Col>
                    </Row>
    
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      {/* <Col>{item.username}</Col> */}
                    </Row>
    
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col style={{ color: "grey" }}>
                        <i>Email:</i>
                      </Col>
                    </Row>
    
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      {/* <Col>{item.email}</Col> */}
                    </Row>
    
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col style={{ color: "grey" }}>
                        <i>Department:</i>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "20px", marginRight: "20px" }}>
                      <Col>{item.deptID}</Col>
                    </Row>
    
                    <Row
                      style={{ margin: "20px" }}
                      className="justify-content-md-center"
                    >
                    <Col>
                      <Button
                        variant="danger"
                        // onClick={() => handleShow(index, item.username, item.email)}
                      >
                        Decline
                      </Button>
                      </Col>
                      <Col>
                      <Button
                        variant="primary"
                        // onClick={() => handleShow(index, item.username, item.email)}
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
                    {lefttabtext}
                  </p>
            </Row>
        </>
    )
}

export default NewRegistered