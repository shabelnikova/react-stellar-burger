import {request} from "../../utils/api";


export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';

export const registration = (userData) => {
  return {
    type: REGISTRATION_REQUEST,
    payload: userData
  }
}
export const registrationQuery = (name, email, password) => {
  return (dispatch, getState) => {
    request('auth/register',
      {method: 'POST',
        headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
        body: JSON.stringify({email, password, name})
      })
      .then(res => {
        dispatch(registration(res));

      })
      .catch (err =>  console.error('Error fetching data: ', err))
  }
}