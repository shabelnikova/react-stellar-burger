
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getOrderWithRefresh, getUserWithRefresh, refreshToken, request} from "../../utils/api";
import {clearConstructor} from "./constructorSlice";
import {IOrderResponse, IOrdersElement} from "../types";
import {IIngredientType} from "../../utils/types";
import {getAccessToken} from "../../utils/token";

interface IState {
  orderNumber: number,
  isLoading: boolean,
  orderNumberFromParams: number
  orderInfo: {
    totalPrice: number,
    ingredients: IIngredientType[],
    order: IOrdersElement | null
  }

}

export const initialState: IState = {
  orderNumber: 0,
  isLoading: false,
  orderNumberFromParams: 0,
  orderInfo: {
    totalPrice: 0,
    ingredients: [],
    order: null
  },
};
const sliceName = "order";
export const orderNumberRequest = createAsyncThunk<IOrderResponse, Array<string>> (
  `${sliceName}/orderNumberRequest`,
  async(array, {fulfillWithValue, rejectWithValue, dispatch}) => {
    try {
      const data = await request('orders',
        {method: 'POST',
          headers: {'Content-Type': 'application/json', "Accept": 'application/json', 'Authorization': getAccessToken()},
          body: JSON.stringify({
            ingredients: array
          })
        })
      dispatch(clearConstructor());
      return fulfillWithValue(data)
    } catch(error: any) {
      if(error.message === 'jwt expired') {
        const res = await refreshToken();
        if(res.success) {
          const data = await getOrderWithRefresh(array);
          if(data.success)
            return fulfillWithValue(data)
          else return rejectWithValue(data)
        }
      }
      return rejectWithValue(error);
    }
  }
)

const orderSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetOrderNumber: state => {
      state.orderNumber = 0;
    },
    showOrderInfo: (state, action) => {
      state.orderInfo.totalPrice = action.payload.totalPrice;
      state.orderInfo.ingredients = action.payload.ingredients;
      state.orderInfo.order = action.payload.order
    },
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
export const {resetOrderNumber, showOrderInfo} = orderSlice.actions;