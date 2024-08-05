import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "./redux/reducers";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const reduxStore = createStore(reducer, applyMiddleware(thunk));
root.render(
  // <React.StrictMode>
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  // </React.StrictMode>
);
