import { FETCH_ORDERS_SUCCESS, FETCH_ORDERS_REQUEST, FETCH_ORDERS_FAILURE, FETCH_ORDER_DETAIL_FAILURE, FETCH_ORDER_DETAIL_REQUEST, FETCH_ORDER_DETAIL_SUCCESS, NEW_ORDER, NEW_ORDER_FAILURE } from '../actions/types';

const initialState = { 
               orders: [],
                error:'', 
                loading: false
              }; 


  
  const orderListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDERS_REQUEST:
        return { ...state, 
            orders: state.orders, 
            error: '', 
            loading: true
        };
      case FETCH_ORDERS_SUCCESS:
        return { ...state,
            orders: action.payload, 
            error: '', 
            loading: false
        };
        case FETCH_ORDERS_FAILURE:
          return { ...state, 
              orders: [], 
              error: action.payload, 
              loading: false
          };

      case NEW_ORDER:
        return { ...state, 
            orders:[...state.orders, action.payload], 
            error: ''
        };
        case NEW_ORDER_FAILURE:
          return { ...state,
              orders:[...state.orders], 
              error: action.payload
          };
      default: return state;
    }
  }
  
  export default orderListReducer;