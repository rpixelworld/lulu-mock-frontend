import {combineReducers} from "redux";
import {productReducer} from "./productReducer";
import {shoppingReducer} from "./shoppingReducer";

export const reducer = combineReducers(
    {productReducer, shoppingReducer}
)