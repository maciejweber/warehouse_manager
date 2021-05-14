import axios from "axios";
import {
  ADD_COMMENT_FAILTUE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILTURE,
} from "./types";
import { authHeader } from "../components/services/authHeader";

export const addComment = (comment) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_COMMENT_REQUEST });
    axios
      .post(`api/comments/`, comment, authHeader(getState))
      .then((res) => {
        dispatch({
          type: ADD_COMMENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_COMMENT_FAILTUE,
          payload: err.response.data,
        });
        console.log(err.response);
      });
  };
};

export const deleteComment = (id) => {
  return (dispatch, getState) => {
    axios
      .delete(`api/comments/${id}/`, authHeader(getState))
      .then((res) => {
        dispatch({
          type: DELETE_COMMENT_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_COMMENT_FAILTURE,
          payload: err.response.data,
        });
      });
  };
};
