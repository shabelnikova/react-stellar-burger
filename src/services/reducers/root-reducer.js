import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients-reducer";
import {constructorReducer} from "./constructor-reducer";
import {orderReducer} from "./order-reducer";
import {ingredientDetailsReducer} from "./ingredient-details-reducer";



 export const rootReducer = combineReducers({
   ingredients: ingredientsReducer,
   burgerConstructor: constructorReducer,
   orderDetails: orderReducer,
   ingredientDetails: ingredientDetailsReducer,

})
