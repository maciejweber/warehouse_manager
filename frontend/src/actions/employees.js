import axios from "axios";
import {
  FETCH_EMPLOYEES_FAILURE,
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
} from "./types";
import { authHeader } from "../components/services/authHeader";

export const fetchEmployees = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_EMPLOYEES_REQUEST });
    axios
      .get(`api/employees/`, authHeader(getState))
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: FETCH_EMPLOYEES_SUCCESS,
            payload: res.data,
          });
        }, 500);
      })
      .catch((err) => {
        dispatch({
          type: FETCH_EMPLOYEES_FAILURE,
          payload: err.message,
        });
      });
  };
};
