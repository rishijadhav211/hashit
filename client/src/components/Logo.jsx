import React from "react";
import { Redirect, useHistory,Link } from "react-router-dom";
import Logoimg from "../images/logo.png";


function Logo(props) {

  return (
    <Link to="/">
    <img style={props.style} className="logo1" src={Logoimg} alt="Logo" /> 
</Link>
  );
}

export default Logo;