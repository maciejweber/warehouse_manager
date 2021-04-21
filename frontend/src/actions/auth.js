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

export const loadUser = () => {
    return (dispatch) => {
        dispatch({ type: USER_LOADING })
        axios.get(`api/auth/user/`, tokenConfig(getState))
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

export const tokenConfig = () => {
    return (dispatch) => {
        const token = getState().auth.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token){
            config.headers['Authorization'] = `Token ${token}`
        }

        return config;
    }
}