import axios from 'axios';
import { FETCH_ORDERS_SUCCESS, FETCH_ORDERS_REQUEST, FETCH_ORDERS_FAILURE, FETCH_ORDER_DETAIL_FAILURE, FETCH_ORDER_DETAIL_REQUEST, FETCH_ORDER_DETAIL_SUCCESS } from './types';
import { authHeader } from '../components/services/authHeader';

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch({type:FETCH_ORDERS_REQUEST})
        axios.get(`api/orders/`, authHeader(getState))
        .then((res) => {
            setTimeout(() => {
                dispatch({
                    type: FETCH_ORDERS_SUCCESS,
                    payload: res.data
                })
            }, 500)
        })
        .catch((err) => {
            dispatch({
                type: FETCH_ORDERS_FAILURE,
                payload: err.message
            })
        })
    }
}

export const fetchDetailOrder = (id) => {
    return (dispatch, getState) => {
        dispatch({type:FETCH_ORDER_DETAIL_REQUEST})
        axios.get(`api/orders/${id}/`, authHeader(getState))
        .then((res)=>{
                dispatch({
                    type: FETCH_ORDER_DETAIL_SUCCESS,
                    payload: res.data
                })
        })
        .catch((err)=>{
            dispatch({
                type: FETCH_ORDER_DETAIL_FAILURE,
                payload: err.message
            })
        })
    }
}
