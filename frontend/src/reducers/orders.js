import { FETCH_ORDERS_SUCCESS, FETCH_ORDERS_REQUEST, FETCH_ORDERS_FAILURE } from '../actions/types';

const initialState = {
    loading: false,
    orders: [],
    error: ''
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDERS_REQUEST:
        return {
					...state,
          loading: true
        }
      case FETCH_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
          error: ''
        }
      case FETCH_ORDERS_FAILURE:
				return {
					loading: false,
					orders: [],
					error: action.payload
				}
      default: return state
    }
  }
  
  export default reducer