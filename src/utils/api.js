import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken
} from "./token";

const BASE_URL = 'https://norma.nomoreparties.space/api/';
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(error => Promise.reject(error));
}
export const request = (endpoint, options) => {
  return fetch(BASE_URL + endpoint, options).then(checkResponse)
}
export const refreshToken = () => {
  return fetch (BASE_URL + 'auth/token',{
      method: 'POST',
      headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
      body: JSON.stringify({
        "token": getRefreshToken()
      })
    })
    .then((res) => res.json())
    .then((res) => {
      if(!res.success) {
        removeAccessToken();
        removeRefreshToken();
        return Promise.reject(res)
      }
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      return res;
    })
}
export const getUserWithRefresh = async() => {
  const data = await request("auth/user", {
    method: "GET",
    headers: { Authorization: getAccessToken() },
  });
  return data;
}

