import orderSlice, {initialState, orderNumberRequest, resetOrderNumber, showOrderInfo} from "./orderSlice";
import {mockOrderInformation, mockOrderNumber} from "./constants";

describe('order slice', () => {
  it('should return initial state', () => {
    const result = orderSlice(undefined, {type: ''});
    expect(result).toEqual(initialState);
  })
  it('should handle clear order number', () => {
    const result = orderSlice(initialState, resetOrderNumber());
    expect(result.orderNumber).toBe(0);
  })
  it('should handle order information', () => {
    const result = orderSlice(initialState, showOrderInfo(mockOrderInformation));
    expect(result.orderInfo).toEqual(mockOrderInformation);
  })
  it('should handle order number from server success', () => {
    const action = orderNumberRequest.fulfilled(mockOrderNumber);
    const result = orderSlice(initialState, action);
    expect(result.orderNumber).toBe(mockOrderNumber.order.number);
    expect(result.isLoading).toBe(false);
  })
  it('should handle order number from server reject', () => {
    const action = orderNumberRequest.rejected('');
    const result = orderSlice(initialState, action);
    expect(result.isLoading).toBe(false);
  })
  it('should handle order number from server pending', () => {
    const action = orderNumberRequest.pending('');
    const result = orderSlice(initialState, action);
    expect(result.isLoading).toBe(true);
  })
})
