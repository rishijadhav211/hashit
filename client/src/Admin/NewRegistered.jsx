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
    const [registerAmb,setregisterAmb]= React.useState([1,2,3,3]);
    const [showdelete,setShowdelete]=React.useState(false);
    const [currentdelamb,setcurrentdelamb]=React.useState("");
    const [showverified,setshowverified]=React.useState(false);

    React.useEffect(() => {

        Axios.get("http://localhost:3002/adminAmb")
        .then(function (response) {
          
            console.log(response.data);
            setregisterAmb(response.data);
          
        })
        .catch(function (error) {
          console.log(error);
        });
        

    }, []);


   function  handleShowforverify(currentindex, ID){
   
    Axios.patch("http://localhost:3002/verifyAmb", {
        ambID:ID
    }).then((response) => {
      console.log(response);
      if (response.status == 201) {
        setshowverified(true);
        const copyPostArray = Object.assign([],registerAmb);
        copyPostArray.splice(currentindex, 1);
        setregisterAmb(copyPostArray);
      } else {
        console.log("error ");
      }
        
    }).catch(function (error) {
        console.log(error);
      });

   }

   function handleShowfordecline(currentindex,ID,amb){

    console.log("========================",ID);
    Axios.post("http://localhost:3002/rejectAmb", {
        ambID:ID
    }).then((response) => {
        console.log(response);
          setShowdelete(true);
          setcurrentdelamb(amb);
          const copyPostArray = Object.assign([],registerAmb );
          copyPostArray.splice(currentindex, 1);
          setregisterAmb(copyPostArray);
      }).catch(function (error) {
          console.log(error);
        });
   }
   
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
    
                    <Row
                      style={{ margin: "20px" }}
                      className="justify-content-md-center"
                    >
                    <Col>
                      <Button
                        variant="danger"
                         onClick={() => handleShowfordecline(index, item._id,item.ambNo)}
                      >
                        Decline
                      </Button>
                      </Col>
                      <Col>
                      <Button
                        variant="primary"
                         onClick={() => handleShowforverify(index, item.ambID,)}
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

    const handleClosedecline = () => {
        setShowdelete(false);
      };

    return (
        <>
        <Modal show={showdelete} onHide={handleClosedecline}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Alert!</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          Request Declined for: {" "+currentdelamb}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={showverified} onHide={()=>setshowverified(false)}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Alert!</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          Ambulance Verified!
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>


<br>
    
</br>

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