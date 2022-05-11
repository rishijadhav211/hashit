import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
  
  var year=new Date().getFullYear();
  return (
    
       <div className='footer'>
             <p className="footercontent">©{year}<a  style={{color:"white"}} href="http://www.walchandsangli.ac.in/"> Walchand College of Engineering, Sangli</a></p>
             
             <Link to="/about">
             <p className="footercontent">Developed Under Walchand Informatics Centre</p> 
             </Link>
        </div>  
    

  );
}

export default Footer;