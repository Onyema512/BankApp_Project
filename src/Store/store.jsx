import { configureStore } from "@reduxjs/toolkit";
import bankReducer from "./BankSlice";

export const store = configureStore({
  reducer: {
    bank: bankReducer,
  },
});