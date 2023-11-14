import ingredientsSlice, {
  clearIngredientInfo,
  ingredientsRequest,
  initialState,
  showIngredientInfo
} from "./ingredientsSlice";
import {mockData, mockItem} from "./constants";

describe('ingredients slice', () => {
  it('should return initial state', () => {
    const result = ingredientsSlice(undefined, {type: ''});
    expect(result).toEqual(initialState);
  })
  it('should handle ingredient in the state', () => {
    const result = ingredientsSlice(initialState, showIngredientInfo(mockItem));
    expect(result.ingredient).toBe(mockItem)
  })
  it('should handle clear ingredient in the state', () => {
    const result = ingredientsSlice(initialState, clearIngredientInfo());
    expect(result.ingredient).toStrictEqual({})
  })
  it('should handle array of ingredients in the state from server success', () => {
    const action = ingredientsRequest.fulfilled(mockData)
    const result = ingredientsSlice(initialState, action);
    expect(result.data).toBe(mockData.data);
    expect(result.isLoading).toBe(false);
  })
  it('should handle array of ingredients in the state from server reject', () => {
    const action = ingredientsRequest.rejected(mockData)
    const result = ingredientsSlice(initialState, action);
    expect(result.isLoading).toBe(false);
  })
  it('should handle array of ingredients in the state from server pending', () => {
    const action = ingredientsRequest.pending(mockData)
    const result = ingredientsSlice(initialState, action);
    expect(result.isLoading).toBe(true);
  })
})
