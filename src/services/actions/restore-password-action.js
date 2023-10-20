import {request} from "../../utils/api";


export const RESTORE_PASSWORD = 'RESTORE_PASSWORD';

export const restorePassword = (isSuccess) => {
  return {
    type: RESTORE_PASSWORD,
    payload: isSuccess
  }
}
export const restorePasswordRequest = (password, token) => {
  return (dispatch, getState) => {
    request('password-reset',
      {method: 'POST',
        headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
        body: JSON.stringify({
          "password": password,
          "token": token
        })
      })
      .then(res => {
        dispatch(restorePassword(res.success));

      })
      .catch (err =>  console.error('Error fetching data: ', err))
  }
}