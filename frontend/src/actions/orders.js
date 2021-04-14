import axios from 'axios';
import { FETCH_ORDERS_SUCCESS, FETCH_ORDERS_REQUEST, FETCH_ORDERS_FAILURE } from './types';

export const fetchOrders = () => {
    return (dispatch) => {
        dispatch({type:FETCH_ORDERS_REQUEST})
        axios.get(`api/orders/`)
        .then((res) => {
            setTimeout(() => {
                dispatch({
                    type: FETCH_ORDERS_SUCCESS,
                    payload: res.data
                })
            }, 1200)
        })
        .catch((err) => {
            dispatch({
                type: FETCH_ORDERS_FAILURE,
                payload: err.message
            })
        })
    }
}