import {request} from "../../utils/api";
import {getAccessToken, getRefreshToken} from "../../utils/token";

export const GET_USER = 'GET_USER';
export const REFRESH_INFO = 'REFRESH_INFO'
export const getUser = (userData) => {
  return {
    type: GET_USER,
    payload: userData
  }
}
export const refreshInfo = (res) => {
  return {
    type: REFRESH_INFO,
    payload: res
  }
}
export const currentUserRequest = () => {
  return (dispatch) => {
    request('auth/user',
      {
        method: 'GET',
        headers: {"Authorization": getAccessToken()}
      })
      .then(res => dispatch(getUser(res)))
      .catch(err =>  {
        if(err.message === 'jwt expired') {
          request('auth/token',
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
              body: JSON.stringify({
                "token": getRefreshToken()
              })
            })
            .then(res => dispatch(refreshInfo(res)))
            .catch(err => console.error('Error fetching data: ', err))
        }
      })
  }
}

