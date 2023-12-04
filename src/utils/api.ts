import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken
} from "./token";

export const BASE_URL = 'https://norma.nomoreparties.space/api/';
export const WS_URL = 'wss://norma.nomoreparties.space/orders';
const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then(error => Promise.reject(error));
}
export const request = (endpoint: string, options?: any) => {
  return fetch(BASE_URL + endpoint, options).then(checkResponse)
}
export const refreshToken = async () => {
  try {
    const res = await request('auth/token', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
      body: JSON.stringify({
        "token": getRefreshToken()
      })
    })
    setAccessToken(res.accessToken);
    setRefreshToken(res.refreshToken);
    return res;
  }
  catch(err) {
    removeAccessToken();
    removeRefreshToken();
    return Promise.reject(err)
  }
}
export const getUserWithRefresh = async() => {
  const data = await request("auth/user", {
    method: "GET",
    headers: { Authorization: getAccessToken() },
  });
  return data;
}
export const getOrderWithRefresh = async(array: string[]) => {
  const data = await request('orders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', "Accept": 'application/json', 'Authorization': getAccessToken()},
    body: JSON.stringify({
      ingredients: array
    })
  });
  return data;
}
export const getOrderByNumber = async(number: number) => {
    const res = await request(`orders/${number}`,  {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    return res;
}


