import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../auth/helpers";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />
);

export default AdminRoute;
