import { FETCH_ORDERS_SUCCESS, FETCH_ORDERS_REQUEST, FETCH_ORDERS_FAILURE, FETCH_ORDER_DETAIL_FAILURE, FETCH_ORDER_DETAIL_REQUEST, FETCH_ORDER_DETAIL_SUCCESS, NEW_ORDER, NEW_ORDER_FAILURE } from '../actions/types';

const initialState = { 
  ordersList: { orders: [],
                error:'', 
                loading: false
              },   
  activeOrder: {
                order:{
                  author: {},
                  comments: [],
                  documents: []
                }, 
                error:'', 
                loading: false
              }
};

  
  const orderListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDERS_REQUEST:
        return { ...state, 
          ordersList: {
            orders: state.ordersList.orders, 
            error: '', 
            loading: true
          } 
        };
      case FETCH_ORDERS_SUCCESS:
        return { ...state, 
          ordersList: {
            orders: action.payload, 
            error: '', 
            loading: false
          } 
        };
        case FETCH_ORDERS_FAILURE:
          return { ...state, 
            ordersList: {
              orders: [], 
              error: action.payload, 
              loading: false
            } 
          };

        case FETCH_ORDER_DETAIL_REQUEST:
          return { ...state, 
            activeOrder: {
              loading: true,
              order: {}, 
              error: '', 
            } 
          };
        case FETCH_ORDER_DETAIL_SUCCESS:
          return { ...state, 
            activeOrder: {
              order: action.payload, 
              error: '', 
              loading: false
            } 
          };
      case FETCH_ORDER_DETAIL_FAILURE:
        return { ...state, 
          activeOrder: {
            order: {}, 
            error: action.payload, 
            loading: false
          } 
        };

      case NEW_ORDER:
        return { ...state, 
          ordersList: {
            orders:[...state.ordersList.orders, action.payload], 
            error: ''
          } 
        };
        case NEW_ORDER_FAILURE:
          return { ...state, 
            ordersList: {
              orders:[...state.orders], 
              error: action.payload
            } 
          };
      default: return state
    }
  }
  
  export default orderListReducer