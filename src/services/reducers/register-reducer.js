import {REGISTRATION_REQUEST} from "../actions/register-action";


const initialState = {
  success: false,
  user: {
    email: "",
    name: ""
  },
  accessToken: "",
  refreshToken: ""
}
export const
  registerReducer = (state = initialState, action) => {
  switch(action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    }
    default:
      return state
  }
}