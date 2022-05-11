import React from "react";

import { Row, Col, Container, Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";

function Profile() {
  const [show, setShow] = React.useState(false);
  const [showChangePass, setShowChangePass] = React.useState(false);
  const [username, setusername] = React.useState("-");
  const [dept, setdept] = React.useState("-");
  const [useremail, setuseremail] = React.useState("-");
  const [redirect, setRedirect] = React.useState(false);
  const [text, setText] = React.useState(null);

  const [logedIN, setlogedIN] = React.useState(true);
  React.useEffect(() => {
    try {
      Axios.post("http://localhost:3002/islogedin", {}).then((response) => {
        if (response && response.status == 266) {
          setlogedIN(true);
          console.log("266");
        } else {
          console.log("login aain");
          setlogedIN(false);
        }
      });
      Axios.get("http://localhost:3002/userdetails", {}).then((response) => {
        if (response && response.status == 201) {
          setusername(response.data.name);
          setuseremail(response.data.email);
          setdept(response.data.dep);
        } else {
          console.log(response);
        }
      });
    } catch (error) {
      console.log(error);
      window.alert("Error!");
    }
  }, []);
  if (!logedIN) {
    return <Redirect to="/" />;
  }

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/passReset",
          state: { email: useremail },
        }}
      />
    );
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleLogout = () => {
    setShow(false);
    Axios.get("http://localhost:3002/logout", {}).then((response) => {
      setText(null);
      if (response && response.status == 201) {
        window.location.reload();
      } else {
        setText("Error Loging out...");
      }
    });
  };
  const handleShow = () => setShow(true);

  const handleCloseforchangePass = () => setShowChangePass(false);
  const handleShowchangePass = () => setShowChangePass(true);

  function dummyforchangepass() {
    setShowChangePass(false);
    setText(null);
    try {
      Axios.get("http://localhost:3002/getOTP", {}).then((response) => {
        if (response && response.status == 201) {
          setRedirect(true);
        } else {
          console.log(response);
        }
      });
    } catch (error) {
      setText("Error Sending OTP..");
      console.log(error);
      window.alert("Error!");
    }
  }

  //SES
  //SES
  return (
    <div className="navfootpad">
      <div>
        <Row style={{ margin: 0, padding: 0 }}>
          <h1
            style={{
              textAlign: "center",
              paddingLeft: "0",
              paddingRight: "0",
              marginRight: "0",
            }}
          >
            Profile
          </h1>
          <hr style={{ margin: 0, padding: 0 }} />
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Loging Out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to Logout!</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Logout
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Loging Out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to Logout!</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showChangePass} onHide={handleCloseforchangePass}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            OTP for Password reset will be sent on registered email!
          </Modal.Body>

          <Modal.Footer>
            <Button variant="warning" onClick={dummyforchangepass}>
              Send OTP
            </Button>
          </Modal.Footer>
        </Modal>

        <div>
          <Container
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              alignContent: "center",
              marginTop: "50px",
              border: "1px solid",
            }}
          >
            <br></br>
            <Row className="justify-content-md-center">
              <Col md={{ span: 3, offset: 4 }}>User Name :</Col>
              <Col md={{ span: 5, offset: 0 }}>
                <p style={{ color: "#707070" }}>{username}</p>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={{ span: 3, offset: 4 }}>Email :</Col>
              <Col md={{ span: 5, offset: 0 }}>
                <p style={{ color: "#707070" }}>{useremail}</p>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={{ span: 3, offset: 4 }}>Department :</Col>
              <Col md={{ span: 5, offset: 0 }}>
                <p style={{ color: "#707070" }}>{dept}</p>
              </Col>
            </Row>
            <br></br>

            <Row className="justify-content-md-center">
              <Col md={{ span: 3, offset: 3 }} style={{ textAlign: "left" }}>

              <Button variant="primary" onClick={handleShow}>Logout</Button>
              </Col>
              <Col md={{ span: 4, offset: 0 }} style={{ textAlign: "left" }}>

              <Button variant="primary" onClick={handleShowchangePass}>Change Password</Button>
                
              </Col>
            </Row>
            <br>
                
            </br>
          </Container>
        </div>
      </div>
      <p style={{ textAlign: "center" }}>{text}</p>
    </div>
  );
}

export default Profile;