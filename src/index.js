import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import reducers from "./redux/reducers";
import {applyMiddleware, createStore} from "redux";
import {thunk} from "redux-thunk";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={createStore(reducers,applyMiddleware(thunk))}>
        <App />
    </Provider>

);
