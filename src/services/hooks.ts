import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    getState: () => RootState
    dispatch: AppDispatch

}>();