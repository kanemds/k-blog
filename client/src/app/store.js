import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import autheducer from "../redux/auth/authSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: autheducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // set false when deploy
  devTools: true
})