import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients-reducer";
import {constructorReducer} from "./constructor-reducer";
import {orderReducer} from "./order-reducer";
import {ingredientDetailsReducer} from "./ingredient-details-reducer";
import {forgotPasswordReducer} from "./forgot-password-reducer";
import {registerReducer} from "./register-reducer";
import {restorePasswordReducer} from "./restore-password-reducer";
import {getCurrentUserReducer} from "./get-current-user-reducer";




 export const rootReducer = combineReducers({
   ingredients: ingredientsReducer,
   burgerConstructor: constructorReducer,
   orderDetails: orderReducer,
   ingredientDetails: ingredientDetailsReducer,
   resetPassword: forgotPasswordReducer,
   registerReducer: registerReducer,
   restorePassword: restorePasswordReducer,
   getCurrentUser: getCurrentUserReducer,
})
