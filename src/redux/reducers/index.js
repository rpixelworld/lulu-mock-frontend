import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { shoppingReducer } from "./shoppingReducer";
import { userReducer } from "./userReducer";

export const reducer = combineReducers({
  productReducer,
  shoppingReducer,
  userReducer,
});
