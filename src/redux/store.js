import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./todo/slice";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export default configureStore({
  reducer: rootReducer,
});
