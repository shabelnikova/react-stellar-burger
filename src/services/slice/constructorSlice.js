
import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuid4} from "uuid";

const initialState = {
  items: [],
  bun: null,
}
const sliceName = 'constructor';
const constructorSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = {...action.payload}
      const uid = uuid4();
      item.uuid = uid;
      if(action.payload.type === 'bun') {
        state.bun = item;
      } else {
        state.items = [item, ...state.items]
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((el, ind) => ind !== action.payload)
    },
    constructorSort: (state, action) => {
      const copyArray = [...state.items];
      copyArray.splice(action.payload.dragIndex, 0,
        copyArray.splice(action.payload.hoverIndex, 1)[0]);
      console.log(copyArray)
      state.items = copyArray;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.items = []
    }
  }
})
export default constructorSlice.reducer;
export const {addItem, deleteItem, constructorSort, clearConstructor} = constructorSlice.actions
