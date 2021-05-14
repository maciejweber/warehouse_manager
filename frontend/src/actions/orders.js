import axios from "axios";
import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDER_DETAIL_FAILURE,
  FETCH_ORDER_DETAIL_REQUEST,
  FETCH_ORDER_DETAIL_SUCCESS,
  NEW_ORDER,
  NEW_ORDER_FAILURE,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAILTURE,
} from "./types";
import { authHeader } from "../components/services/authHeader";

export const fetchOrders = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    axios
      .get(`api/orders/`, authHeader(getState))
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: FETCH_ORDERS_SUCCESS,
            payload: res.data,
          });
        }, 500);
      })
      .catch((err) => {
        dispatch({
          type: FETCH_ORDERS_FAILURE,
          payload: err.response.data,
        });
      });
  };
};

export const fetchDetailOrder = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_ORDER_DETAIL_REQUEST });
    axios
      .get(`api/orders/${id}/`, authHeader(getState))
      .then((res) => {
        dispatch({
          type: FETCH_ORDER_DETAIL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_ORDER_DETAIL_FAILURE,
          payload: err.response.data,
        });
      });
  };
};

export const newOrder = (order) => {
  return (dispatch, getState) => {
    axios
      .post(`api/orders/`, order, authHeader(getState))
      .then((res) => {
        dispatch({
          type: NEW_ORDER,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: NEW_ORDER_FAILURE,
          payload: err.response.data,
        });
        console.log(err.response);
      });
  };
};

export const changeStatus = (id, status) => {
  return (dispatch, getState) => {
    axios
      .patch(`api/orders/${id}/`, status, authHeader(getState))
      .then((res) => {
        dispatch({
          type: CHANGE_STATUS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_STATUS_SUCCESS,
          payload: err.response.data,
        });
      });
  };
};
