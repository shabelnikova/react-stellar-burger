import {Middleware} from "redux";
import {RootState} from "../types";
import {TwsActionTypes} from "../reducers/web-socket/actions";

const normalSocketClose = 1000;

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
  return ((store) => {
    let socket: WebSocket | null = null;
    let wsUrl = '';
    return next => (action) => {
      const {dispatch} = store;
      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        wsOpen,
        wsClose,
        wsMessage,
        wsError
      } = wsActions;
      if(wsConnect.match(action)) {

        // @ts-ignore
        wsUrl = action.payload
        socket = new WebSocket(wsUrl);
        dispatch(wsConnecting());
      }
      if(socket) {
        socket.onopen = () => dispatch(wsOpen());
        socket.onerror = (event) => console.log('socket.onerror', event);
        socket.onclose = (event) => console.log('socket.onclose', event);
        socket.onmessage = (event) => {
          const {data} = event;
          const parsedData = JSON.parse(data)
          dispatch(wsMessage(parsedData))
        }
      }
      if(socket && wsDisconnect.match(action)) {
        socket.close(normalSocketClose, 'Socket is closed');
        dispatch(wsClose);
      }
      next(action);
    }
  })
}


