import {v4 as uuid4} from "uuid";
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addItem = (item) => {
  const uid = uuid4();
  return {
    type: ADD_ITEM,
    payload: {...item, uuid: uid}
  }
}
export const deleteItem = (index) => {
  return {
    type: DELETE_ITEM,
    payload: index
  }
}
export const constructorSort = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_ITEM,
    payload: {dragIndex, hoverIndex}
  }
}
export const clearConstructor = () => {
  return {
    type: CLEAR_CONSTRUCTOR
  }
}