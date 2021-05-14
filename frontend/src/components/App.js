import React, { useEffect } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store";

import PrivateRoute from "./common/PrivateRoute";
import AdminRoute from "./common/AdminRoute";

import Header from "./layout/Header";
import OrdersPage from "./pages/OrdersList";
import { OrderDetail } from "./pages/OrderDetail";
import Login from "./pages/Login";
import AddOrder from "./pages/AddOrder";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import ClientDetail from "./pages/ClientDetail";
import Settings from "./pages/Settings";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PrivateRoute exact path="/" component={OrdersPage} />
            <PrivateRoute path="/new" component={AddOrder} />
            <PrivateRoute path="/orders/:orderId" component={OrderDetail} />
            <PrivateRoute path="/settings/" component={Settings} />
            <AdminRoute exact path="/clients/" component={Clients} />
            <AdminRoute path="/clients/:id" component={ClientDetail} />
            <AdminRoute path="/employees/" component={Employees} />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
