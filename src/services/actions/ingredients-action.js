import {url} from "../../utils/data";

export const ADD_ITEMS = 'ADD_ITEMS';
export const addItems = (items) => {
  return {
    type: ADD_ITEMS,
    payload: {items}
  }
}
export const getAllItems = () => {
  return (dispatch, getState) => {
    fetch(url)
      .then(res => res.ok ? res.json() : res.json().then(error => Promise.reject(error)))
      .then(res => dispatch(addItems(res.data)))
      .catch (err =>  console.error('Error fetching data: ', err))
  }
}

