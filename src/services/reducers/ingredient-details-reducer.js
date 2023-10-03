import {INGREDIENT_DETAILS_CLEAR, INGREDIENT_DETAILS_INFO} from "../actions/ingredient-details-action";

const initialState = {
  ingredient: {}
 }
 export const ingredientDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case INGREDIENT_DETAILS_INFO: {
      return {
        ...state,
        ingredient: action.payload
      }
    }
    case INGREDIENT_DETAILS_CLEAR: {
      return {
        ...state,
        ingredient: {}
      }
    }
    default:
      return state
  }
 }