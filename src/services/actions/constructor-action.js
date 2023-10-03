export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item
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