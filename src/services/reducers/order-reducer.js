import {GET_ORDER} from "../actions/order-action";

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
    default:
      return state;
  }
}