import React from "react";
import Logo from "./Logo";
import { Link } from 'react-router-dom';
function LanLeft() {
  var year=new Date().getFullYear();
  return (
    <div className="lanleft">
    <div className="logodiv">
    <Logo style={{height:"300px"}}/>
    </div>
    <div>
      <h1 className="titlename">Asset Registry</h1>
      <h3 className="collegeName">Walchand College Of Engineering,Sangli</h3>
      <h3  className="aidedmain" >(Government Aided Autonomous Institute)</h3>
      <br></br>
      <br></br>
      <p className="footercontent">©{year}<a  style={{color:"white"}} href="http://www.walchandsangli.ac.in/"> Walchand College of Engineering, Sangli</a></p>
             
             <Link to="/about">
             <p className="footercontent">Developed Under Walchand Informatics Centre</p> 
             </Link>
    </div>
      
       
    </div>
    
  );
}

export default LanLeft;