import React from "react";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import {store} from "./services";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



//composeWithDevTools() - library import @redux-devtools/extension
//const store = createStore(rootReducer, composeWithDevTools());

