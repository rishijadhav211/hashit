import React from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Ambulance from "./pages/Ambulance/Home";

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
