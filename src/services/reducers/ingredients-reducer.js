
import {ADD_ITEMS} from "../actions/ingredients-action";
import {v4 as uuid} from "uuid";

const initialState = {
  data: []
}
export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEMS:
      let temp = [...action.payload.items]
      temp = temp.map(item => ({...item, uuid: uuid()}))
      return {
        ...state,
        data: temp
      }
    default:
      return state
  }
}
