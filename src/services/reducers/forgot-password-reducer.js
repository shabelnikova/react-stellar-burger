import {FORGOT_PASSWORD} from "../actions/forgot-password-action";
const initialState = {
  passwordReset: false,

}
export const forgotPasswordReducer = (state = initialState, action) => {
  switch(action.type) {
    case FORGOT_PASSWORD: {
      return {
        ...state,
        passwordReset: action.payload
      }
    }
    default :
      return state;
  }
}