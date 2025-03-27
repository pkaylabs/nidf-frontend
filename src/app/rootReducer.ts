/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { logout } from "./../redux/features/auth/authSlice";
import { api } from "./api/auth";

const appReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logout.type) {
    // Resetting the state to undefined will trigger redux-persist to clear persisted state
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

