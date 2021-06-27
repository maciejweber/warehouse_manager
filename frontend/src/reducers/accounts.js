import {
  FETCH_ACCOUNTS_FAILURE,
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILTURE,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_FAILTURE,
} from "../actions/types";

const initialState = {
  accountsList: [],
  error: "",
  loading: false,
};

const accountsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUEST:
      return { ...state, accountsList: state.accountsList, loading: true };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accountsList: action.payload,
        error: "",
        loading: false,
      };
    case FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        accountsList: state.accountsList,
        error: action.payload,
        loading: false,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountsList: state.accountsList.map((account) => {
          if (account.id === action.payload.id) {
            return action.payload;
          } else {
            return account;
          }
        }),
        error: [],
      };
    case UPDATE_ACCOUNT_FAILTURE:
      return {
        ...state,
        accountsList: state.accountsList,
        error: action.payload,
        loading: false,
      };
    case ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountsList: [...state.accountsList, action.payload],
        error: [],
      };
    case ADD_ACCOUNT_FAILTURE:
      return {
        ...state,
        accountsList: state.accountsList,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default accountsListReducer;
