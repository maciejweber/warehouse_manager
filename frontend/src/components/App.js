import React, { useEffect } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./common/PrivateRoute";
import AdminRoute from "./common/AdminRoute";

import Header from "./layout/Header";
import OrdersPage from "./pages/OrdersList";
import { OrderDetail } from "./pages/OrderDetail";
import Login from "./pages/Login";
import AddOrder from "./pages/AddOrder";
import Settings from "./pages/Settings";
import AccountsList from "./pages/AccountsList";
import { loadUser } from "../actions/auth";
import AccountDetail from "./pages/AccountDetail";
import AddAccount from "./pages/AddAccount";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PrivateRoute exact path="/" component={OrdersPage} />
          <PrivateRoute path="/new" component={AddOrder} />
          <PrivateRoute path="/orders/:orderId" component={OrderDetail} />
          <PrivateRoute path="/settings/" component={Settings} />
          <AdminRoute exact path="/accounts/" component={AccountsList} />
          <AdminRoute path="/add" component={AddAccount} />
          <AdminRoute path="/accounts/:accountId/" component={AccountDetail} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
