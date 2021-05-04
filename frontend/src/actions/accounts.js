import axios from 'axios';
import { ACTIVATE_ACCOUNT_SUCCESS, ACTIVATE_ACCOUNT_FAILURE, DEACTIVATE_ACCOUNT_FAILURE, DEACTIVATE_ACCOUNT_SUCCESS} from './types';
import { authHeader } from '../components/services/authHeader';

export const activateAccount = (id) => {
    return (dispatch, getState) => {
        axios.patch(`api/accounts/${id}/activate/`, authHeader(getState))
        .then(() => {
            dispatch({
                type: ACTIVATE_ACCOUNT_SUCCESS
            });
        })
        .catch(() => {
            dispatch({
                type: ACTIVATE_ACCOUNT_FAILURE
            });
        });
    };
};

export const deactivateAccount = (id) => {
    return (dispatch, getState) => {
        axios.patch(`api/accounts/${id}/deactivate/`, authHeader(getState))
        .then(() => {
            dispatch({
                type: DEACTIVATE_ACCOUNT_SUCCESS
            });
        })
        .catch(() => {
            dispatch({
                type: DEACTIVATE_ACCOUNT_FAILURE
            });
        });
    };
};

