import {
  FETCH_EMPLOYEES_FAILURE,
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
} from "../actions/types";

const initialState = {
  employeesList: [],
  error: "",
  loading: false,
};

const employeesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return { ...state, employeesList: state.employeesList, loading: true };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesList: action.payload,
        error: "",
        loading: false,
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        employeesList: state.employeesList,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default employeesListReducer;
