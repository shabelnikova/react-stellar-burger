
import {ADD_ITEMS} from "../actions/ingredients-action";


const initialState = {
  data: []
}
export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEMS:

      return {
        ...state,
        data: action.payload.items
      }
    default:
      return state
  }
}
