
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import constructorSlice from "./slice/constructorSlice";
import ingredientsSlice from "./slice/ingredientsSlice";
import orderSlice from "./slice/orderSlice";
import userSlice from "./slice/userSlice";
import dataReducer from "./reducers/web-socket/reducer";
import {socketMiddleware} from "./middleware/socket-middleware";
import {wsActions} from "./reducers/web-socket/actions";

const orderMiddleware = socketMiddleware(wsActions)

export const rootReducer = combineReducers({
  constructorSlice: constructorSlice,
  ingredientsSlice: ingredientsSlice,
  orderSlice: orderSlice,
  userSlice: userSlice,
  dataReducer: dataReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderMiddleware)
  }
});



