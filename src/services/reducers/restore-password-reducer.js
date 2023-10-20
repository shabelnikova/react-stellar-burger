import {RESTORE_PASSWORD} from "../actions/restore-password-action";

const initialState = {
  isSuccess: false
}
export const restorePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_PASSWORD: {
      return {
        ...state,
        isSuccess: action.payload
      }
    }
    default:
      return state
  }
}