
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {request} from "../../utils/api";
import {clearConstructor} from "./constructorSlice";
import {IOrderResponse} from "../types";


const initialState = {
  orderNumber: 0,
  isLoading: false
};
const sliceName = "order";
export const orderNumberRequest = createAsyncThunk<IOrderResponse, Array<string>> (
  `${sliceName}/orderNumberRequest`,
  async(array, {fulfillWithValue, rejectWithValue, dispatch}) => {
    try {
      const data = await request('orders',
        {method: 'POST',
          headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
          body: JSON.stringify({
            ingredients: array
          })
        })
      dispatch(clearConstructor());
      return fulfillWithValue(data)
    } catch(error) {
      rejectWithValue(error);
    }
  }
)
const orderSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetOrderNumber: state => {
      state.orderNumber = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderNumberRequest.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(orderNumberRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload.order.number;
      })
      .addCase(orderNumberRequest.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

export default orderSlice.reducer;
export const {resetOrderNumber} = orderSlice.actions;