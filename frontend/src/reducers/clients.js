import {
  FETCH_CLIENTS_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILURE,
} from "../actions/types";

const initialState = {
  clientsList: [],
  error: "",
  loading: false,
};

const clientsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_REQUEST:
      return { ...state, clientsList: state.clientsList, loading: true };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clientsList: action.payload,
        error: "",
        loading: false,
      };
    case FETCH_CLIENTS_FAILURE:
      return {
        ...state,
        clientsList: state.clientsList,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default clientsListReducer;
