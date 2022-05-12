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


    const [registerAmb,setregisterAmb]= React.useState([1,2,3,3]);


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
  return (
  <>
 
  </>
  )
}

export default NewRegistered