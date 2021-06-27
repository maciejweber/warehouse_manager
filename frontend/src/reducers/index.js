import { combineReducers } from "redux";
import orders from "./orders";
import auth from "./auth";
import accounts from "./accounts";

export default combineReducers({
  orders,
  auth,
  accounts,
});
