import React from "react";
import Home from "./Home";
import Admin from "./Admin/Home";
import Ambulance from "./Ambulance/Home";
import {BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';


function App() {
  return (
    <>
 <Router>    
      <div className="App">
   
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/admin"   component={Admin}/>
          <Route path="/ambulance"   component={Ambulance}/>
        </Switch>
      </div>
    
    </Router>
      </>
      );
}

      export default App;
