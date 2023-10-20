import {request} from "../../utils/api";


export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const forgotPassword = (isSuccess) => {
  return {
    type: FORGOT_PASSWORD,
    payload: isSuccess
  }
}
export const forgotPasswordRequest = (email) => {
  return (dispatch, getState) => {
    request('password-reset',
      {method: 'POST',
        headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
        body: JSON.stringify({
          "email": email
        })
      })
      .then(res => {
        dispatch(forgotPassword(res.success));

      })
      .catch (err =>  console.error('Error fetching data: ', err))
  }
}