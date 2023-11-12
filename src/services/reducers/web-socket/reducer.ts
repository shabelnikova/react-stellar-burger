import {WebsocketStatus} from "./web-socket-utils";

import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "./actions";
import { createReducer } from "@reduxjs/toolkit";

 interface IState {
   status: string
   connectingError: string | undefined
   data: any
}
const initialState: IState = {
  status: WebsocketStatus.OFFLINE,
  connectingError: '',
  data: []
}

 const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {state.status = WebsocketStatus.CONNECTING})
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = '';
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {

      state.connectingError = action.payload
    })
    .addCase(wsMessage, (state, action) => {

      state.data = action.payload
    })
})
export default dataReducer;