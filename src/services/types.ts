import {rootReducer, store} from './index';


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export interface IOrderResponse {
    success: boolean
    name: string
    order: IOrderNumber
}
export interface IResponse {
    success: boolean,
    message: string
}
export interface IErrorResponse {
    success?: boolean;
    message?: string
    status?: number
}
export interface IOrderNumber {
    number: number
}
export interface IUserResponse {
    success: boolean
    user: IUser
}
export interface IUser {
    email: string
    name: string
}
export interface ILogin {
    email: string
    password: string
}
export interface IRegLogResponse {
    success: boolean
    user: IUser
    accessToken: string
    refreshToken: string
}
export interface IInputRegisterUpdate {
    name: string
    email: string
    password: string
}
export interface IChangePasswordRequest {
    password: string
    token: string
}
export interface IUserState {
    isPending: boolean,
    isAuthChecked: boolean,
    isUserLoaded: boolean,
    data: IUser | null,
    passwordReset: boolean,
    passwordForgot: boolean,
}
export interface IOrdersElement {
    _id: string
    ingredients: string[]
    status: string
    name: string
    createdAt: string
    updatedAt: string
    number: number

}
//{
//   "success": true,
//   "orders": [
//   {
//     "_id": "654f466cc2cc61001b3d6f51",
//     "ingredients": [
//       "643d69a5c3f7b9001cfa0943",
//       "643d69a5c3f7b9001cfa093c",
//       "643d69a5c3f7b9001cfa093c"
//     ],
//     "owner": "654dc1f3c2cc61001b3d6c2c",
//     "status": "done",
//     "name": "Space краторный бургер",
//     "createdAt": "2023-11-11T09:16:28.787Z",
//     "updatedAt": "2023-11-11T09:16:29.044Z",
//     "number": 25791,
//     "__v": 0
//   }
// ]
// }
