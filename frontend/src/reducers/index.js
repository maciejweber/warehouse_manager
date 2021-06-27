import { combineReducers } from "redux";
import orders from "./orders";
import auth from "./auth";
import accounts from "./accounts";
import messages from "./messages";

export default combineReducers({
  orders,
  auth,
  accounts,
  messages
});
