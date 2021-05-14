import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h1>Loading...</h1>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
