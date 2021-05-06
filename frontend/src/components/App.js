import React, { useEffect } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

import PrivateRoute from './common/PrivateRoute';

import Header from './layout/Header';
import OrdersPage from './pages/OrdersList';
import { OrderDetail } from "./pages/OrderDetail";
import Login from "./pages/Login";
import {loadUser} from '../actions/auth';
import AddOrder from "./pages/AddOrder";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import ClientDetail from "./pages/ClientDetail";
import Settings from "./pages/Settings";

function App() {
    return (
      <Provider store={store}>
        <Router>
        <Header/>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <Alert/> */}
          <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoute exact path='/' component={OrdersPage} />
            <PrivateRoute exact path='/orders/new' component={AddOrder} />
            <PrivateRoute path='/orders/:orderId' component={OrderDetail} />
            <PrivateRoute path='/clients/:id' component={ClientDetail} />
            <PrivateRoute path='/clients/' component={Clients} />
            <PrivateRoute path='/employees/' component={Employees} />
            <PrivateRoute path='/settings/' component={Settings} />
          </Switch>
        </div>
        </Router>
        </Provider>
    );
  }
  
export default App;
