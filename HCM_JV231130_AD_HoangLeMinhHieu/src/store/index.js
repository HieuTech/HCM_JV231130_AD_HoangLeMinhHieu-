import { configureStore } from "@reduxjs/toolkit";

import { userAction,userReducer } from "./user.slice";
export const store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
});

store.dispatch(userAction.findAll());
