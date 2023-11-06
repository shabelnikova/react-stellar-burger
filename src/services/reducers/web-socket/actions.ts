import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction} from "@reduxjs/toolkit"


export const wsConnect = createAction<string, "WS_CONNECT">("WS_CONNECT")
export const wsDisconnect = createAction("WS_DISCONNECT")
export const wsConnecting = createAction("WS_CONNECTING")
export const wsOpen = createAction("WS_OPEN")
export const wsClose = createAction("WS_CLOSE")
export const wsMessage = createAction("WS_MESSAGE")
export const wsError = createAction("WS_ERROR")
export const wsActions: TwsActionTypes = {
  wsConnect,
  wsDisconnect ,
  wsConnecting,
  wsOpen,
  wsClose,
  wsMessage,
  wsError
}
export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string> | ActionCreatorWithoutPayload,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsSendMessage?: ActionCreatorWithPayload<any>,
  wsConnecting: ActionCreatorWithoutPayload,
  wsOpen: ActionCreatorWithoutPayload,
  wsClose: ActionCreatorWithoutPayload,
  wsError: ActionCreatorWithPayload<string>  | ActionCreatorWithoutPayload,
  wsMessage: ActionCreatorWithPayload<any>,
}


