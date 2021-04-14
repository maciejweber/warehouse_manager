import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

import Header from './layout/Header';
import OrdersPage from '../components/orders/OrdersPage';
import { OrderDetail } from "./orders/OrderDetail";

function App() {
    return (
      <Provider store={store}>
        <Router>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <Alert/> */}
          <Switch>
            <Route exact path='/' component={OrdersPage} />
            <Route path='/orders' component={OrderDetail} />
          </Switch>
        </div>
        </Router>
        </Provider>
    );
  }
  
export default App;

const container = document.getElementById("app");
render(<App />, container);