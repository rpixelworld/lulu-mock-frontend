import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";
import {productReducer} from "./productReducer";

export const reducer = combineReducers(
    {filterReducer, productReducer}
)