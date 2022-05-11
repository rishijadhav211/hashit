import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { Sidebardata } from "./Sidebardata";
import { IconContext } from "react-icons";
import Logo from "./Logo";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [currentuserDep,setcurrentuserDep]= useState('');
  const [data1,setdata]=useState(Sidebardata);
  const showSidebar = () => setSidebar(!sidebar);
  const hide = () => setSidebar(false);
  const show = () => setSidebar(true);

  
  React.useEffect(()=> {
    Axios.get("http://localhost:3002/userdetails")
    .then(function (response) {
  
      if(response.status==201){
        
        console.log(response);
        setcurrentuserDep(response.data.dep);
        console.log(currentuserDep)
      }
      else{
        console.log("error fetching user info");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
     
    
  }, []);

   function side(dep) {
    if(dep!="ALL"){ 
      const copyPostArray = Object.assign([], data1);
      copyPostArray.splice(3, 1);
      setdata(copyPostArray);
      console.log("--+++++++++++=====");
 }
  }

  function rendersidebar(){
  //   Axios.get("http://localhost:3002/userdetails")
  // .then(function (response) {

  //   if(response.status==201){
  //     console.log(response);
  //     setcurrentuserDep(response.data.dep);
  //   }
  //   else{
  //     console.log("error fetching user info");
  //   }
  // })
  // .catch(function (error) {
  //   console.log(error);
  //   return(<p>Error fetching user detail</p>);
  // });

  // if(currentuserDep!='ALL'){
  //      Sidebardata.splice(5, 1);
  // }
 
 let items=[];
  data1.map((item, index) => {
    items.push (
      <li key={index} className={item.cName}>
        <Link to={item.path}>
          {item.icon}
          <span style={{ marginLeft: "10px" }}>{item.title}</span>
        </Link>
      </li>
    );
  })
  return items;
  }
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Container
          fluid
          className="navcontainer"
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Row style={{ padding: 0, margin: 0 }}>
            <Col sm={4} className="navbarleft">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars
                  onClick={showSidebar}
                  onBlur={hide}
                  onFocus={show}
                  style={{ paddingTop: "0px" }}
                />
              </Link>
              <Logo
                style={{
                  height: "80px",
                  marginTop: "1px",
                  marginBottom: "1px",
                }}
              />
            </Col>
            <Col sm={8} className="navbarright">
            <Link to="/" style={{textDecoration:"none"}}> <h1 className="titlenameNav">Asset Registry</h1> </Link>
              <h3 className="collegeNameNav">
                Walchand College Of Engineering,Sangli
              </h3>
              <h3 className="aided">(Government Aided Autonomous Institute)</h3>
            </Col>
          </Row>
        </Container>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul
            className="nav-menu-items"
            style={{ paddingLeft: "0" }}
            onClick={showSidebar}
            onBlur={hide}
            onFocus={show}
          >
            {/* {Sidebardata.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{ marginLeft: "10px" }}>{item.title}</span>
                  </Link>
                </li>
              );
            })} */}
            {rendersidebar()}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
