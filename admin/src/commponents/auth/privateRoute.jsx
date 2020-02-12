import React from "react";
import { Route, Redirect } from "react-router-dom";
const AuthContext = React.createContext();
export const PrivateRoute = ({ component: Component, loggedin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);
