import axios from 'axios';
import { FETCH_CLIENTS_REQUEST, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE} from './types';
import { authHeader } from '../components/services/authHeader';

export const fetchClients = () => {
    return (dispatch, getState) => {
        dispatch({type:FETCH_CLIENTS_REQUEST})
        axios.get(`api/clients/`, authHeader(getState))
        .then((res) => {
            setTimeout(() => {
                dispatch({
                    type: FETCH_CLIENTS_SUCCESS,
                    payload: res.data
                });
            }, 500)
        })
        .catch((err) => {
            dispatch({
                type: FETCH_CLIENTS_FAILURE,
                payload: err.message
            });
        });
    };
};

