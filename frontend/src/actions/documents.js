import axios from "axios";
import {
  ADD_DOCUMENT_FAILTUE,
  ADD_DOCUMENT_REQUEST,
  ADD_DOCUMENT_SUCCESS,
} from "./types";
import { authHeader } from "../components/services/authHeader";

export const addDocument = (document) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_DOCUMENT_REQUEST });
    axios
      .post(`api/documents/`, document, authHeader(getState))
      .then((res) => {
        dispatch({
          type: ADD_DOCUMENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_DOCUMENT_FAILTUE,
          payload: err.response.data,
        });
        console.log(err.response);
      });
  };
};
