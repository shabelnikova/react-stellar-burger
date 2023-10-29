
import {configureStore} from "@reduxjs/toolkit";
import constructorSlice from "./slice/constructorSlice";
import ingredientsSlice from "./slice/ingredientsSlice";
import orderSlice from "./slice/orderSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {constructorSlice, ingredientsSlice, orderSlice, userSlice},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});



