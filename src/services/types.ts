import {store} from './index';

export type RootState = ReturnType<typeof store.getState>;
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
