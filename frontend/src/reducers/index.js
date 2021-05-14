import { combineReducers } from "redux";
import orders from "./orders";
import auth from "./auth";
import clients from "./clients";
import employees from "./employees";

export default combineReducers({
  orders,
  auth,
  clients,
  employees,
});
