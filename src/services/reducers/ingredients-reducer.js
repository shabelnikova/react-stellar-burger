
import {ADD_ITEMS, IS_LOADING} from "../actions/ingredients-action";


const initialState = {
  data: [],
  isLoading: true
}
export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEMS:

      return {
        ...state,
        data: action.payload.items
      }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    default:
      return state
  }
}
