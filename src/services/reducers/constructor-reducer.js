import {ADD_ITEM, CLEAR_CONSTRUCTOR, DELETE_ITEM, MOVE_ITEM} from "../actions/constructor-action";
const initialState = {
  items: [],
  bun: null,
}
export const constructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_ITEM: {
      if(action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
        }
      } else {
        return {
          ...state,
          items: [action.payload, ...state.items],

        }
      }

    }
    case DELETE_ITEM: {
      return {
        ...state,
        items: state.items.filter((el, ind) => ind !== action.payload)
      }
    }
    case MOVE_ITEM: {
      const copyArray = [...state.items];
      copyArray.splice(action.payload.dragIndex, 0,
        copyArray.splice(action.payload.hoverIndex, 1)[0])
      return {
        ...state,
        items: copyArray
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        items: [],
        bun: null,
      }
    }
    default:
      return state
  }
}