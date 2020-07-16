import React from "react";
import Login from "./pages/Login/index"
import Home from './pages/Home/index'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'
import './style.css'


// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/match">
          <Route exact path="/match" component={Home} /> 
        </PrivateRoute >
        <PrivateRoute path='/profile'>
        <Route exact path="/profile" component={Profile} />
        </PrivateRoute>
        <PrivateRoute path='/messages'>
        <Route exact path="/messages" component={Messages} />
        </PrivateRoute>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
