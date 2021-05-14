import axios from "axios";
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILTUE,
} from "./types";
import { authHeader } from "../components/services/authHeader";

export const changePassword = ({
  old_password,
  new_password,
  new_password2,
}) => {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });

    const data = JSON.stringify({ old_password, new_password, new_password2 });

    axios
      .patch(`api/auth/change_password/`, data, authHeader(getState))
      .then((res) => {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_PASSWORD_FAILTUE,
          payload: err,
        });
        console.log(err.response);
      });
  };
};
