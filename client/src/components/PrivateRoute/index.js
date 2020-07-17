import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom'
import store from '../../utils/store'

function PrivateRoute ({ children, ...rest }) {
  const { Auth } = store.getState()
  let location = useLocation()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute