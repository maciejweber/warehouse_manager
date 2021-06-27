import axios from "axios";
import {
  FETCH_ACCOUNTS_FAILURE,
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILTURE,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_FAILTURE,
} from "./types";
import { authHeader } from "../components/services/authHeader";

export const fetchAccounts = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_ACCOUNTS_REQUEST });
    axios
      .get(`api/accounts/`, authHeader(getState))
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: FETCH_ACCOUNTS_SUCCESS,
            payload: res.data,
          });
        }, 500);
      })
      .catch((err) => {
        dispatch({
          type: FETCH_ACCOUNTS_FAILURE,
          payload: err.message,
        });
      });
  };
};

export const updateAccount = (id, data) => {
  return (dispatch, getState) => {
    axios
      .patch(`api/accounts/${id}/`, data, authHeader(getState))
      .then((res) => {
        dispatch({
          type: UPDATE_ACCOUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_ACCOUNT_FAILTURE,
          payload: err.response.data,
        });
      });
  };
};

export const addAccount = (data) => {
  const account = JSON.stringify(data);
  console.log(account);
  return (dispatch, getState) => {
    axios
      .post(`api/accounts/`, account, authHeader(getState))
      .then((res) => {
        dispatch({
          type: ADD_ACCOUNT_SUCCESS,
          payload: res.data,
        });
        console.log(res);
      })
      .catch((err) => {
        dispatch({
          type: ADD_ACCOUNT_FAILTURE,
          payload: err.response.data,
        });
        console.log(err);
      });
  };
};
