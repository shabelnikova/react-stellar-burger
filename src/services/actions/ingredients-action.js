import {request} from "../../utils/api";


export const ADD_ITEMS = 'ADD_ITEMS';
export const addItems = (items) => {
  return {
    type: ADD_ITEMS,
    payload: {items}
  }
}
export const getAllItems = () => {
  return (dispatch, getState) => {
    request('ingredients')
      .then(res => dispatch(addItems(res.data)))
      .catch (err =>  console.error('Error fetching data: ', err))
  }
}
