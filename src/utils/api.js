const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(error => Promise.reject(error));
}
export const request = (endpoint, options) => {
  return fetch(BASE_URL + endpoint, options).then(checkResponse)
}
