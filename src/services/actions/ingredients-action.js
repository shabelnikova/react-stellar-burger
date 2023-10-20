import {request} from "../../utils/api";


export const ADD_ITEMS = 'ADD_ITEMS';
export const IS_LOADING = 'IS_LOADING';

export const addItems = (items) => {
  return {
    type: ADD_ITEMS,
    payload: {items}
  }
}
export const onLoad = (isLoading) => {
  return {
    type: IS_LOADING,
    payload: isLoading
  }
}
export const getAllItems = () => {

  return (dispatch, getState) => {
    dispatch(onLoad(true))
    request('ingredients')
      .then(res => dispatch(addItems(res.data)))
      .then(res => dispatch(onLoad(false)))
      .catch (err =>  console.error('Error fetching data: ', err))

  }
}

