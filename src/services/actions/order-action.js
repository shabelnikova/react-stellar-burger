import {orderUrl, url} from "../../utils/data"
export const GET_ORDER = 'GET_ORDER';
export const getOrderNumber = (number) => {
  return {
    type: GET_ORDER,
    payload: number
  }
}
export const getOrderResponse = (array) => {
return (dispatch, getState) => {
  fetch(orderUrl,
    {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ingredients: array
      })
    })
    .then(res => res.ok ? res.json() : res.json().then(error => Promise.reject(error)))
       .then(res => dispatch(getOrderNumber(res.order.number)))
       .catch (err =>  console.error('Error fetching data: ', err))
}
}
