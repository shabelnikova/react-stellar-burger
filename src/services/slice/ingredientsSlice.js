
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {request} from "../../utils/api";
import {v4 as uuid4} from "uuid";

const initialState = {
  data: [],
  isLoading: true,
  ingredient: {}
}
const sliceName = 'ingredients';

export const ingredientsRequest = createAsyncThunk(
  `${sliceName}/ingredientsRequest`,
  async (_, {fulfillWithValue, rejectWithValue}) => {
    try {
      const data = await request('ingredients');

      return fulfillWithValue(data);
    } catch(error) {
      return rejectWithValue(error);
    }
  }
)
const ingredientsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    showIngredientInfo: (state, action) => {
      state.ingredient = action.payload
    },
    clearIngredientInfo: (state) => {
      state.ingredient = {}
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ingredientsRequest.fulfilled, (state, action, dispatch) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(ingredientsRequest.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

export default ingredientsSlice.reducer
export const {showIngredientInfo, clearIngredientInfo, addId} = ingredientsSlice.actions

