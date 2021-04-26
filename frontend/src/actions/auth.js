import axios from 'axios';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

import { authHeader } from '../components/services/authHeader';

export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOADING })
        axios.get(`api/auth/user/`, authHeader(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch((err)=>{
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.message
            })
        })
    }
}

export const login = (email, password) => {
    return (dispatch) => {

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };

        const body = JSON.stringify({ email, password });

        axios.post(`api/auth/login/`, body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch((err)=>{
            dispatch({
                type: LOGIN_FAIL,
                payload: err
            })
            console.log(err)
        })
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        axios.post(`api/auth/logout/`, null, authHeader(getState))
        .then((res)=>{
            dispatch({
                type: LOGOUT_SUCCESS
            });
        });
    }
}