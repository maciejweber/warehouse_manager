import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_FAILURE,
  NEW_ORDER,
  NEW_ORDER_FAILURE,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
} from "../actions/types";

const initialState = {
  orders: [],
  error: "",
  loading: false,
};

const orderListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return { ...state, orders: state.orders, error: "", loading: true };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload, error: "", loading: false };
    case FETCH_ORDERS_FAILURE:
      return { ...state, orders: [], error: action.payload, loading: false };

    case NEW_ORDER:
      return { ...state, orders: [...state.orders, action.payload], error: "" };
    case NEW_ORDER_FAILURE:
      return { ...state, orders: [...state.orders], error: action.payload };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.order
            ? { ...order, comments: [action.payload, ...order.comments] }
            : order
        ),
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.comments
            ? {
                ...order,
                comments: order.comments.filter(
                  (comment) => comment.id !== action.payload
                ),
              }
            : order
        ),
      };

    default:
      return state;
  }
};

export default orderListReducer;
