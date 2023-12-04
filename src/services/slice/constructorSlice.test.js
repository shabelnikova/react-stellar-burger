import constructorSlice, {
  addItem,
  clearConstructor,
  constructorSort,
  deleteItem,
  initialState
} from "./constructorSlice";
import {mockItem, mockItemBun, mockItems} from "./constants";

describe('constructor slice', () => {
  it('should return initial state', () => {
    const result = constructorSlice(undefined, {type: ''});
    expect(result).toEqual(initialState);
  })
  it('should add item to the constructor', () => {
    const result1 = constructorSlice(initialState, addItem(mockItemBun));
    expect(result1.bun).toMatchObject(mockItemBun);
    const result2 = constructorSlice(initialState, addItem(mockItem));
    expect(result2.items).toMatchObject([mockItem]);
  })
  it('should remove item from the constructor', () => {
    const state = constructorSlice(initialState, addItem(mockItem));
    const result = constructorSlice(initialState, deleteItem(0));
    expect(result.items.length).toEqual(state.items.length-1)
  })
  it('should move elements in the constructor', () => {
  const state = {items: mockItems};
    const action = constructorSort({
      dragIndex: 0,
      hoverIndex: 2,
    });
    const newState = constructorSlice(state, action);
    const expectedState = {
      items: [
        {
          "_id":"3",
          "name":"name3",
          "type":"main",
        },
        {
          "_id":"1",
          "name":"name1",
          "type":"main",
        },
        {
          "_id":"2",
          "name":"name2",
          "type":"main",
        },

      ]
    }
    expect(newState).toEqual(expectedState);
  })
  it('should clear the state of the constructor', () => {
    const result = constructorSlice(initialState, clearConstructor());
    expect(result).toEqual(initialState);
  })
})