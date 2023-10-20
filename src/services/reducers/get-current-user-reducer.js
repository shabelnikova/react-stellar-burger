import {GET_USER, REFRESH_INFO} from "../actions/get-current-user-action";

const initialState = {
  success: false,
  user: {
    "email": "",
    "name": ""
  },
  accessToken: '',
  refreshToken: ''
}
export const getCurrentUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USER: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user
      }
    }
    case REFRESH_INFO: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken

      }
    }
    default:
      return state
  }
}