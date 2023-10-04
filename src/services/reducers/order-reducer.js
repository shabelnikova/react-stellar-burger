import {GET_ORDER, RESET_ORDER_NUMBER} from "../actions/order-action";

const initialState = {
  orderNumber: 0
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderNumber: action.payload
      }
    }
    case RESET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: 0
      }
    }
    default:
      return state;
  }
}