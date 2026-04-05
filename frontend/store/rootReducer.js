import productsReducer from "./slices/products";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
