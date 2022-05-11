import React from "react";
import Logo from "./Logo";
import { Container ,Row,Col } from 'react-bootstrap';

function TitleBar() {
  
  return (
    <>
    <Container fluid className="navcontainer" style={{padding:0,margin:0}}>
  <Row style={{padding:0,margin:0}}>
    <Col sm={4}  className="navbarleft" >
          <Logo style={{height:"80px",marginTop:"1px",marginBottom:"1px"}}/>
    </Col>
    <Col sm={8}  className="navbarright">
         <h1 className="titlenameNav">Asset Registry</h1>
         <h3  className="collegeNameNav" >Walchand College Of Engineering,Sangli</h3>
         <h3  className="aided" >(Government Aided Autonomous Institute)</h3>
    </Col>
  </Row>
</Container>
    </>
  );
}

export default TitleBar;