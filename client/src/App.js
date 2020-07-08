import React from "react";
import Login from "./pages/Login/index"
import Home from './pages/Home/index'
import Profile from './pages/Profile'
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";


// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
    </div>
    </Router>
  );
}

export default App;
